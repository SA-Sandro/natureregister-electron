import { SpecimenObservation } from '@/types/SpecimenObservationType';

export type SpecimenInfoSuggestionField = 'scientificName' | 'family' | 'orden';

export interface SpecimenObservationInterface {
  getAll(): Promise<SpecimenObservation[]>;
  getSpecimenInfoSuggestions(input: string, field: SpecimenInfoSuggestionField): Promise<string[]>;
}
