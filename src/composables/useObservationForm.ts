import { computed, reactive, isRef, Ref } from 'vue';
import { FormState } from '@/types/RegistrationFormType';
import { SpecimenObservationWithImage } from '@/types/SpecimenObservationType';
import { getGenusByScientificName } from '@/utils/GetGenusByScientificName';

export function useObservationForm(id: string | Ref<string>) {
  const idRef = isRef(id) ? id : computed(() => id as string);

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
      comments: '',
    };
  }

  const form = reactive(getDefaultForm());

  function mapToSpecimenObservation(imagePath?: string): SpecimenObservationWithImage {
    const defaultIfEmpty = (value: string) => (value?.trim() ? value : 'Sin determinar');

    return {
      uuid: idRef.value,
      specimenInfo: {
        scientificName: defaultIfEmpty(form.scientificName),
        genus: getGenusByScientificName(defaultIfEmpty(form.scientificName)),
        family: defaultIfEmpty(form.family),
        orden: defaultIfEmpty(form.order),
      },
      observedAt: form.observedAt,
      geospatialData: {
        coordinates: form.coordinates,
        locality: defaultIfEmpty(form.locality),
        province: defaultIfEmpty(form.province),
        observationSite: defaultIfEmpty(form.observationPlace),
      },
      comments: form.comments,
      imagePath,
    };
  }

  function field<K extends keyof FormState>(name: K) {
    return computed<FormState[K]>({
      get: () => form[name] as FormState[K],
      set: (v: FormState[K]) => (form[name] = v as any),
    });
  }

  return { form, field, mapToSpecimenObservation } as const;
}
