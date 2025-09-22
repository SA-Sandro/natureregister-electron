import { UUID } from 'crypto';

export class SpecimentObservation {
  constructor(
    private readonly uuid: UUID,
    private readonly specieInfoId: number,
    private readonly observedAt: Date,
    private readonly geospatialDataId: number,
    private readonly comments: string,
  ) {}
}
