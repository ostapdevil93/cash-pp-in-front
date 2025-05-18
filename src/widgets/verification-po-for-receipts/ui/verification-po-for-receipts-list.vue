<script setup lang="ts">
  import {
    VGrid,
    Accordion,
    Card,
    Input,
    Sorter,
    Table as DataTable,
    FlexCol,
    Divider,
  } from '@ebp/vue-ui-lib';
  import { computed, onBeforeMount, reactive, ref, toRefs, watch } from 'vue';
  import { formatNumber, generateUid, getRowsSumByField, usePagination, useUrlParams } from '@ebp/utils';
  import { searchPoForReceipts40116, searchUnusedFunds } from '@/shared/api/ivf-api';
  import { Pagable } from '@/shared/api';
  import {
    getPoForReceipts40116TableColumns,
    PaymentOrdersDocumentForTable,
    PaymentOrdersVocabulary,
    PaymentOrdersTableItem,
    PaymentOrderKey,
    getPoForReceiptsRequestFilters, Recipient,
  } from '@/entities/payment-orders-item';
  import { notifyDefaultError } from '@/shared/lib';
  import {
    getUnusedFundsTableColumns,
    UnusedFundsDocumentForTable,
    UnusedFundsTableItem,
    getUnusedFundsRequestFilters,
    UnusedFundsTableKey,
  } from '@/entities/unused-funds-item';
  import { useUnverifiedAmountStore } from '@/shared/store';
  import { NullableItem } from '@/shared/store/store.ts';

  const props = defineProps<{
    isRecipientNeed: boolean
  }>();

  const getDefaultSort = (): Sorter[] => [{ column: PaymentOrderKey.docNumber, dir: 'desc' }];

  const data = ref<PaymentOrdersDocumentForTable[] >([]);
  const relatedDocs = ref<UnusedFundsTableItem[] >([]);
  const isLoading = ref(false);
  const totalElements = ref<number>(0);
  const relatedDocsTotalElements = ref<number>(0);
  const selected = ref<PaymentOrdersDocumentForTable>();
  const relatedDocSelected = ref<UnusedFundsDocumentForTable[]>([]);
  const highLighted = ref<string>();
  const id = generateUid();
  const pagination = usePagination({ sort: getDefaultSort(), size: 4 });
  const isRecipientOpen = ref(true);
  const relatedDocsPagination = usePagination({ sort: getDefaultSort(), size: 4 });
  const verifiedRecipient = ref<NullableItem<Recipient>>({
    [PaymentOrderKey.recipientCardNumber]: null,
    [PaymentOrderKey.recipientRegistryCode]: null,
    [PaymentOrderKey.recipientName]: null,
    [PaymentOrderKey.recipientInn]: null,
    [PaymentOrderKey.recipientKpp]: null,
    [PaymentOrderKey.recipientPersonalAccount]: null,
    [PaymentOrderKey.recipientTofkCode]: null,
    [PaymentOrderKey.recipientTofkName]: null,
    [PaymentOrderKey.recipientBudgetCode]: null,
    [PaymentOrderKey.recipientBudgetType]: null,
    [PaymentOrderKey.recipientOktmoPpo]: null,
    [PaymentOrderKey.recipientOrgName]: null,
    [PaymentOrderKey.accountNumber]: null,
    [PaymentOrderKey.baTofkCode]: null,
  });

  const store = useUnverifiedAmountStore();

  const { isRecipientNeed } = toRefs(props);

  useUrlParams({
    pagination: pagination._pagination,
    setPagination: pagination.setPagination,
  });

  const columns = computed(() => getPoForReceipts40116TableColumns());

  const relatedDocColumns = computed(() => getUnusedFundsTableColumns());

  const changeRowsSelected = (rows: Record<string, any>[]): void => {
    selected.value = rows[0] as PaymentOrdersDocumentForTable;
    store.setClassifyData({
      poForReceipts40116Array: rows.map((row) => row.exKey),
    });
  };

  const changeRelatedDocRowsSelected = (rows: UnusedFundsDocumentForTable[]): void => {
    relatedDocSelected.value = rows;
    store.setClassifyData({
      unusedFundsDescriptionArray: rows.map((row) => row.exKey),
    });
  };

  const getDataTable = async () => {
    isLoading.value = true;
    try {
      const res = await searchPoForReceipts40116<Pagable<PaymentOrdersTableItem>>(
        pagination.getPaginationParams(),
        getPoForReceiptsRequestFilters(),
      );
      data.value = [...res.content.map((item) => ({
        ...item,
        ...item.document,
      }) as PaymentOrdersDocumentForTable)];
      totalElements.value = res.totalElements;
    } catch (e) {
      notifyDefaultError(e);
    } finally {
      isLoading.value = false;
    }
  };

  const getRelatedDocDataTable = async (recipientCardNumber: string) => {
    isLoading.value = true;
    try {
      const res = await searchUnusedFunds<Pagable<UnusedFundsTableItem>>(
        relatedDocsPagination.getPaginationParams(),
        getUnusedFundsRequestFilters(recipientCardNumber),
      );
      relatedDocs.value = [...res.content.map((item) => ({
        ...item,
        ...item.document,
      }) as UnusedFundsTableItem)];
      relatedDocsTotalElements.value = res.totalElements;
    } catch (e) {
      notifyDefaultError(e);
    } finally {
      isLoading.value = false;
    }
  };

  watch(() => isRecipientNeed.value, () => {
    if (isRecipientNeed.value) {
      relatedDocs.value = [];
      return;
    }
    verifiedRecipient.value = {
      [PaymentOrderKey.recipientCardNumber]: null,
      [PaymentOrderKey.recipientRegistryCode]: null,
      [PaymentOrderKey.recipientName]: null,
      [PaymentOrderKey.recipientInn]: null,
      [PaymentOrderKey.recipientKpp]: null,
      [PaymentOrderKey.recipientPersonalAccount]: null,
      [PaymentOrderKey.recipientTofkCode]: null,
      [PaymentOrderKey.recipientTofkName]: null,
      [PaymentOrderKey.recipientBudgetCode]: null,
      [PaymentOrderKey.recipientBudgetType]: null,
      [PaymentOrderKey.recipientOktmoPpo]: null,
      [PaymentOrderKey.recipientOrgName]: null,
      [PaymentOrderKey.accountNumber]: null,
      [PaymentOrderKey.baTofkCode]: null,
    };
  });

  watch(() => reactive({ selected: selected.value, relatedDocSelected: relatedDocSelected.value }), (newVal) => {
    if (newVal.selected) {
      store.setAmount(newVal.selected.amount - (newVal.relatedDocSelected?.reduce((acc, val) => val.amountFunds + acc, 0) ?? 0));
    } else {
      store.setAmount(0);
    }
  });

  watch(() => selected.value, () => {
    if (selected.value?.paymentOrder.recipient.recipientCardNumber) {
      getRelatedDocDataTable(selected.value.paymentOrder.recipient.recipientCardNumber);
      return;
    }
    relatedDocs.value = [];
  });

  watch(() => verifiedRecipient.value, (val) => {
    store.setClassifyData({
      ...val,
    });
  }, { deep: true });

  onBeforeMount(() => {
    getDataTable();
  });

  const summary = computed(() => {
    const value = getRowsSumByField(relatedDocSelected.value, UnusedFundsTableKey.amountFunds);
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
    if (selected.value?.paymentOrder.recipient.recipientCardNumber) {
      getRelatedDocDataTable(selected.value.paymentOrder.recipient.recipientCardNumber);
      return;
    }
    relatedDocs.value = [];
  }, { deep: true });
</script>

<template>
  <Card fullHeight>
    <FlexCol fullHeight gap="5">
      <DataTable
        class="po-for-receipts-40116__table"
        :columns="columns"
        :data="data"
        :fillContainerHeightId="id"
        headerPaddings="24px 5px"
        :highlightedRows="highLighted ? [highLighted] : undefined"
        :index="PaymentOrderKey.exKey"
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
      <Accordion
        v-if="isRecipientNeed"
        v-model="isRecipientOpen"
      >
        <template #header>Выверенный получатель</template>
        <template #content>
          <FlexCol gap="4">
            <VGrid cols="2" gap="4">
              <Input
                v-model="verifiedRecipient.recipientRegistryCode"
                :label="PaymentOrdersVocabulary.recipientRegistryCode"
                required
                size="small"
              />
              <Input
                v-model="verifiedRecipient.recipientName"
                :label="PaymentOrdersVocabulary.recipientName"
                required
                size="small"
              />
            </VGrid>
            <VGrid cols="4" gap="4">
              <Input
                v-model="verifiedRecipient.recipientCardNumber"
                :label="PaymentOrdersVocabulary.recipientCardNumber"
                mask="#### #### #### ####"
                required
                size="small"
              />
              <Input
                v-model="verifiedRecipient.recipientBudgetCode"
                :label="PaymentOrdersVocabulary.recipientBudgetCode"
                required
                size="small"
              />
              <Input
                v-model="verifiedRecipient.recipientTofkCode"
                :label="PaymentOrdersVocabulary.recipientTofkCode"
                required
                size="small"
              />
              <Input
                v-model="verifiedRecipient.recipientPersonalAccount"
                :label="PaymentOrdersVocabulary.recipientPersonalAccount"
                size="small"
              />
            </VGrid>
          </FlexCol>
        </template>
      </Accordion>

      <Divider v-if="!isRecipientNeed" :margin="10" />

      <DataTable
        v-if="!isRecipientNeed"
        class="po-for-receipts-40116__related-docs__table"
        :columns="relatedDocColumns"
        :data="relatedDocs"
        :fillContainerHeightId="id"
        headerPaddings="24px 5px"
        :index="PaymentOrderKey.docNumber"
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
.po-for-receipts-40116,
.po-for-receipts-40116__related-docs
{
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
