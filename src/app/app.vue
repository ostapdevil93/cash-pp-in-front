<script setup lang="ts">
  import { computed, nextTick, onBeforeMount, ref, watchEffect } from 'vue';
  import { updateState } from '@ebp/utils';
  import '@ebp/vue-ui-lib/styles';
  import '@ebp/notification/style.css';
  import '@ebp/pdf-viewer/style.css';
  import { NotificationsContainer } from '@ebp/notification';
  import { FlexCol, TabBar, PageHeader } from '@ebp/vue-ui-lib';
  import { useRoute, useRouter } from 'vue-router';
  import { PrintFormModal } from '@ebp/core';
  import { _paths, _routeNames, getRouteNames, getRoutePaths } from '@/shared/config';
  import { useUserAccessStore } from '@/shared/store/use-user-access.store.ts';
  import { printFormAdapter } from '@/shared/config/print-form.config';

  const props = withDefaults(defineProps<{baseUrl: string}>(), {
    baseUrl: '',
  });

  watchEffect(() => {
    updateState(_paths, getRoutePaths(props.baseUrl));
    updateState(_routeNames, getRouteNames(props.baseUrl));
  });

  const userAccessStore = useUserAccessStore();
  const router = useRouter();
  const route = useRoute();
  const currentRoute = ref('');

  const menuConfig = computed<{value: string, label: string, name: string}[]>(() => [
    { value: _paths.PAYMENT_ORDERS_LIST, label: 'Платежное поручение (входящее)', name: _routeNames.PAYMENT_ORDERS_LIST },
    { value: _paths.VERIFICATION, label: 'Форма выверки поступлений', name: _routeNames.VERIFICATION },
  ]);
  const defaultRoute = menuConfig.value[0];

  onBeforeMount(() => {
    userAccessStore.init();
  });

  watchEffect(async () => {
    const activeRoute = menuConfig.value
      .filter((x) => /\/[^/]+$/.test(x.value))
      .find((x) => route.fullPath.includes(x.value));
    await nextTick();
    currentRoute.value = activeRoute?.value || defaultRoute.value;
  });

  const onTabClick = (value: string | number) => {
    currentRoute.value = String(value);
    router.push(String(value));
  };

</script>

<template>
  <div id="cash-pp-in-front">
    <FlexCol
      fullHeight
      gap="4"
    >
      <PageHeader
        hideBackBtn
        title="Поступления"
      />
      <TabBar
        :items="menuConfig"
        :modelValue="currentRoute"
        type="main"
        @update:modelValue="onTabClick"
      />
      <router-view v-if="userAccessStore.isInited" />
    </FlexCol>
  </div>
  <PrintFormModal :printFormAdapter="printFormAdapter" />
  <NotificationsContainer />
</template>

<style lang="scss">
</style>
