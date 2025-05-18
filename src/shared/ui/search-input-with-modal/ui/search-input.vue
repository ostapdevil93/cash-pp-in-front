<script setup lang="ts">
  import { Input } from '@ebp/vue-ui-lib';
  import { computed, defineAsyncComponent, watch } from 'vue';
  import { useToggle } from '@ebp/utils';
  import { Dictionary } from '@/shared/config';
  import { useSearchInputStore } from '../store/use-search-input.store.ts';

  const props = defineProps<{
    modelValue: string | null,
    responseFieldName: string,
    readonly?: boolean,
    hasError?: boolean,
    disabled?: boolean,
    label?: string,
    dictionary?: Dictionary,
    docDate?: string,
    tofkCode?: string,
    source: string,
    maxLength: number,
    requestParams?: Record<string, any>,
    searchFieldName?: string;
    mask?: string;
    maskTokens?: object;
    required?: boolean;
    rules?: any[];
  }>();

  const emit = defineEmits(['update:modelValue', 'onChange']);

  const SearchModal = defineAsyncComponent(() => import('./search-modal.vue'));

  const store = useSearchInputStore();
  const {
    updateTofkCode,
    updateDocDate,
    updateDictionary,
    updateSource,
    updateRequestParams,
    setSearchFieldName,
  } = store;

  const inputValue = computed({
    get: () => props.modelValue ?? '',
    set: (value: string) => {
      emit('update:modelValue', value);
    },
  });

  const label = computed(() => props.label ?? '');
  const modal = useToggle(false);

  const closeModal = () => {
    modal.onClose();
  };

  const initStore = () => {
    updateDictionary((props.dictionary ? props.dictionary : undefined));
    updateTofkCode((props.tofkCode ? props.tofkCode : '5900'));
    updateDocDate((props.docDate ? props.docDate : ''));
    updateSource((props.source ? props.source : ''));
    setSearchFieldName(props.searchFieldName);
    updateRequestParams(props.requestParams ?? {});
  };

  const openModal = () => {
    modal.onOpen();
    initStore();
  };

  watch(() => props.requestParams, async (requestParams: Record<string, any>) => {
    if (JSON.stringify(props.requestParams) === JSON.stringify(store.requestParams)) {
      return;
    }
    if (props.dictionary === Dictionary.PARTNER_NAME) {
      initStore();
      if (!requestParams.payerPartnerName && !requestParams.recipientPartnerName) {
        store.pickSelectedRow([{}]);
        return;
      }
      await store.getDataTable();
      store.pickSelectedRow([store.data[0] ?? {}]);
      return;
    }
    if (store.source !== props.source) {
      return;
    }
    updateRequestParams(requestParams ?? {});
  });

  watch(() => store.picked, (newValue: Record<string, any>) => {
    if (store.source !== props.source) {
      return;
    }
    inputValue.value = newValue[props.responseFieldName];
    emit('onChange', newValue);
  });
</script>

<template>
  <Input
    v-model="inputValue"
    :appendIcon="props.dictionary === Dictionary.PARTNER_NAME
      ? undefined
      : {
        name: 'IconSearchStatus1',
        color: readonly || disabled
          ? 'var(--primary-colors-secondary)'
          : 'var(--primary-colors-primary)',
        action: () => readonly ? null : openModal(),
      }"
    class="search-input"
    :disabled="disabled"
    :hasError="hasError"
    :label="label"
    :mask="props.mask"
    :maskTokens="props.maskTokens"
    :maxLength="maxLength"
    :readonly="readonly"
    :required="props.required"
    :rules="props.rules"
    :showClearButton="false"
    size="small"
  />
  <SearchModal
    v-if="modal.isOpen.value"
    :isOpen="modal.isOpen.value"
    @onClose="closeModal"
    @onOpen="openModal"
  >
    <template #filter="{ currentFilter }">
      <Input
        v-if="searchFieldName"
        v-model="currentFilter[searchFieldName]"
        :label="label"
        :mask="props.mask"
        :maskTokens="props.maskTokens"
        :maxLength="maxLength"
        placeholder="Введите значение"
        :rules="props.rules"
        size="small"
      />
    </template>
  </SearchModal>
</template>

<style scoped lang="scss">
.form-control-success {
  :deep(.control) {
    border-color: var(--color-green);
    justify-content: space-between;
  }
}

.form-control-error {
  :deep(.control) {
    border-color: var(--color-red);
  }
}
</style>
