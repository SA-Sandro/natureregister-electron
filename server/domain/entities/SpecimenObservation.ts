import { GeospatialData } from '@domain/valueObjects/GeospatialData';
import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { SpecimenInfo } from '@domain/valueObjects/SpecimenInfo';

export class SpecimenObservation {
  constructor(
    private readonly uuid: string,
    private readonly specimenInfo: SpecimenInfo,
    private readonly observedAt: ObservationDate,
    private readonly geospatialData: GeospatialData,
    private readonly comments: string,
  ) {}

  getUuid(): string {
    return this.uuid;
  }

  getSpecimenInfo(): SpecimenInfo {
    return this.specimenInfo;
  }

  getObservedAt(): ObservationDate {
    return this.observedAt;
  }

  getGeospatialData(): GeospatialData {
    return this.geospatialData;
  }

  getComments(): string {
    return this.comments;
  }
}
