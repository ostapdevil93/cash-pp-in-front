<script setup lang="ts">
  import { Checkbox, SingleSelect, FlexRow, PageWrapper, Button, MoneyInput } from '@ebp/vue-ui-lib';
  import { computed, defineAsyncComponent, ref, watch } from 'vue';
  import { storeToRefs } from 'pinia';
  import { classify } from '@/shared/api/ivf-api';
  import { useUnverifiedAmountStore } from '@/shared/store';

  const store = useUnverifiedAmountStore();

  const { unverifiedAmount, classifyRequestParams, isVerified } = storeToRefs(store);

  const VerificationUnusedFundsList = defineAsyncComponent(() => import('@/widgets/verification-unused-funds/ui/verification-unused-funds-list.vue'));
  const VerificationPoForReceiptsList = defineAsyncComponent(() => import('@/widgets/verification-po-for-receipts/ui/verification-po-for-receipts-list.vue'));

  const activePage = ref<'UnusedFunds' | 'PoForReceipts40116'>('PoForReceipts40116');

  const isRecipientNeed = ref(false);

  const currentComponent = computed(() => ({
    UnusedFunds: VerificationUnusedFundsList,
    PoForReceipts40116: VerificationPoForReceiptsList,
  }));

  const selectOptions = computed(() => [
    {
      label: 'Расшифровка',
      value: 'UnusedFunds',
    },
    {
      label: 'Платежное поручение',
      value: 'PoForReceipts40116',
    },
  ]);

  watch(() => activePage.value, () => {
    store.setClassifyData({
      recipientPersonalAccount: null,
      recipientRegistryCode: null,
      recipientName: null,
      recipientCardNumber: null,
      recipientBudgetCode: null,
      recipientTofkCode: null,
      unusedFundsDescriptionArray: [],
      poForReceipts40116Array: [],
    });
    store.setAmount(0);
  });
</script>

<template>
  <PageWrapper>
    <template #header>
      <FlexRow align="c" justify="sb">
        <FlexRow align="c" gap="3">
          <SingleSelect
            v-model="activePage"
            :options="selectOptions"
            :showClearButton="false"
            size="small"
            style="width: 400px"
          />
          <Checkbox
            v-show="activePage === 'PoForReceipts40116'"
            v-model="isRecipientNeed"
            label="Необходимо выбрать получателя"
          />
        </FlexRow>
        <MoneyInput
          :hasError="unverifiedAmount !== 0"
          label="Невыверенная сумма"
          :modelValue="unverifiedAmount"
          :showClearButton="false"
          size="small"
          style="width: 400px"
        />
      </FlexRow>
    </template>
    <component
      :is="currentComponent[activePage]"
      :isRecipientNeed="isRecipientNeed"
    />
    <FlexRow align="c" fullWidth justify="sa">
      <Button
        :disabled="!isVerified"
        @click="classify(classifyRequestParams)"
      >
        Выверить
      </Button>
    </FlexRow>
  </PageWrapper>
</template>
