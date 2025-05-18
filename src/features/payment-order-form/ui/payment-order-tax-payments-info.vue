<script setup lang="ts">
  import {
    Input,
    VGrid,
    Text,
    DatePicker,
  } from '@ebp/vue-ui-lib';
  import { storeToRefs } from 'pinia';
  import { PaymentOrdersVocabulary } from '@/entities/payment-orders-item';
  import { usePaymentOrderItemStore } from '../model';

  const paymentOrderItemStore = usePaymentOrderItemStore();
  const { taxPayments } = storeToRefs(paymentOrderItemStore);
</script>

<template>
  <VGrid cols="1">
    <Text color="var(--primary-colors-primary)" font-weight="500" variant="subtitle2">
      {{ PaymentOrdersVocabulary.taxPayments }}
    </Text>
    <VGrid cols="4" gap="4">
      <Input
        v-model="taxPayments.payerStatus"
        :label="PaymentOrdersVocabulary.payerStatus"
        readonly
        size="small"
      />
      <Input
        v-model="taxPayments.kbk"
        :label="PaymentOrdersVocabulary.kbk"
        readonly
        size="small"
      />
      <Input
        v-model="taxPayments.oktmoCode"
        :label="PaymentOrdersVocabulary.oktmoCode"
        readonly
        size="small"
      />
      <Input
        v-model="taxPayments.paymentReason"
        :label="PaymentOrdersVocabulary.paymentReason"
        readonly
        size="small"
      />
      <DatePicker
        v-model="taxPayments.taxPeriod"
        :label="PaymentOrdersVocabulary.taxPeriod"
        readonly
        size="small"
      />
      <Input
        v-model="taxPayments.taxDocNumber"
        :label="PaymentOrdersVocabulary.taxDocNumber"
        readonly
        size="small"
      />
      <Input
        v-model="taxPayments.taxDocDate"
        :label="PaymentOrdersVocabulary.taxDocDate"
        readonly
        size="small"
      />
      <Input
        v-model="taxPayments.payoutCode"
        :label="PaymentOrdersVocabulary.payoutCode"
        readonly
        size="small"
      />
      <Input
        v-model="taxPayments.reserveField"
        class="united-cells-left"
        :label="PaymentOrdersVocabulary.reserveField"
        readonly
        size="small"
      />
      <Input
        v-model="taxPayments.taxPurposeOfPayment"
        class="united-cells-right"
        :label="PaymentOrdersVocabulary.taxPurposeOfPayment"
        readonly
        size="small"
      />
    </VGrid>
  </VGrid>
</template>

<style lang="scss" scoped>
.united-cells-left {
  grid-column: 1 / 3;
}
.united-cells-right {
  grid-column: 3 / 5;
}
</style>
