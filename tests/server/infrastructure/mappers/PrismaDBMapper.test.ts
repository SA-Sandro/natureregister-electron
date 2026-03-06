import { describe, expect, it } from 'vitest';
import { PrismaDBMapper } from '@infrastructure/mappers/PrismaDBMapper';
import { GeospatialData } from '@domain/valueObjects/GeospatialData';

// mimic the shape returned by Prisma client for the GeoSpatialData model
interface PrismaGeoSpatialDataStub {
  id: number;
  coordinates: string;
  locality: string;
  province: string;
  observationSite: string;
}

describe('PrismaDBMapper', () => {
  it('should map geoSpatialData correctly without shifting fields', () => {
    const stub: PrismaGeoSpatialDataStub = {
      id: 4697,
      coordinates: '36.797601, -4.869134',
      locality: 'Casarabonela',
      province: 'Málaga',
      observationSite: 'Some site',
    };

    const mapped: GeospatialData = PrismaDBMapper.geoSpatialDataFromPrisma(
      stub as any,
    );

    expect(mapped.getCoordinates()).toBe(stub.coordinates);
    expect(mapped.getLocality()).toBe(stub.locality);
    expect(mapped.getProvince()).toBe(stub.province);
    expect(mapped.getObservationSite()).toBe(stub.observationSite);
  });
});
