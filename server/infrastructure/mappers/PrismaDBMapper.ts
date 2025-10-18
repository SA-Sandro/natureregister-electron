import { SpecimenObservation } from '@domain/entities/SpecimenObservation';
import { GeospatialData } from '@domain/valueObjects/GeospatialData';
import { SpecimenInfo } from '@domain/valueObjects/SpecimenInfo';
import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { UUID } from 'crypto';

import type {
  SpecimenObservation as PrismaSpecimenObservation,
  SpecimenInfo as PrismaSpecimenInfo,
  GeoSpatialData as PrismaGeoSpatialData,
} from '@prisma/client';

export class PrismaDBMapper {
  static specimenObservationFromPrisma(
    record: PrismaSpecimenObservation & {
      specimenInfo: PrismaSpecimenInfo;
      geoSpatialData: PrismaGeoSpatialData;
    },
  ): SpecimenObservation {
    return new SpecimenObservation(
      record.uuid as unknown as UUID,
      PrismaDBMapper.specimenInfoFromPrismaClient(record.specimenInfo),
      new ObservationDate(record.observedAt),
      PrismaDBMapper.geoSpatialDataFromPrisma(record.geoSpatialData),
      record.comments ?? '',
    );
  }

  static geoSpatialDataFromPrisma(record: PrismaGeoSpatialData): GeospatialData {
    return new GeospatialData(
      record.id,
      record.coordinates,
      record.locality,
      record.province,
      record.observationSite,
    );
  }

  static specimenInfoFromPrismaClient(record: PrismaSpecimenInfo): SpecimenInfo {
    return new SpecimenInfo(
      record.id,
      record.scientificName,
      record.genus,
      record.family,
      record.orden,
    );
  }
}
