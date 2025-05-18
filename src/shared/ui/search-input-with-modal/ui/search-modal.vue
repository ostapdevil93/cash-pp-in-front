<script setup lang="ts">
  import {
    Button,
    Table as DataTable,
    FlexRow,
    FlexCol,
    VModal,
  } from '@ebp/vue-ui-lib';
  import { computed, onBeforeUnmount, reactive, ref, watch } from 'vue';
  import { debounce, generateUid } from '@ebp/utils';
  import { storeToRefs } from 'pinia';
  import { RequestDictionaryData } from '@/shared/config';
  import { useSearchInputStore } from '../store/use-search-input.store.ts';
  import { getColumns } from '../config';

  defineProps<{
    isOpen: boolean,
  }>();

  const emit = defineEmits<{(e: 'onClose'): void,
                            (e: 'onOpen'): void
  }>();
  defineSlots<{
    filter(props: {
      currentFilter: any
    }): any,
  }>();
  const store = useSearchInputStore();
  const { getDataTable, clearAllData, updateRequestParams, pickSelectedRow } = store;
  const { data, isLoading, requestParams, dictionary } = storeToRefs(store);
  const id = generateUid();

  const columns = getColumns(dictionary.value);
  const selected = ref<unknown>(null);

  const currentFilter = reactive<RequestDictionaryData>({
    ...requestParams.value,
  });

  const debouncedGetDataTable = debounce(() => {
    getDataTable();
  }, 500);

  const changeSelectedRow = (rows: Record<string, any>[]): void => {
    if (rows.length) {
      selected.value = rows[rows.length - 1];
    } else {
      selected.value = null;
    }
  };

  const _selected = computed<any[]>(() => {
    if (selected.value) return [selected.value];
    return [];
  });

  const _pickSelectedRow = () => {
    pickSelectedRow(_selected.value);
    emit('onClose');
  };

  watch([currentFilter], () => {
    if (Object.values(currentFilter).length) {
      updateRequestParams(currentFilter);
      debouncedGetDataTable();
    }
  }, { deep: true });

  onBeforeUnmount(() => {
    clearAllData();
  });
</script>

<template>
  <VModal
    class="search-modal"
    height="675px"
    :open="isOpen"
    width="1216px"
    :zIndex="610"
    @close="emit('onClose')"
  >
    <template #header>
      <FlexRow
        v-if="$slots.filter"
        class="filter-container"
        gap="4"
        justify="sb"
      >
        <slot :currentFilter="currentFilter" name="filter" />
      </FlexRow>
    </template>
    <template #body>
      <FlexCol :id="id" fullHeight>
        <DataTable
          :columns="columns"
          :data="data"
          :fillContainerHeightId="id"
          :isLoading="isLoading"
          selectable="single-row"
          :selectedRows="_selected"
          @onRowSelectionChange="changeSelectedRow"
        />
      </FlexCol>
    </template>
    <template #footer="{ close }">
      <FlexRow justify="sb">
        <Button size="small" variant="outlined" @click="close">
          Отмена
        </Button>
        <FlexRow>
          <Button :disabled="!selected" size="small" @click="_pickSelectedRow">
            Выбрать
          </Button>
        </FlexRow>
      </FlexRow>
    </template>
  </VModal>
</template>

<style scoped lang="scss">
.search-modal {
  :deep(.modal__content-body) {
    overflow-x:  hidden;
    height: 100%;
  }
}

.search-input {
  :deep(input) {
    cursor: pointer !important;
  }
}

.filter-container {
  height: 84px;
}
</style>
