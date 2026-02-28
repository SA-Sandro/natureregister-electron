import { computed, reactive, isRef, Ref } from 'vue';
import { FormState } from '@/types/RegistrationFormType';
import { SpecimenObservationWithImage } from '@/types/SpecimenObservationType';
import { getGenusByScientificName } from '@/utils/GetGenusByScientificName';

export function useObservationForm(id: string | Ref<string>) {
  const idRef = isRef(id) ? id : computed(() => id as string);

  const forms = reactive<Record<string, FormState>>({});

  function getDefaultForm(): FormState {
    return {
      scientificName: '',
      family: '',
      order: '',
      observedAt: '',
      observationPlace: '',
      province: '',
      locality: '',
      coordinates: '',
      comments: '', // new field
    };
  }

  function mapToSpecimenObservation(imagePath?: string): SpecimenObservationWithImage {
    const form = currentForm.value;
    return {
      uuid: idRef.value,
      specimenInfo: {
        scientificName: form.scientificName,
        genus: getGenusByScientificName(form.scientificName),
        family: form.family,
        orden: form.order,
      },
      observedAt: form.observedAt,
        geospatialData: {
        coordinates: form.coordinates,
        locality: form.locality,
        province: form.province,
        observationSite: form.observationPlace,
      },
      comments: form.comments, // propagate user comments
      imagePath,
    };
  }

  function ensureForm(formId: string) {
    if (!formId) return getDefaultForm();
    if (!forms[formId]) forms[formId] = getDefaultForm();
    return forms[formId];
  }

  const currentForm = computed(() => ensureForm(idRef.value || ''));

  function field<K extends keyof FormState>(name: K) {
    return computed<FormState[K]>({
      get: () => currentForm.value[name] as FormState[K],
      set: (v: FormState[K]) => (currentForm.value[name] = v as any),
    });
  }

  return { currentForm, field, mapToSpecimenObservation } as const;
}
