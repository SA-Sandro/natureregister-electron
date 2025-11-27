export type SpecimenObservation = {
  uuid: string;
  specimenInfo: SpecimenInfo;
  observedAt: string;
  geospatialData: GeospatialData;
  comments: string;
};

type SpecimenInfo = {
  id: number;
  scientificName: string;
  genus: string;
  family: string;
  orden: string;
};

type GeospatialData = {
  id: number;
  coordinates: string;
  locality: string;
  province: string;
  observationSite: string;
};

export type ImageLinkedToObservationType = {
  date: Date;
  imagePath: string;
  observation: SpecimenObservation | undefined;
};
