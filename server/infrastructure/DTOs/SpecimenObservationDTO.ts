import { SpecimenObservation } from '@domain/entities/SpecimenObservation';
import { GeospatialData } from '@domain/valueObjects/GeospatialData';
import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { SpecimenInfo } from '@domain/valueObjects/SpecimenInfo';

export class SpecimenObservationDTO {
  constructor(
    public readonly uuid: string,
    public readonly specimenInfo: SpecimenInfo,
    public readonly observedAt: ObservationDate,
    public readonly geospatialData: GeospatialData,
    public readonly comments: string,
  ) {}

  public static fromDomain(specimenObservation: SpecimenObservation): SpecimenObservationDTO {
    return new SpecimenObservationDTO(
      specimenObservation.getUuid(),
      specimenObservation.getSpecimenInfo(),
      specimenObservation.getObservedAt(),
      specimenObservation.getGeospatialData(),
      specimenObservation.getComments(),
    );
  }
}
