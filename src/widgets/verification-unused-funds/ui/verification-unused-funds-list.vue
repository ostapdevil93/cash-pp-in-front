<script setup lang="ts">
  import {
    Card,
    Divider,
    FlexCol,
    Sorter,
    Table as DataTable,
  } from '@ebp/vue-ui-lib';
  import { computed, onBeforeMount, reactive, ref, watch } from 'vue';
  import { formatNumber, generateUid, getRowsSumByField, usePagination, useUrlParams } from '@ebp/utils';
  import { searchPoForReceipts40116, searchUnusedFunds } from '@/shared/api/ivf-api';
  import { Pagable } from '@/shared/api';
  import { notifyDefaultError } from '@/shared/lib';
  import { getUnusedFundsTableColumns, UnusedFundsDocumentForTable, UnusedFundsTableItem, UnusedFundsTableKey, getUnusedFundsRequestFilters } from '@/entities/unused-funds-item';
  import {
    getPoForReceipts40116TableColumns,
    PaymentOrdersDocument,
    PaymentOrdersDocumentForTable,
    PaymentOrderKey,
    getPoForReceiptsRequestFilters,
  } from '@/entities/payment-orders-item';
  import { useUnverifiedAmountStore } from '@/shared/store';

  const getDefaultSort = (): Sorter[] => [{ column: UnusedFundsTableKey.docNumber, dir: 'desc' }];

  const data = ref<UnusedFundsDocumentForTable[] >([]);
  const relatedDocs = ref<PaymentOrdersDocumentForTable[] >([]);
  const isLoading = ref(false);
  const totalElements = ref<number>(0);
  const relatedDocsTotalElements = ref<number>(0);
  const selected = ref<UnusedFundsDocumentForTable>();
  const relatedDocSelected = ref<PaymentOrdersDocument[]>([]);
  const highLighted = ref<string>();
  const id = generateUid();
  const pagination = usePagination({ sort: getDefaultSort(), size: 4 });
  const relatedDocsPagination = usePagination({ sort: getDefaultSort(), size: 4 });

  const store = useUnverifiedAmountStore();

  useUrlParams({
    pagination: pagination._pagination,
    setPagination: pagination.setPagination,
  });

  const columns = computed(() => getUnusedFundsTableColumns());
  const relatedDocColumns = computed(() => getPoForReceipts40116TableColumns());

  const changeRelatedDocRowsSelected = (rows: PaymentOrdersDocumentForTable[]): void => {
    relatedDocSelected.value = rows;
    store.setClassifyData({
      poForReceipts40116Array: rows.map((row) => row.exKey),
    });
  };

  const changeRowsSelected = (rows: Record<string, any>[]): void => {
    selected.value = rows[0] as UnusedFundsDocumentForTable;
    store.setClassifyData({
      unusedFundsDescriptionArray: rows.map((row) => row.exKey),
    });
  };

  const getDataTable = async () => {
    isLoading.value = true;
    try {
      const res = await searchUnusedFunds<Pagable<UnusedFundsTableItem>>(
        pagination.getPaginationParams(),
        getUnusedFundsRequestFilters(),
      );
      data.value = [...res.content.map((item) => ({
        ...item,
        ...item.document,
      }) as UnusedFundsDocumentForTable)];
      totalElements.value = res.totalElements;
    } catch (e) {
      notifyDefaultError(e);
    } finally {
      isLoading.value = false;
    }
  };

  const getRelatedDocDataTable = async (cardNumber: string) => {
    isLoading.value = true;
    try {
      const res = await searchPoForReceipts40116<Pagable<PaymentOrdersDocumentForTable>>(
        relatedDocsPagination.getPaginationParams(),
        getPoForReceiptsRequestFilters(cardNumber),
      );
      relatedDocs.value = [...res.content.map((item) => ({
        ...item,
        ...item.document,
      }) as PaymentOrdersDocumentForTable)];
      relatedDocsTotalElements.value = res.totalElements;
    } catch (e) {
      notifyDefaultError(e);
    } finally {
      isLoading.value = false;
    }
  };

  watch(() => reactive({ selected: selected.value, relatedDocSelected: relatedDocSelected.value }), (newVal) => {
    if (newVal.selected) {
      store.setAmount(newVal.selected.amountFunds - (newVal.relatedDocSelected?.reduce((acc, val) => val.amount + acc, 0) ?? 0));
    } else {
      store.setAmount(0);
    }
  });

  watch(() => selected.value, () => {
    if (selected.value?.cardNumber) {
      getRelatedDocDataTable(selected.value.cardNumber);
      return;
    }
    relatedDocs.value = [];
  }, { deep: true });

  onBeforeMount(() => {
    getDataTable();
  });

  const summary = computed(() => {
    const value = getRowsSumByField(relatedDocSelected.value, PaymentOrderKey.amount);
    return formatNumber(value, {
      maxDots: 2,
      minDots: 2,
      separator: '.',
    });
  });

  watch(pagination._pagination, () => {
    getDataTable();
  }, { deep: true });

  watch(relatedDocsPagination._pagination, () => {
    if (selected.value?.cardNumber) {
      getRelatedDocDataTable(selected.value.cardNumber);
      return;
    }
    relatedDocs.value = [];
  }, { deep: true });
</script>

<template>
  <Card fullHeight>
    <FlexCol fullHeight gap="5">
      <DataTable
        :columns="columns"
        :data="data"
        :fillContainerHeightId="id"
        :highlightedRows="highLighted ? [highLighted] : undefined"
        :index="UnusedFundsTableKey.exKey"
        :isLoading="isLoading"
        paddings="24px 5px"
        :pagination="{
          page: pagination._pagination.page,
          pageSize: pagination._pagination.size,
          pageSizeVariants: [4, 8, 16, 32],
          totalElements,
        }"
        selectable="single"
        :sort="pagination._pagination.sort"
        :sortEnabled="true"
        @onPageChange="pagination.setPage"
        @onPageSizeChange="pagination.setSize"
        @onRowSelectionChange="changeRowsSelected"
        @onSortChange="pagination.setSort"
      />

      <Divider v-if="selected" :margin="10" />

      <DataTable
        v-if="selected"
        class="unused-funds__related-docs__table"
        :columns="relatedDocColumns"
        :data="relatedDocs"
        :fillContainerHeightId="id"
        headerPaddings="24px 5px"
        :highlightedRows="highLighted ? [highLighted] : undefined"
        :index="PaymentOrderKey.docNumber"
        :isLoading="isLoading"
        paddings="24px 5px"
        :pagination="{
          page: relatedDocsPagination._pagination.page,
          pageSize: relatedDocsPagination._pagination.size,
          pageSizeVariants: [4, 8, 16, 32],
          totalElements: relatedDocsTotalElements,
        }"
        selectable="multiple"
        :selectedRows="relatedDocSelected"
        :sort="relatedDocsPagination._pagination.sort"
        :sortEnabled="true"
        @onPageChange="relatedDocsPagination.setPage"
        @onPageSizeChange="relatedDocsPagination.setSize"
        @onRowSelectionChange="changeRelatedDocRowsSelected"
        @onSortChange="relatedDocsPagination.setSort"
      >
        <template #tableFooter>
          <div class="sum-row">
            Сумма выведенных строк: {{ summary }}
          </div>
        </template>
      </DataTable>
    </FlexCol>
  </Card>
</template>

<style lang="scss" scoped>
.unused-funds,
.unused-funds__related-docs {
  &__table {

    &.table-wrapper {
      :deep(.tabulator) {
        .tabulator-row {
          .tabulator-cell {

            max-height: 43px !important;
          }
          &.tabulator-highlighted {
            background-color: var(--primary-colors-substrate);
          }
        }
      }
    }
    & .sum-row {
      width: 100%;
      height: 40px;
      background: var(--primary-colors-substrate);
      padding: 6px var(--indent-size-5) 6px var(--indent-size-5);
      color: var(--primary-colors-primary);
      font-weight: 500;
      font-size: 12px;
      line-height: 16px;
      display: flex;
      align-items: center;
      padding-left: 60px;
      white-space: pre
    }
  }

}

</style>
