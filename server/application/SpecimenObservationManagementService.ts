import { SpecimenObservation } from '@domain/entities/SpecimenObservation';
import {
  ObservationSuggestionField,
  SpecimenObservationRepository,
} from '@domain/repositories/SpecimenObservationRepository';

export class SpecimenObservationManagementService {
  constructor(private readonly specimenObservationRepository: SpecimenObservationRepository) {}

  public async saveSpecimenObservation(observation: SpecimenObservation): Promise<void> {
    return this.specimenObservationRepository.save(observation);
  }

  public async getAllSpecimenObservations(): Promise<SpecimenObservation[]> {
    return this.specimenObservationRepository.findAllSpecimenObservations();
  }

  public async getSpecimenObservationById(uuid: string): Promise<SpecimenObservation | null> {
    return this.specimenObservationRepository.findSpecimenObservationById(uuid);
  }

  public async getSpecimenInfoSuggestions(
    input: string,
    field: ObservationSuggestionField,
  ): Promise<string[]> {
    return this.specimenObservationRepository.findSpecimenInfoSuggestions(input, field);
  }
}
