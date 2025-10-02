import { SpecimenObservation } from '@domain/entities/SpecimenObservation';

export interface SpecimenObservationRepository {
  findSpecimenObservationById(uuid: string): Promise<SpecimenObservation | null>;
  findAllSpecimenObservations(): Promise<SpecimenObservation[]>;
  save(specimenObservation: SpecimenObservation): Promise<void>;
}
