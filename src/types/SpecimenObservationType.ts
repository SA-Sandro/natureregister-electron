export type SpecimenObservation = {
  uuid: string;
  specimenInfo: SpecimenInfo;
  observedAt: string;
  geospatialData: GeospatialData;
  comments: string;
};

type SpecimenInfo = {
  scientificName: string;
  genus: string;
  family: string;
  orden: string;
};

type GeospatialData = {
  coordinates: string;
  locality: string;
  province: string;
  observationSite: string;
};

export type ImageLinkedToObservationType = {
  uuid: string;
  date: Date;
  imagePath: string;
  observation: SpecimenObservation | undefined;
};

export type SpecimenObservationWithImage = SpecimenObservation & {
  imagePath: string;
};