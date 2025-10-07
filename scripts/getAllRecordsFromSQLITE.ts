import Database from 'better-sqlite3';
import { randomUUID } from 'node:crypto';
import { SpecimenObservation } from '../server/domain/entities/SpecimenObservation';

const getGenus = (scientificName: string) => {
  const genus = scientificName.trim().split(' ')[0];
  return genus;
};

type ObservationData = {
  observations: SpecimenObservation[];
  imageUrl: string;
};

export const getRecordsFromSQLITE = (): ObservationData[] => {
  const db = new Database(
    'C:/Users/The_9/Documents/Nature Register/Ejecutable/observacionesBD.sqlite',
  );

  const observation: ObservationData[] = [];

  const rows = db.prepare('SELECT * FROM REGISTRO').all();

  rows.forEach((row: any) => {
    const uuid = randomUUID();
    const scientificName = row.nombreCientifico || 'Unknown';
    const genus = getGenus(scientificName);
    const family = row.familia || 'Unknown';
    const orden = row.orden || 'Unknown';
    const date = row.fecha || 'Unknown';
    const coordinates = row.coordenadas || '0,0';
    const municipality = row.localidad || 'Unknown';
    const locality = '';
    const province = row.provincia || 'Unknown';
    const comments = '';
    const imageUrl = row.URLImagen || '';

    const specimenObservation = new SpecimenObservation(
      uuid,
      { scientificName, genus, family, orden },
      date,
      { coordinates, municipality, province, locality },
      comments,
    );

    observation.push({
      observations: [specimenObservation],
      imageUrl,
    });
  });

  return observation;
};
