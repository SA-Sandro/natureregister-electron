import { SpecimenObservation } from '@domain/entities/SpecimenObservation';

export type ObservationSuggestionField =
  | 'scientificName'
  | 'family'
  | 'orden'
  | 'province'
  | 'locality'
  | 'observationSite';

export interface SpecimenObservationRepository {
  findSpecimenObservationById(uuid: string): Promise<SpecimenObservation | null>;
  findAllSpecimenObservations(): Promise<SpecimenObservation[]>;
  findSpecimenInfoSuggestions(
    input: string,
    field: ObservationSuggestionField,
  ): Promise<string[]>;
  save(specimenObservation: SpecimenObservation): Promise<void>;
}
