import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export type NullableItem<T> = { [P in keyof T]: T[P] extends object ? NullableItem<T[P]> : T[P] | null };

interface ClassifyRequestData {
  recipientPersonalAccount: string,
  recipientRegistryCode: string,
  recipientName: string,
  recipientCardNumber: string,
  recipientBudgetCode: string,
  recipientTofkCode: string,
  unusedFundsDescriptionArray: string[],
  poForReceipts40116Array: string[],
}

export const useUnverifiedAmountStore = defineStore('unverifiedAmountStore', () => {
  const unverifiedAmount = ref<number>(0);
  const classifyRequestParams = ref<NullableItem<ClassifyRequestData>>({
    recipientPersonalAccount: null,
    recipientRegistryCode: null,
    recipientName: null,
    recipientCardNumber: null,
    recipientBudgetCode: null,
    recipientTofkCode: null,
    unusedFundsDescriptionArray: [],
    poForReceipts40116Array: [],
  });

  const setAmount = (newValue: number) => {
    unverifiedAmount.value = newValue;
  };

  const setClassifyData = (params: Partial<NullableItem<ClassifyRequestData>>) => {
    classifyRequestParams.value = {
      ...classifyRequestParams.value,
      ...params,
    };
  };

  const isVerified = computed((): boolean => {
    if (classifyRequestParams.value.unusedFundsDescriptionArray.length) {
      return true;
    }
    if (classifyRequestParams.value.poForReceipts40116Array.length) {
      return true;
    }
    return !!classifyRequestParams.value.recipientRegistryCode
      && !!classifyRequestParams.value.recipientCardNumber
      && !!classifyRequestParams.value.recipientName
      && !!classifyRequestParams.value.recipientBudgetCode
      && !!classifyRequestParams.value.recipientTofkCode;
  });

  return {
    unverifiedAmount,
    classifyRequestParams,
    isVerified,
    setAmount,
    setClassifyData,
  };
});
