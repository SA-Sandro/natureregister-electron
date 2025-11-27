import { defineStore } from 'pinia';
import { ImageLinkedToObservationType } from '@/types/SpecimenObservationType';

export const useSpecimenInfoStore = defineStore('specimenInfoStore', {
  state: () => ({
    observationInfo: null as ImageLinkedToObservationType | null,
  }),
  actions: {
    setSpecimenInfo(observationInfo: ImageLinkedToObservationType) {
      this.observationInfo = observationInfo;
    },
    clearSpecimenInfo() {
      this.observationInfo = null;
    },
  },
});
