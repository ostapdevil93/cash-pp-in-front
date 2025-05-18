import { onBeforeMount, ref } from 'vue';
import { getDictionary } from '../api/dictionary';
import { Dictionary } from '../config';

export function useDictionary(dictionary: Dictionary) {
  const _options = ref([]);

  const loadOptions = async () => {
    try {
      _options.value = await getDictionary(dictionary);
    } catch (error) {
      console.error(`Failed to load dictionary ${dictionary}:`, error);
    }
  };

  onBeforeMount(async () => {
    await loadOptions();
  });

  return {
    options: _options,
  };
}
