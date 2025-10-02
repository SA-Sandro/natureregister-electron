import { PrismaClient } from '@prisma/client';
import { SpecimenObservationRepository } from '@domain/repositories/SpecimenObservationRepository';

import { UUID } from 'crypto';
import { SpecimenObservation } from '@domain/entities/SpecimenObservation';
import { PrismaDBMapper } from '@infrastructure/mappers/PrismaDBMapper';

export class PrismaSpecimenObservationRepository implements SpecimenObservationRepository {
  constructor(private prisma: PrismaClient) {}

  // Obtener un registro por UUID
  async findSpecimenObservationById(uuid: UUID): Promise<SpecimenObservation | null> {
    const record = await this.prisma.specimenObservation.findUnique({
      where: { uuid },
      include: { specimenInfo: true, geoSpatialData: true }, // <-- include para objetos completos
    });

    if (!record) return null;

    return PrismaDBMapper.specimenObservationFromPrisma(record);
  }

  // Obtener todos los registros
  async findAllSpecimenObservations(): Promise<SpecimenObservation[]> {
    const records = await this.prisma.specimenObservation.findMany({
      include: { specimenInfo: true, geoSpatialData: true },
    });
    return records.map(PrismaDBMapper.specimenObservationFromPrisma);
  }

  // Guardar o actualizar un registro
  async save(observation: SpecimenObservation): Promise<void> {
    await this.prisma.specimenObservation.upsert({
      where: { uuid: observation.getUuid() },
      create: {
        uuid: observation.getUuid(),
        specimenInfoId: observation.getSpecimenInfo().getId(),
        observedAt: observation.getObservedAt().toString(),
        geoSpatialDataId: observation.getGeospatialData().getId(),
        comments: observation.getComments(),
      },
      update: {
        specimenInfoId: observation.getSpecimenInfo().getId(),
        observedAt: observation.getObservedAt().toString(),
        geoSpatialDataId: observation.getGeospatialData().getId(),
        comments: observation.getComments(),
      },
    });
  }
}
