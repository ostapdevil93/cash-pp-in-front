<script setup lang="ts">
  import {
    VGrid,
    Input,
    DatePicker,
  } from '@ebp/vue-ui-lib';
  import { storeToRefs } from 'pinia';
  import { PaymentOrdersVocabulary } from '@/entities/payment-orders-item';
  import { usePaymentOrderItemStore } from '../model';

  const paymentOrderItemStore = usePaymentOrderItemStore();
  const { document } = storeToRefs(paymentOrderItemStore);
</script>

<template>
  <VGrid v-if="document" cols="1">
    <VGrid cols="4" gap="4">
      <Input
        v-model="document.edNumber"
        :label="PaymentOrdersVocabulary.edNumber"
        readonly
        size="small"
      />
      <Input
        v-model="document.edType"
        :label="PaymentOrdersVocabulary.edType"
        readonly
        size="small"
      />
      <DatePicker
        v-model="document.edDate"
        :label="PaymentOrdersVocabulary.edDate"
        readonly
        size="small"
      />
      <Input
        v-model="document.edId"
        :label="PaymentOrdersVocabulary.edId"
        readonly
        size="small"
      />
    </VGrid>
  </VGrid>
</template>

<style lang="scss" scoped>
</style>
