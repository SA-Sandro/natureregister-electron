import { SpecimenObservation } from '@domain/entities/SpecimenObservation';
import { UUID } from 'node:crypto';

export interface SpecimenObservationRepository {
  findSpecimenObservationById(uuid: UUID): Promise<SpecimenObservation | null>;
  findAllSpecimenObservations(): Promise<SpecimenObservation[]>;
  save(specimenObservation: SpecimenObservation): Promise<void>;
}
