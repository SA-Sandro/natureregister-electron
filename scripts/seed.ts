import fs from 'fs/promises';

import { PrismaClient } from '@prisma/client';
import { PrismaSpecimenObservationRepository } from '../server/infrastructure/repositories/PrismaSpecimenObservationRepository';

import { SpecimenObservation } from '../server/domain/entities/SpecimenObservation';
import { SpecimenInfo } from '../server/domain/valueObjects/SpecimenInfo';
import { GeospatialData } from '../server/domain/valueObjects/GeospatialData';
import { getRecordsFromSQLITE } from './getAllRecordsFromSQLITE';

const renameLocalImage = async (currentPath: string, uuid: string): Promise<void> => {
  console.log(`Renombrando imagen: ${currentPath}`);
  const splittedPath = currentPath.split(/[/\\]/);
  splittedPath[splittedPath.length - 1] =
    `${uuid}${splittedPath[splittedPath.length - 1].slice(splittedPath[splittedPath.length - 1].lastIndexOf('.'))}`;
  const newPath = splittedPath.join('/');

  if (currentPath === newPath) {
    console.log(`⚠️ La imagen ya tiene el nombre correcto: ${currentPath}`);
    return;
  }
  await fs.rename(currentPath, newPath);
  console.log(`✅ Imagen renombrada a ${newPath}`);
};

async function main() {
  const prisma = new PrismaClient();
  const repo = new PrismaSpecimenObservationRepository(prisma);

  const observations = getRecordsFromSQLITE();

  observations.forEach(async (data) => {
    for (const obs of data.observation) {
      const specimenInfoVO = obs.getSpecimenInfo();
      const geoVO = obs.getGeospatialData();
      const specimenInfoRow = await prisma.specimenInfo.create({
        data: {
          scientificName: specimenInfoVO.scientificName,
          genus: specimenInfoVO.genus,
          family: specimenInfoVO.family,
          orden: specimenInfoVO.orden,
        },
      });
      const geoRow = await prisma.geoSpatialData.create({
        data: {
          coordinates: geoVO.coordinates,
          locality: geoVO.locality,
          province: geoVO.province,
          observationSite: geoVO.observationSite,
        },
      });
      const specimenInfoWithId = new SpecimenInfo(
        specimenInfoRow.id,
        specimenInfoVO.scientificName,
        specimenInfoVO.genus,
        specimenInfoVO.family,
        specimenInfoVO.orden,
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
      try {
        await renameLocalImage(data.imageUrl, obs.getUuid());
        await repo.save(observationWithIds);
        console.log(`✅ Observación ${observationWithIds.getUuid()} guardada con éxito`);
      } catch (error) {
        console.error(`❌ Error guardando la observación ${observationWithIds.getUuid()}:`, error);
      }
    }
  });
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
