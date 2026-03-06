import Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { SpecimenObservation } from '../server/domain/entities/SpecimenObservation';
import { getGenusByScientificName } from '../utils/GetGenusByScientificName';
import { env } from 'node:process';

type ObservationData = {
  observation: SpecimenObservation[];
  imageUrl: string;
};

export const getRecordsFromSQLITE = (): ObservationData[] => {
  const db = new Database(env.SAMPLE_DATABASE);

  const observations: ObservationData[] = [];

  try {
    const rows = db.prepare('SELECT * FROM aranea_sample').all();
    rows.forEach((row: any) => {
      const uuid = randomUUID();
      const scientificName = row.nombreCientifico || 'Unknown';
      const genus = getGenusByScientificName(scientificName);
      const family = row.familia || 'Unknown';
      const orden = row.orden || 'Unknown';
      const date = row.fecha || 'Unknown';
      const coordinates = row.coordenadas || '0,0';
      const observationSite = row.lugarObservacion || 'Unknown';
      const locality = '';
      const province = row.provincia || 'Unknown';
      const comments = '';
      const imageUrl = row.URLImagen || '';

      const specimenObservation = new SpecimenObservation(
        uuid,
        { scientificName, genus, family, orden },
        date,
        { coordinates, observationSite, province, locality },
        comments,
      );

      observations.push({
        observation: [specimenObservation],
        imageUrl,
      });
    });

    return observations;
  } catch (error) {
    console.error('Error al leer la base de datos SQLITE:', error);
    throw error;
  }
};
