import { SpecimenObservation } from '@domain/entities/SpecimenObservation';

export interface SpecimenObservationRepository {
  findSpecimenObservationById(id: number): Promise<SpecimenObservation | null>;
  findAllSpecimenObservations(): Promise<SpecimenObservation[]>;
  save(specimenObservation: SpecimenObservation): Promise<void>;
}
