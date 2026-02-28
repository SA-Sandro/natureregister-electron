import { SpecimenObservationInterface } from '@/interfaces/SpecimenObservationInterface';
import { SpecimenObservation, SpecimenObservationWithImage } from '@/types/SpecimenObservationType';
import { AxiosInstance } from 'axios';
import { axiosInstance } from '@/api/http/AxiosInstance';

export class SpecimenObservationImpl implements SpecimenObservationInterface {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosInstance;
  }

  async getAll(): Promise<SpecimenObservation[]> {
    const response = await this.axiosInstance.get<SpecimenObservation[]>(
      '/specimenObservations/getAllSpecimenObservations',
    );
    return response.data;
  }

  async create(specimenObservation: SpecimenObservationWithImage): Promise<void> {
    await this.axiosInstance.post(
      '/specimenObservations/createSpecimenObservation',
      specimenObservation,
    );
  }
}
