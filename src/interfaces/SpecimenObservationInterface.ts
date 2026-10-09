import { SpecimenObservation } from '@/types/SpecimenObservationType';

export type ObservationSuggestionField =
  | 'scientificName'
  | 'family'
  | 'orden'
  | 'province'
  | 'locality'
  | 'observationSite';

export interface SpecimenObservationInterface {
  getAll(): Promise<SpecimenObservation[]>;
  getSpecimenInfoSuggestions(input: string, field: ObservationSuggestionField): Promise<string[]>;
}
