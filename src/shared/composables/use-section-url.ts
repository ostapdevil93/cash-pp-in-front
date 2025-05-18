import { ref, watchEffect } from 'vue';
import { getUrlBySectionCode } from '@ebp/core';

export function useSectionUrl(sectionCode: string) {
  const serviceUrl = ref<string>('');
  const isLoading = ref<boolean>(false);

  const loadServiceUrl = async () => {
    isLoading.value = true;
    try {
      serviceUrl.value = await getUrlBySectionCode(sectionCode) ?? '';
    } catch (error) {
      console.error('Failed to load serviceUrl:', error);
    } finally {
      isLoading.value = false;
    }
  };

  watchEffect(async () => {
    if (!isLoading.value) return;
    await loadServiceUrl();
  });

  return {
    serviceUrl,
    isLoading,
    loadServiceUrl,
  };
}
