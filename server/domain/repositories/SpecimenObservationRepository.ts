import { SpecimenObservation } from '@domain/entities/SpecimenObservation';

export type SpecimenInfoSuggestionField = 'scientificName' | 'family' | 'orden';

export interface SpecimenObservationRepository {
  findSpecimenObservationById(uuid: string): Promise<SpecimenObservation | null>;
  findAllSpecimenObservations(): Promise<SpecimenObservation[]>;
  findSpecimenInfoSuggestions(
    input: string,
    field: SpecimenInfoSuggestionField,
  ): Promise<string[]>;
  save(specimenObservation: SpecimenObservation): Promise<void>;
}
