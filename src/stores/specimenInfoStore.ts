import { defineStore } from 'pinia';
import type { SpecimenInfo } from '@/types/SpecimenInfo';

export const useSpecimenInfoStore = defineStore('specimenInfoStore', {
  state: () => ({
    specimenInfo: null as SpecimenInfo | null,
  }),
  actions: {
    setSpecimenInfo(info: SpecimenInfo) {
      this.specimenInfo = info;
    },
    clearSpecimenInfo() {
      this.specimenInfo = null;
    },
  },
});
