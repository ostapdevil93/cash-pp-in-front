<script setup lang="ts">
  import { FlexRow, VDrawer, VGrid, VUpload, Button } from '@ebp/vue-ui-lib';
  import { ref } from 'vue';
  import { showServerNotification } from '@ebp/core';
  import { storeToRefs } from 'pinia';
  import { notifyDefaultError } from '@/shared/lib';
  import { AppCommonVocabulary } from '@/entities/payment-orders-item';
  import { uploadXML } from '@/shared/api/info-api';
  import { usePaymentOrderItemStore } from '@/features/payment-order-form';

  const paymentOrderItemStore = usePaymentOrderItemStore();
  const { toggleImportDrawerState } = paymentOrderItemStore;
  const { isImportDrawerOpen } = storeToRefs(paymentOrderItemStore);
  const allowedExtensions = ['.xml'];
  const uploadInfo = 'Максимальный размер файла 50 МБ.';
  const uploadData = ref<File[] | null>(null);
  const uploadError = ref('');
  const onClose = () => {
    toggleImportDrawerState();
  };
  const upload = async () => {
    try {
      if (!uploadData.value) return;
      const response = await uploadXML(uploadData.value[0]);
      showServerNotification(response);
    } catch (e) {
      notifyDefaultError(e);
      uploadError.value = 'Неверный формат';
    } finally {
      if (!uploadError.value) {
        uploadData.value = null;
        onClose();
      }
    }
  };
</script>

<template>
  <VDrawer
    header="Импорт"
    :open="isImportDrawerOpen"
    @close="onClose"
  >
    <FlexRow direction="col" gap="4">
      <VGrid>
        <VUpload
          v-model="uploadData"
          :allowedExtensions="allowedExtensions"
          :bottomHint="uploadInfo"
          :errorMessages="uploadError"
          :hasError="!!uploadError.length"
          :maxFileSize="51200"
          :maxFilesCount="1"
          :multiple="false"
          size="large"
        />
      </VGrid>
    </FlexRow>
    <template #footer="{ close }">
      <FlexRow
        fullWidth
        gap="4"
        justify="c"
      >
        <Button
          data-testid="button-close"
          size="small"
          variant="text"
          @click="close"
        >
          {{ AppCommonVocabulary.cancel }}
        </Button>
        <Button
          data-testid="button-create"
          :disabled="!uploadData"
          size="small"
          @click="upload()"
        >
          {{ AppCommonVocabulary.upload }}
        </Button>
      </FlexRow>
    </template>
  </VDrawer>
</template>

<style scoped lang="scss">

</style>
