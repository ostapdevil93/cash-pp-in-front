<script setup lang="ts">
  import {
    FlexRow,
    Table as DataTable,
    ButtonsMenu,
    Button,
    PageWrapper,
    Card,
    FlexCol,
    Tooltip,
    ActiveFilters,
  } from '@ebp/vue-ui-lib';
  import { computed, onBeforeMount, ref, defineAsyncComponent, watch } from 'vue';
  import { useRouter } from 'vue-router';
  import { generateUid, useUrlParams } from '@ebp/utils';
  import { storeToRefs } from 'pinia';
  import { openPrintFormModal, showServerNotification } from '@ebp/core';
  import { search, execute, ActionCode, createPOReturn, sendSVAP, download } from '@/shared/api/info-api';
  import { Pagable } from '@/shared/api';
  import { notifyDefaultError } from '@/shared/lib';
  import {
    getPaymentOrdersTableColumns,
    PaymentOrdersDocumentForTable,
    PaymentOrdersTableItem,
    PaymentOrderKey,
    getPaymentOrdersRequestFilters,
    AppCommonVocabulary,
  } from '@/entities/payment-orders-item';
  import { _routeNames, DocumentStatus } from '@/shared/config';
  import { usePaymentOrderItemStore } from '@/features/payment-order-form';
  import { OrderFilter, URL_CONFIG, useOrderFilter } from '@/features/filter';
  import { BaseSelect } from '@/shared/components/base-select';
  import { PRINT_FORM_TRIGGER } from '@/shared/config/print-form.config';

  const router = useRouter();

  const paymentOrderItemStore = usePaymentOrderItemStore();
  const { setData, toggleImportDrawerState } = paymentOrderItemStore;
  const { isImportDrawerOpen } = storeToRefs(paymentOrderItemStore);

  const orderFilterStore = useOrderFilter();
  const { filter, tagsList } = storeToRefs(orderFilterStore);
  const {
    setFilter,
    getDefaultFilter,
    onRemoveFilterTag,
    getFilterPreparedToRequest,
  } = orderFilterStore;

  const BaseListImportDrawer = defineAsyncComponent(() => import('./base-list-import-drawer.vue'));

  const data = ref<PaymentOrdersDocumentForTable[] >([]);
  const isLoading = ref(false);
  const totalElements = ref<number>(0);
  const selected = ref<PaymentOrdersDocumentForTable[]>([]);
  const highLighted = ref<string>();
  const id = generateUid();
  const fastFilterOptions = ref([
    { value: 'all', label: 'Все' },
    { value: 'classified', label: 'Классифицированные' },
    { value: 'unclassified', label: 'Неклассифицированные' },
    { value: 'unknown', label: 'Невыясненные поступления' },
  ]);
  const selectedFastFilterOption = ref('all');

  useUrlParams({
    pagination: orderFilterStore.pagination._pagination,
    filter,
    setFilter,
    defaultFilter: getDefaultFilter(),
    setPagination: orderFilterStore.pagination.setPagination,
    getUrlConfig: URL_CONFIG,
  });

  const columns = computed(() => getPaymentOrdersTableColumns(router, [
    {
      label: 'Просмотреть',
      onClick: (val: PaymentOrdersTableItem) => {
        router.push({ name: _routeNames.PAYMENT_ORDER_FORM, params: { exKey: val.exKey } });
      },
      typePermission: 'view',
    },
  ]));

  const isSelectedDraft = computed(() => {
    let flag = true;
    selected.value.forEach((item) => {
      if (item.status !== DocumentStatus.DRAFT) flag = false;
    });
    return flag;
  });

  const isSelectedAwaitingConfirm = computed(() => {
    let flag = true;
    selected.value.forEach((item) => {
      if (item.status !== DocumentStatus.AWAITING_CONFIRM) flag = false;
    });
    return flag;
  });

  const isSelectedUnclassified = computed(() => {
    let flag = true;
    selected.value.forEach((item) => {
      if (item.status !== DocumentStatus.UNCLASSIFIED) flag = false;
    });
    return flag;
  });

  const isSelectedMarkedAsUnclarified = computed(() => {
    let flag = true;
    selected.value.forEach((item) => {
      if (item.status !== DocumentStatus.MARKED_AS_UNCLARIFIED) flag = false;
    });
    return flag;
  });

  const isSelectedForSVAP = computed(() => {
    let flag = true;
    selected.value.forEach((item) => {
      if (item.status !== DocumentStatus.CLASSIFIED && item.status !== DocumentStatus.EXECUTED) flag = false;
    });
    return flag;
  });

  const selectedExKeys = computed(() => selected.value.map((item) => item.exKey));

  const getDataTable = async () => {
    isLoading.value = true;
    try {
      const res = await search<Pagable<PaymentOrdersTableItem>>(
        orderFilterStore.pagination.getPaginationParams(),
        getFilterPreparedToRequest(),
        getPaymentOrdersRequestFilters(selectedFastFilterOption.value),
      );
      data.value = [...res.content.map((item) => ({
        ...item,
        ...item.document,
        [PaymentOrderKey.createdTs]: item?.systemData?.createdTs ?? null,
      }) as PaymentOrdersDocumentForTable)];
      totalElements.value = res.totalElements;
    } catch (e) {
      notifyDefaultError(e);
    } finally {
      isLoading.value = false;
    }
  };

  const actionsButtons = computed(() => [
    {
      label: 'Редактировать',
      tooltip: 'Редактировать документ',
      disabled: !(selected.value.length === 1 && selected.value[0].status === DocumentStatus.DRAFT),
      onClick: () => {
        const val = selected.value[0] as PaymentOrdersTableItem;
        if (!val) {
          return;
        }
        setData(val);
        router.push({ name: _routeNames.PAYMENT_ORDER_FORM, params: { exKey: val.exKey } });
      },
    },
    {
      label: 'Скопировать',
      tooltip: 'Скопировать документ',
      onClick: () => {},
    },
    {
      label: 'Проверить',
      tooltip: 'Проверить документ',
      disabled: !isSelectedDraft.value,
      onClick: () => {
        selected.value.forEach(async (item) => {
          try {
            const response = await execute(item.exKey as string, ActionCode.PREPARED);
            await getDataTable();
            showServerNotification(response);
          } catch (e) {
            notifyDefaultError(e);
          }
        });
      },
    },
    {
      label: 'Удалить',
      tooltip: 'Удалить документ',
      disabled: !isSelectedDraft.value,
      onClick: () => {
        selected.value.forEach(async (item) => {
          try {
            const response = await execute(item.exKey as string, ActionCode.DELETED);
            await getDataTable();
            showServerNotification(response);
          } catch (e) {
            notifyDefaultError(e);
          }
        });
      },
    },
    {
      label: 'Отменить выверку',
      tooltip: 'Отменить выверку документа',
      disabled: !isSelectedAwaitingConfirm.value,
      onClick: () => {
        selected.value.forEach(async (item) => {
          try {
            const response = await execute(item.exKey as string, ActionCode.UNCLASSIFIED);
            await getDataTable();
            showServerNotification(response);
          } catch (e) {
            notifyDefaultError(e);
          }
        });
      },
    },
    {
      label: 'Отразить на НВС',
      tooltip: 'Отразить на НВС',
      disabled: !isSelectedUnclassified.value,
      onClick: () => {
        selected.value.forEach(async (item) => {
          try {
            const response = await execute(item.exKey as string, ActionCode.MARKED);
            await getDataTable();
            showServerNotification(response);
          } catch (e) {
            notifyDefaultError(e);
          }
        });
      },
    },
    {
      label: 'Отменить отражение на НВС',
      tooltip: 'Отменить отражение на НВС',
      disabled: !isSelectedMarkedAsUnclarified.value,
      onClick: () => {
        selected.value.forEach(async (item) => {
          try {
            const response = await execute(item.exKey as string, ActionCode.UNMARKED);
            await getDataTable();
            showServerNotification(response);
          } catch (e) {
            notifyDefaultError(e);
          }
        });
      },
    },
    {
      label: 'Сформировать ПП на возврат плательщику',
      tooltip: 'Сформировать платежное поручение на возврат плательщику',
      disabled: !(
        selected.value.length === 1
        && (
          selected.value[0].status === DocumentStatus.MARKED_AS_UNCLARIFIED
          || selected.value[0].status === DocumentStatus.REJECTED_BANK
        )
      ),
      onClick: async () => {
        try {
          const response = await createPOReturn(selected.value[0].exKey as string);
          await getDataTable();
          showServerNotification(response);
        } catch (e) {
          notifyDefaultError(e);
        }
      },
    },
    {
      label: 'Переформировать запись учета',
      tooltip: 'Переформировать запись учета',
      disabled: !isSelectedForSVAP.value,
      onClick: () => {
        selected.value.forEach(async (item) => {
          try {
            const response = await sendSVAP(item.exKey as string);
            await getDataTable();
            showServerNotification(response);
          } catch (e) {
            notifyDefaultError(e);
          }
        });
      },
    },
    {
      label: 'Скачать',
      tooltip: 'Скачать выделенные строки в таблицу',
      onClick: async () => {
        try {
          await download(selectedExKeys.value);
          // showServerNotification(response);
        } catch (e) {
          notifyDefaultError(e);
        }
      },
    },
    {
      label: 'Печать',
      disabled: !(
        selected.value.length === 1
        && (
          selected.value[0].status === DocumentStatus.DRAFT || selected.value[0].status === DocumentStatus.CREATED
        )
      ),
      onClick: async () => {
        const val = selected.value[0];
        if (!val) {
          return;
        }
        await openPrintFormModal({
          printFormList: val.printFormList || [],
          trigger: PRINT_FORM_TRIGGER.DOC_CS_0004,
          documentExKey: val.exKey || '',
          item: data.value,
        });
      },
    },
  ]);

  const changeRowsSelected = (rows: Record<string, any>[]): void => {
    selected.value = rows as PaymentOrdersDocumentForTable[];
  };

  onBeforeMount(() => {
    getDataTable();
  });

  watch(isImportDrawerOpen, (newValue) => {
    if (!newValue) {
      getDataTable();
    }
  });

  watch([() => orderFilterStore.filter, () => orderFilterStore.pagination, selectedFastFilterOption], () => {
    getDataTable();
  }, { deep: true });
</script>

<template>
  <PageWrapper>
    <template #header>
      <FlexRow align="c" justify="sb">
        <ButtonsMenu
          :actions="actionsButtons"
          :disabled="!selected.length"
          size="small"
          variant="outlined"
        >
          {{ AppCommonVocabulary.chosen }}: {{ selected.length }}
        </ButtonsMenu>
        <FlexRow gap="4">
          <BaseSelect
            v-model="selectedFastFilterOption"
            class="fast-filter"
            :options="fastFilterOptions"
            :showClearButton="false"
          />
          <Tooltip :content="AppCommonVocabulary.showFilter" placement="bottom-start" theme="button">
            <Button
              icon="IconFilter"
              size="small"
              variant="outlined"
              @click="orderFilterStore.isOpen = true"
            />
          </Tooltip>
          <Button
            size="small"
            @click="$router.push({ name: _routeNames.PAYMENT_ORDER_FORM })"
          >
            {{ AppCommonVocabulary.create }}
          </Button>
          <Button
            :onClick="() => toggleImportDrawerState()"
            size="small"
          >
            {{ AppCommonVocabulary.import }}
          </Button>
        </FlexRow>
      </FlexRow>
    </template>

    <Card fullHeight>
      <FlexCol fullHeight gap="3">
        <ActiveFilters
          :items="tagsList"
          zIndex="MODAL_HINTS"
          @click:close="value => onRemoveFilterTag(value)"
        />
        <FlexCol :id="id" fullHeight>
          <DataTable
            :columns="columns"
            :data="data"
            :fillContainerHeightId="id"
            :highlightedRows="highLighted ? [highLighted] : undefined"
            :index="PaymentOrderKey.exKey"
            :isLoading="isLoading"
            :pagination="{
              page: orderFilterStore.pagination._pagination.page,
              pageSize: orderFilterStore.pagination._pagination.size,
              pageSizeVariants: [10, 20, 30, 40, 50],
              totalElements,
            }"
            selectable="multiple"
            :sort="orderFilterStore.pagination._pagination.sort"
            :sortEnabled="true"
            @onPageChange="orderFilterStore.pagination.setPage"
            @onPageSizeChange="orderFilterStore.pagination.setSize"
            @onRowSelectionChange="changeRowsSelected"
            @onSortChange="orderFilterStore.pagination.setSort"
          />
        </FlexCol>
      </FlexCol>
    </Card>
    <OrderFilter
      v-if="orderFilterStore.isOpen"
      @onClose="orderFilterStore.isOpen = false"
    />
  </PageWrapper>

  <BaseListImportDrawer v-if="isImportDrawerOpen" />
</template>

<style lang="scss" scoped>
.fast-filter {
  min-width: 200px;
}
</style>
