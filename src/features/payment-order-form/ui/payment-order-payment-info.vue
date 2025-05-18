<script setup lang="ts">
  import {
    Input,
    VGrid,
    Text,
    Textarea,
  } from '@ebp/vue-ui-lib';
  import { storeToRefs } from 'pinia';
  import { PaymentOrdersVocabulary } from '@/entities/payment-orders-item';
  import { usePaymentOrderItemStore } from '../model';

  const paymentOrderItemStore = usePaymentOrderItemStore();

  const { paymentInfo, isEditMode } = storeToRefs(paymentOrderItemStore);
</script>

<template>
  <VGrid v-if="paymentInfo" cols="1">
    <Text color="var(--primary-colors-primary)" font-weight="500" variant="subtitle2">
      {{ PaymentOrdersVocabulary.paymentInfo }}
    </Text>
    <VGrid cols="4" gap="4">
      <Input
        v-model="paymentInfo.operationType"
        :label="PaymentOrdersVocabulary.operationType"
        readonly
        size="small"
      />
      <Input
        v-model="paymentInfo.paymentPriority"
        :label="PaymentOrdersVocabulary.paymentPriority"
        readonly
        size="small"
      />
      <Input
        v-model="paymentInfo.receiptDate"
        :label="PaymentOrdersVocabulary.receiptDate"
        readonly
        size="small"
      />
      <Input
        v-model="paymentInfo.putInFileDate"
        :label="PaymentOrdersVocabulary.putInFileDate"
        readonly
        size="small"
      />
      <Input
        v-model="paymentInfo.writtenOffDate"
        :label="PaymentOrdersVocabulary.writtenOffDate"
        readonly
        size="small"
      />
      <Input
        v-model="paymentInfo.paymentTerm"
        :label="PaymentOrdersVocabulary.paymentTerm"
        readonly
        size="small"
      />
      <Input
        v-model="paymentInfo.paymentSource"
        :label="PaymentOrdersVocabulary.paymentSource"
        readonly
        size="small"
      />
      <Input
        v-model="paymentInfo.code"
        :label="PaymentOrdersVocabulary.code"
        readonly
        size="small"
      />
    </VGrid>
    <Textarea
      v-model="paymentInfo.paymentPurpose"
      :label="PaymentOrdersVocabulary.paymentPurpose"
      :readonly="!isEditMode"
      size="small"
    />
  </VGrid>
</template>

<style lang="scss" scoped>

</style>
