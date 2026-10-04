<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { SpecimenObservationImpl } from '@/api/SPObservation/SpecimenObservationImpl';
import type { SpecimenInfoSuggestionField } from '@/interfaces/SpecimenObservationInterface';

const props = withDefaults(
  defineProps<{
    id: string;
    modelValue: string;
    field: SpecimenInfoSuggestionField;
    placeholder?: string;
    minCharacters?: number;
    debounceMs?: number;
  }>(),
  {
    placeholder: '',
    minCharacters: 2,
    debounceMs: 350,
  },
);

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const specimenObservationApi = new SpecimenObservationImpl();
const suggestions = ref<string[]>([]);
const isLoading = ref(false);
const errorMessage = ref('');
const hasSearched = ref(false);
const activeIndex = ref(-1);
let timeout: ReturnType<typeof setTimeout> | undefined;
let requestId = 0;

const clearSuggestions = () => {
  suggestions.value = [];
  activeIndex.value = -1;
};

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  emit('update:modelValue', value);

  if (timeout) clearTimeout(timeout);
  const currentRequestId = ++requestId;
  const query = value.trim();
  clearSuggestions();
  errorMessage.value = '';
  hasSearched.value = false;
  isLoading.value = false;

  if (query.length < props.minCharacters) return;

  timeout = setTimeout(async () => {
    isLoading.value = true;
    try {
      const results = await specimenObservationApi.getSpecimenInfoSuggestions(query, props.field);
      if (currentRequestId === requestId) {
        suggestions.value = results;
        hasSearched.value = true;
      }
    } catch (error) {
      console.error('Error loading autocomplete suggestions:', error);
      if (currentRequestId === requestId) {
        errorMessage.value = 'No se pudieron cargar las sugerencias.';
        hasSearched.value = true;
      }
    } finally {
      if (currentRequestId === requestId) {
        isLoading.value = false;
      }
    }
  }, props.debounceMs);
};

const selectSuggestion = (suggestion: string) => {
  requestId++;
  if (timeout) clearTimeout(timeout);
  emit('update:modelValue', suggestion);
  clearSuggestions();
  errorMessage.value = '';
  hasSearched.value = false;
  isLoading.value = false;
};

onBeforeUnmount(() => {
  if (timeout) clearTimeout(timeout);
  requestId++;
});
</script>

<template>
  <div class="relative">
    <input
      :id="props.id"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      type="text"
      autocomplete="off"
      role="combobox"
      aria-autocomplete="list"
      :aria-controls="`${props.id}-suggestions`"
      :aria-expanded="suggestions.length > 0"
      :aria-activedescendant="
        activeIndex >= 0 ? `${props.id}-suggestion-${activeIndex}` : undefined
      "
      class="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-400"
      @input="handleInput"
      
    />
    <ul
      v-if="suggestions.length > 0"
      :id="`${props.id}-suggestions`"
      class="absolute z-20 mt-1 max-h-40 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-md"
      role="listbox"
      :aria-label="`${props.id} suggestions`"
    >
      <li v-for="(suggestion, index) in suggestions" :key="suggestion" role="presentation">
        <button
          :id="`${props.id}-suggestion-${index}`"
          type="button"
          role="option"
          :aria-selected="index === activeIndex"
          class="w-full px-4 py-2 text-left hover:bg-green-50"
          @mousedown.prevent
          @click="selectSuggestion(suggestion)"
        >
          {{ suggestion }}
        </button>
      </li>
    </ul>
    <p v-if="isLoading" class="mt-1 text-sm text-slate-500" role="status">
      Buscando sugerencias…
    </p>
    <p v-else-if="errorMessage" class="mt-1 text-sm text-red-600" role="alert">
      {{ errorMessage }}
    </p>
    <p v-else-if="hasSearched && suggestions.length === 0" class="mt-1 text-sm text-slate-500" role="status">
      No se encontraron sugerencias.
    </p>
  </div>
</template>
