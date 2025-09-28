import { GeospatialData } from '@domain/valueObjects/GeospatialData';
import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { SpecimenInfo } from '@domain/valueObjects/SpecimenInfo';
import { UUID } from 'crypto';
import type {
  SpecimenObservation as PrismaSpecimenObservation,
  SpecimenInfo as PrismaSpecimenInfo,
  GeoSpatialData as PrismaGeoSpatialData,
} from '@prisma/client';

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

  static fromPrisma(
    record: PrismaSpecimenObservation & {
      specimenInfo: PrismaSpecimenInfo;
      geoSpatialData: PrismaGeoSpatialData;
    },
  ): SpecimenObservation {
    return new SpecimenObservation(
      record.uuid as unknown as UUID,
      SpecimenInfo.fromPrisma(record.specimenInfo),
      new ObservationDate(record.observedAt),
      GeospatialData.fromPrisma(record.geoSpatialData),
      record.comments ?? '',
    );
  }
}
