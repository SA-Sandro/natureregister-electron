import { SpecimenObservation } from '@domain/entities/SpecimenObservation';
import { SpecimenObservationRepository } from '@domain/repositories/SpecimenObservationRepository';

export class SpecimenObservationManagementService {
  constructor(private readonly specimenObservationRepository: SpecimenObservationRepository) {}

  public async saveSpecimenObservation(observation: SpecimenObservation): Promise<void> {
    return this.specimenObservationRepository.save(observation);
  }

  public async getAllSpecimenObservations(): Promise<SpecimenObservation[]> {
    return this.specimenObservationRepository.findAllSpecimenObservations();
  }

  public async getSpecimenObservationById(id: number): Promise<SpecimenObservation | null> {
    return this.specimenObservationRepository.findSpecimenObservationById(id);
  }
}
