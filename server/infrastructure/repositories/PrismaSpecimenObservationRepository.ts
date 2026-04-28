import { PrismaClient } from '@prisma/client';
import { SpecimenObservationRepository } from '@domain/repositories/SpecimenObservationRepository';

import { SpecimenObservation } from '@domain/entities/SpecimenObservation';
import { PrismaDBMapper } from '@infrastructure/mappers/PrismaDBMapper';

export class PrismaSpecimenObservationRepository implements SpecimenObservationRepository {
  constructor(private prisma: PrismaClient) {}

  async findSpecimenObservationById(uuid: string): Promise<SpecimenObservation | null> {
    const record = await this.prisma.specimenObservation.findUnique({
      where: { uuid },
      include: { specimenInfo: true, geoSpatialData: true },
    });

    if (!record) return null;

    return PrismaDBMapper.specimenObservationFromPrisma(record);
  }

  async findAllSpecimenObservations(): Promise<SpecimenObservation[]> {
    const records = await this.prisma.specimenObservation.findMany({
      include: { specimenInfo: true, geoSpatialData: true },
    });
    return records.map(PrismaDBMapper.specimenObservationFromPrisma);
  }

  async save(observation: SpecimenObservation): Promise<void> {
    const specimenInfo = observation.getSpecimenInfo();
    const geoSpatialData = observation.getGeospatialData();
    await this.prisma.specimenObservation.upsert({
      where: { uuid: observation.getUuid() },
      create: {
        uuid: observation.getUuid(),
        specimenInfo: {
          create: {
            scientificName: specimenInfo.getScientificName(),
            genus: specimenInfo.getGenus(),
            family: specimenInfo.getFamily(),
            orden: specimenInfo.getOrden(),
          },
        },
        observedAt: observation.getObservedAt().getDate(),
        geoSpatialData: {
          create: {
            coordinates: geoSpatialData.getCoordinates(),
            locality: geoSpatialData.getLocality(),
            province: geoSpatialData.getProvince(),
            observationSite: geoSpatialData.getObservationSite(),
          },
        },
        comments: observation.getComments(),
      },
      update: {
        observedAt: observation.getObservedAt().getDate(),
        comments: observation.getComments(),
      },
    });
  }
}
