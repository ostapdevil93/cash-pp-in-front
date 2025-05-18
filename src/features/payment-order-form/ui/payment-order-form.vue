<script setup lang="ts">
  import { PageWrapper, PageHeader, Card, TabBar } from '@ebp/vue-ui-lib';
  import { computed, onBeforeMount, ref, defineAsyncComponent } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  import { PaymentOrderKey, PaymentOrdersVocabulary } from '@/entities/payment-orders-item';
  import { STATUS_COLOR, STATUS_NAME } from '@/shared/config';
  import { ControlButtons } from '@/shared/ui/execute-actions';
  import { usePaymentOrderItemStore } from '../model';

  const MainInfoView = defineAsyncComponent(() => import('./payment-order-main-info.vue'));
  const PaymentInfoView = defineAsyncComponent(() => import('./payment-order-payment-info.vue'));
  const TaxPaymentsInfoView = defineAsyncComponent(() => import('./payment-order-tax-payments-info.vue'));
  const AdditionalInfoView = defineAsyncComponent(() => import('./payment-order-additional-info.vue'));
  const CommunicationsInfoView = defineAsyncComponent(() => import('./links-view.vue'));
  const EventLogView = defineAsyncComponent(() => import('./events-view.vue'));

  const route = useRoute();
  const router = useRouter();

  const paymentOrderItemStore = usePaymentOrderItemStore();

  const { data, document } = storeToRefs(paymentOrderItemStore);
  const { getValue } = paymentOrderItemStore;

  const activeTab = ref<
    'main' |
    'paymentInfo' |
    'taxPayments' |
    'additionalInformation' |
    'eventLog' |
    'communications'
  >('main');

  const tabs = [
    {
      label: 'Основная информация',
      value: 'main',
    },
    {
      label: 'Информация о платеже',
      value: 'paymentInfo',
    },
    {
      label: 'Налоговые платежи',
      value: 'taxPayments',
    },
    {
      label: 'Дополнительная информация',
      value: 'additionalInformation',
    },
    {
      label: 'Журнал событий',
      value: 'eventLog',
    },
    {
      label: 'Связи по документу',
      value: 'communications',
    },
  ];

  const currentComponent = computed(() => ({
    main: MainInfoView,
    paymentInfo: PaymentInfoView,
    taxPayments: TaxPaymentsInfoView,
    additionalInformation: AdditionalInfoView,
    eventLog: EventLogView,
    communications: CommunicationsInfoView,
  }));

  const status = computed(() => (data.value?.currentStatus
    ? { title: STATUS_NAME[data.value.currentStatus], color: STATUS_COLOR[data.value.currentStatus] }
    : undefined));

  const subTitleItems = computed(() => {
    const result = [];
    if (document.value?.docNumber) {
      result.push({
        title: PaymentOrdersVocabulary[PaymentOrderKey.docNumber] as string,
        value: document.value.docNumber,
      });
    }
    if (document.value?.docDate) {
      result.push({
        title: PaymentOrdersVocabulary[PaymentOrderKey.docDate] as string,
        value: document.value.docDate,
        type: 'date',
      });
    }
    if (document.value?.docType) {
      result.push({
        title: PaymentOrdersVocabulary[PaymentOrderKey.docType] as string,
        value: document.value.docType,
      });
    }
    return result;
  });

  onBeforeMount(() => {
    getValue(route.params.exKey as string);
  });
</script>

<template>
  <PageWrapper v-if="data">
    <template #header>
      <PageHeader
        :status="status"
        :subTitleItems="subTitleItems"
        title="Платежное поручение (входящее)"
        @click:back="router.back()"
      />
    </template>
    <Card fullHeight hasCardActions>
      <template #header>
        <ControlButtons :store="paymentOrderItemStore" />
      </template>
      <template #navigation>
        <TabBar
          v-model="activeTab"
          :items="tabs"
          type="sub"
        />
      </template>
      <component :is="currentComponent[activeTab]" />
    </Card>
  </PageWrapper>
</template>

<style lang="scss" scoped>
</style>
