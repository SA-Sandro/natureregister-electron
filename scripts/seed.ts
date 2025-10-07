import { PrismaClient } from '@prisma/client';
import { PrismaSpecimenObservationRepository } from '../server/infrastructure/repositories/PrismaSpecimenObservationRepository';

import { SpecimenObservation } from '../server/domain/entities/SpecimenObservation';
import { SpecimenInfo } from '../server/domain/valueObjects/SpecimenInfo';
import { GeospatialData } from '../server/domain/valueObjects/GeospatialData';
import { getRecordsFromSQLITE } from './getAllRecordsFromSQLITE';

async function main() {
  const prisma = new PrismaClient();
  const repo = new PrismaSpecimenObservationRepository(prisma);

  const observations = getRecordsFromSQLITE();

  observations.forEach(async (data) => {
    for (const obs of data.observations) {
      const specimenInfoVO = obs.getSpecimenInfo();
      const geoVO = obs.getGeospatialData();
      const specimenInfoRow = await prisma.specimenInfo.create({
        data: {
          scientificName: specimenInfoVO.scientificName,
          genus: specimenInfoVO.genus,
          family: specimenInfoVO.family,
        },
      });
      const geoRow = await prisma.geoSpatialData.create({
        data: {
          coordinates: geoVO.coordinates,
          municipality: geoVO.municipality,
          province: geoVO.province,
          locality: geoVO.locality,
        },
      });
      const specimenInfoWithId = new SpecimenInfo(
        specimenInfoRow.id,
        specimenInfoVO.scientificName,
        specimenInfoVO.genus,
        specimenInfoVO.family,
      );
      const geoWithId = new GeospatialData(
        geoRow.id,
        geoVO.coordinates,
        geoVO.municipality,
        geoVO.province,
        geoVO.locality,
      );
      const observationWithIds = new SpecimenObservation(
        obs.getUuid(),
        specimenInfoWithId,
        obs.getObservedAt(),
        geoWithId,
        obs.getComments(),
      );
      await repo.save(observationWithIds);
      console.log(`✅ Observación ${observationWithIds.getUuid()} guardada con éxito`);
    }
  });
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
