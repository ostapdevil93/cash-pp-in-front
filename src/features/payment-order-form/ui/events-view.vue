<script setup lang="ts">
  import { FlexCol } from '@ebp/vue-ui-lib';
  import { EventLog } from '@ebp/core';
  import { usePaymentOrderItemStore } from '../model';

  const store = usePaymentOrderItemStore();

  const { getEventLogData } = store;
</script>

<template>
  <FlexCol
    class="mt-3"
    fullHeight
  >
    <EventLog
      :getData="getEventLogData"
    />
  </FlexCol>
</template>
