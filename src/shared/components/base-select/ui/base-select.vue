<script setup lang="ts">
  import { VSelect } from '@ebp/vue-ui-lib';
  import { computed } from 'vue';

  // use SelectProps type form @ebp/vue-ui-lib
  type SelectOption = { label: string; value: string };

  type SelectProps = {
    type?: 'multi-select' | 'single-select';
    modelValue?: string | null;
    /**
     * Коллекция опций.
     */
    options?: SelectOption[];

    readonly?: boolean;
    disabled?: boolean;
    /**
     * Лейбл к текстовому полю
     */
    label?: string;
    /**
     * Обязательное поле, показывает в интерфейсе у Label
     */
    required?: boolean;
    showClearButton?: boolean | undefined;
  };

  const props = defineProps<SelectProps>();
  const emit = defineEmits(['update:modelValue']);

  const selectOption = computed<SelectOption | null | undefined>(() => {
    if (props.modelValue && props.options) {
      return props.options.find((item) => item.value === props.modelValue);
    }
    return null;
  });

  const onUpdate = (val: SelectOption | null | undefined) => {
    emit('update:modelValue', val?.value);
  };

</script>

<template>
  <VSelect
    hideSearchInput
    v-bind="{
      ...props,
      modelValue: selectOption,
    }"
    size="small"
    type="single-select"
    @update:modelValue="onUpdate"
  />
</template>
