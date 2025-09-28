import { GeospatialData } from '@domain/valueObjects/GeospatialData';
import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { SpecimenInfo } from '@domain/valueObjects/SpecimenInfo';
import { UUID } from 'crypto';

export class SpecimenObservation {
  constructor(
    private readonly uuid: UUID,
    private readonly specieInfo: SpecimenInfo,
    private readonly observedAt: ObservationDate,
    private readonly geospatialData: GeospatialData,
    private readonly comments: string,
  ) {}
}
