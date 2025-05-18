import { defineStore } from 'pinia';
import { computed, ref, unref } from 'vue';
import { getDictionary } from '../../../api';
import { notifyDefaultError } from '../../../lib';
import { Dictionary, DictionaryData, mergeFlattenedKeys } from '../../../config';

export const useSearchInputStore = defineStore('searchInputStore', () => {
  const requestParams = ref<Record<string, any>>({});
  const data = ref<DictionaryData[]>([]);
  const isLoading = ref(false);
  const picked = ref<unknown>(null);
  const tofkCode = ref<string>('');
  const docDate = ref<string>('');
  const source = ref<string>('');
  const dictionary = ref<Dictionary>(Dictionary.BANK_ACCOUNT);
  const searchFieldName = ref<string>();

  const maxLengthRule = computed<number>(() => {
    if (dictionary.value === Dictionary.BANK_ACCOUNT) {
      return 20;
    }
    return 9;
  });

  const updateTofkCode = (newTofkCode: string) => {
    tofkCode.value = newTofkCode;
  };
  const updateDocDate = (newDocDate: string) => {
    docDate.value = newDocDate;
  };
  const updateDictionary = (newDictionary: Dictionary = Dictionary.BANK_ACCOUNT) => {
    dictionary.value = newDictionary;
  };

  const updateSource = (_source: string) => {
    source.value = _source;
  };

  const updateRequestParams = (newFilter: Record<string, any>) => {
    if (!searchFieldName.value) {
      requestParams.value = {
        ...newFilter,
      };
      return;
    }
    requestParams.value = {
      [searchFieldName.value]: '',
      ...newFilter,
    };
  };

  const setSearchFieldName = (newValue?: string) => {
    searchFieldName.value = newValue;
  };

  const pickSelectedRow = (value: unknown[]) => {
    picked.value = value.length ? value[value.length - 1] : null;
  };

  const getDataTable = async () => {
    isLoading.value = true;
    try {
      data.value = await getDictionary<DictionaryData>(dictionary.value, mergeFlattenedKeys(unref(requestParams)));
    } catch (err) {
      notifyDefaultError(err);
      data.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const clearAllData = () => {
    updateRequestParams({});
    dictionary.value = Dictionary.BANK_ACCOUNT;
    data.value = [];
  };

  return {
    requestParams,
    data,
    isLoading,
    picked,
    updateRequestParams,
    setSearchFieldName,
    pickSelectedRow,
    getDataTable,
    clearAllData,
    tofkCode,
    updateTofkCode,
    docDate,
    updateDocDate,
    dictionary,
    updateDictionary,
    source,
    updateSource,
    maxLengthRule,
  };
});
