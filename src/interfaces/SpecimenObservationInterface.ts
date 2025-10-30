import { SpecimenObservation } from '@/types/SpecimenObservationType';

export interface SpecimenObservationInterface {
  getAll(): Promise<SpecimenObservation[]>;
}
