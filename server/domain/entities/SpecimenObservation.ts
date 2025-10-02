import { GeospatialData } from '@domain/valueObjects/GeospatialData';
import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { SpecimenInfo } from '@domain/valueObjects/SpecimenInfo';
import { UUID } from 'crypto';

export class SpecimenObservation {
  constructor(
    private readonly uuid: UUID,
    private readonly specimenInfo: SpecimenInfo,
    private readonly observedAt: ObservationDate,
    private readonly geospatialData: GeospatialData,
    private readonly comments: string,
  ) {}

  getUuid(): UUID {
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
