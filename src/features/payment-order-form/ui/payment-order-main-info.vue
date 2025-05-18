<script setup lang="ts">
  import { Input, MoneyInput, DatePicker, VGrid, Text } from '@ebp/vue-ui-lib';
  import { storeToRefs } from 'pinia';
  import { PaymentOrdersVocabulary, validationRule, PaymentOrderKey } from '@/entities/payment-orders-item';
  import { SearchInput } from '@/shared/ui/search-input-with-modal';
  import { Dictionary } from '@/shared/config';
  import { usePaymentOrderItemStore } from '../model';

  const paymentOrderItemStore = usePaymentOrderItemStore();

  const {
    document,
    payer,
    payerBankDetails,
    recipient,
    recipientBankDetails,
    isEditMode,
    currentErrors,
    currentPayerErrors,
  } = storeToRefs(paymentOrderItemStore);

  const onPayerBankAccountChange = (value: Record<string, any>) => {
    if (!payerBankDetails.value) {
      return;
    }
    payerBankDetails.value.payerBik = value.bankBIK;
    payerBankDetails.value.payerBankName = value.bankFullName;
    payerBankDetails.value.payerBankAccount = value.accountNumber;
    payerBankDetails.value.payerCorBankAccount = value.bankCorrAccount;
  };

  const onRecipientBankAccountChange = (value: Record<string, any>) => {
    if (!recipientBankDetails.value) {
      return;
    }
    recipientBankDetails.value.recipientBik = value.bankBIK;
    recipientBankDetails.value.recipientBankName = value.bankFullName;
    recipientBankDetails.value.recipientBankAccount = value.accountNumber;
    recipientBankDetails.value.recipientCorBankAccount = value.bankCorrAccount;
  };
</script>

<template>
  <VGrid cols="1">
    <VGrid cols="4" gap="4">
      <Input
        v-model="document.docNumber"
        :hasError="currentErrors.docNumber"
        label="Номер документа"
        :mask="validationRule(PaymentOrderKey.docNumber).mask"
        :maxLength="validationRule(PaymentOrderKey.docNumber).maxLength"
        :readonly="!isEditMode"
        required
        :rules="validationRule(PaymentOrderKey.docNumber).rules"
        :showClearButton="false"
        size="small"
      />
      <DatePicker
        v-model="document.docDate"
        label="Дата документа"
        :readonly="!isEditMode"
        required
        size="small"
      />
      <MoneyInput
        v-model="document.amount"
        :hasError="currentErrors.amount"
        :label="PaymentOrdersVocabulary.amount"
        :maxLength="validationRule(PaymentOrderKey.amount).maxLength"
        :readonly="!isEditMode"
        required
        :showClearButton="false"
        size="small"
      />
      <Input
        v-model="document.typeOfPayment"
        :label="PaymentOrdersVocabulary.typeOfPayment"
        readonly
        size="small"
      />
    </VGrid>
    <VGrid cols="1">
      <Text color="var(--primary-colors-primary)" font-weight="500" variant="subtitle2">
        {{ PaymentOrdersVocabulary.payer }}
      </Text>
      <VGrid cols="4" gap="4">
        <Input
          v-model="payer.payerInn"
          :hasError="currentPayerErrors.payerInn"
          :label="PaymentOrdersVocabulary.payerInn"
          :mask="validationRule(PaymentOrderKey.payerInn).mask"
          :maxLength="validationRule(PaymentOrderKey.payerInn).maxLength"
          :readonly="!isEditMode"
          :rules="validationRule(PaymentOrderKey.payerInn).rules"
          :showClearButton="false"
          size="small"
        />
        <Input
          v-model="payer.payerKpp"
          :hasError="currentPayerErrors.payerKpp"
          :label="PaymentOrdersVocabulary.payerKpp"
          :mask="validationRule(PaymentOrderKey.payerKpp).mask"
          :maxLength="validationRule(PaymentOrderKey.payerKpp).maxLength"
          :readonly="!isEditMode"
          :rules="validationRule(PaymentOrderKey.payerKpp).rules"
          :showClearButton="false"
          size="small"
        />
        <Input
          v-model="payer.payerRegistryCode"
          :label="PaymentOrdersVocabulary.payerRegistryCode"
          readonly
          size="small"
        />
        <Input
          v-model="recipient.recipientTofkCode"
          label="Код ТОФК"
          readonly
          size="small"
        />
      </VGrid>
      <Input
        v-model="payer.payerName"
        :hasError="currentPayerErrors.payerName"
        :label="PaymentOrdersVocabulary.payerName"
        :maxLength="validationRule(PaymentOrderKey.payerName).maxLength"
        :readonly="!isEditMode"
        required
        :rules="validationRule(PaymentOrderKey.payerName).rules"
        :showClearButton="false"
        size="small"
      />
    </VGrid>
    <VGrid cols="1">
      <Text color="var(--primary-colors-primary)" font-weight="500" variant="subtitle2">
        {{ PaymentOrdersVocabulary.payerBankDetails }}
      </Text>
      <VGrid cols="3" gap="4">
        <SearchInput
          v-model="payerBankDetails.payerBankAccount"
          :dictionary="Dictionary.BANK_ACCOUNT"
          :docDate="document?.docDate ?? ''"
          :label="PaymentOrdersVocabulary.payerBankAccountView"
          :mask="validationRule(PaymentOrderKey.payerBankAccount).mask"
          :maxLength="validationRule(PaymentOrderKey.payerBankAccount).maxLength as number"
          :readonly="!isEditMode"
          :requestParams="{
            docDate: document?.docDate ?? '',
            mode: 'YYY',
            tofkCode: '5900',
          }"
          required
          responseFieldName="accountNumber"
          :rules="validationRule(PaymentOrderKey.payerBankAccount).rules"
          searchFieldName="bankAccount"
          :source="PaymentOrderKey.payerBankAccount"
          @onChange="onPayerBankAccountChange"
        />
        <Input
          v-model="payerBankDetails.payerBik"
          :label="PaymentOrdersVocabulary.payerBik"
          readonly
          size="small"
        />
        <Input
          v-model="payerBankDetails.payerCorBankAccount"
          :label="PaymentOrdersVocabulary.payerCorBankAccount"
          readonly
          size="small"
        />
      </VGrid>
      <Input
        v-model="payerBankDetails.payerBankName"
        :label="PaymentOrdersVocabulary.payerBankNameView"
        readonly
        size="small"
      />
    </VGrid>
    <VGrid cols="1">
      <Text color="var(--primary-colors-primary)" font-weight="500" variant="subtitle2">
        {{ PaymentOrdersVocabulary.recipient }}
      </Text>
      <VGrid cols="4" gap="4">
        <Input
          v-model="recipient.recipientInn"
          :label="PaymentOrdersVocabulary.recipientInn"
          readonly
          size="small"
        />
        <Input
          v-model="recipient.recipientKpp"
          :label="PaymentOrdersVocabulary.recipientKpp"
          readonly
          size="small"
        />
        <Input
          v-model="recipient.recipientRegistryCode"
          :label="PaymentOrdersVocabulary.recipientRegistryCode"
          readonly
          size="small"
        />
        <Input
          v-model="recipient.recipientTofkCode"
          :label="PaymentOrdersVocabulary.recipientTofkCode"
          readonly
          size="small"
        />
      </VGrid>
      <Input
        v-model="recipient.recipientName"
        :label="PaymentOrdersVocabulary.recipientName"
        readonly
        size="small"
      />
    </VGrid>
    <VGrid cols="1">
      <VGrid cols="4" gap="4">
        <Input
          v-model="recipient.recipientPersonalAccount"
          :label="PaymentOrdersVocabulary.recipientPersonalAccountView"
          readonly
          size="small"
        />
        <Input
          v-model="recipient.recipientBudgetCode"
          :label="PaymentOrdersVocabulary.recipientBudgetCodeView"
          readonly
          size="small"
        />
        <Input
          v-model="recipient.recipientOktmoPpo"
          :label="PaymentOrdersVocabulary.recipientOktmoPpoView"
          readonly
          size="small"
        />
        <Input
          v-model="recipient.recipientCardNumber"
          :label="PaymentOrdersVocabulary.recipientCardNumber"
          mask="#### #### #### ####"
          readonly
          size="small"
        />
      </VGrid>
    </VGrid>
    <VGrid cols="1">
      <Text color="var(--primary-colors-primary)" font-weight="500" variant="subtitle2">
        {{ PaymentOrdersVocabulary.recipientBankDetails }}
      </Text>
      <VGrid cols="3" gap="4">
        <SearchInput
          v-model="recipientBankDetails.recipientBankAccount"
          :dictionary="Dictionary.BANK_ACCOUNT"
          :docDate="document?.docDate ?? ''"
          :label="PaymentOrdersVocabulary.recipientBankAccountView"
          :mask="validationRule(PaymentOrderKey.recipientBankAccount).mask"
          :maxLength="validationRule(PaymentOrderKey.recipientBankAccount).maxLength as number"
          :readonly="!isEditMode"
          :requestParams="{
            docDate: document?.docDate ?? '',
            mode: 'YYY',
            tofkCode: '5900',
          }"
          required
          responseFieldName="accountNumber"
          :rules="validationRule(PaymentOrderKey.recipientBankAccount).rules"
          searchFieldName="bankAccount"
          :source="PaymentOrderKey.recipientBankAccount"
          @onChange="onRecipientBankAccountChange"
        />
        <Input
          v-model="recipientBankDetails.recipientBik"
          :label="PaymentOrdersVocabulary.recipientBikView"
          readonly
          size="small"
        />
        <Input
          v-model="recipientBankDetails.recipientCorBankAccount"
          :label="PaymentOrdersVocabulary.recipientCorBankAccountView"
          readonly
          size="small"
        />
      </VGrid>
      <Input
        v-model="recipientBankDetails.recipientBankName"
        :label="PaymentOrdersVocabulary.recipientBankNameView"
        readonly
        size="small"
      />
    </VGrid>
  </VGrid>
</template>

<style lang="scss" scoped>
</style>
