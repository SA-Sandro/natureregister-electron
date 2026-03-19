import Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { SpecimenObservation } from '../server/domain/entities/SpecimenObservation';
import { ObservationDate } from '../server/domain/valueObjects/ObservationDate';
import { getGenusByScientificName } from '../src/utils/GetGenusByScientificName';
import { env } from 'node:process';

type ObservationData = {
  observation: SpecimenObservation[];
  imageUrl: string;
};

export const getRecordsFromSQLITE = (): ObservationData[] => {
  const db = new Database(env.OBSERVATIONS_DATABASE);

  const observations: ObservationData[] = [];

  try {
    const rows = db.prepare('SELECT * FROM observations').all();
    rows.forEach((row: any) => {
      const uuid = randomUUID();
      const scientificName = row.nombreCientifico || 'Unknown';
      const genus = getGenusByScientificName(scientificName);
      const family = row.familia || 'Unknown';
      const orden = row.orden || 'Unknown';
      const date = row.fecha || 'Unknown';
      const observationDate = new ObservationDate(date);
      const coordinates = row.coordenadas || '0,0';
      const observationSite = row.lugarObservacion || 'Unknown';
      const locality = row.localidad || 'Unknown';
      const province = row.provincia || 'Unknown';
      const comments = '';
      const imageUrl = row.URLImagen || '';
      console.log(locality, province, observationSite);
      const specimenObservation = new SpecimenObservation(
        uuid,
        { scientificName, genus, family, orden },
        observationDate,
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
