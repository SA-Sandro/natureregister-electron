import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { UUID } from 'crypto';

export class SpecimentObservation {
  constructor(
    private readonly uuid: UUID,
    private readonly specieInfoId: number,
    private readonly observedAt: ObservationDate,
    private readonly geospatialDataId: number,
    private readonly comments: string,
  ) {}
}
