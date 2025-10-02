export class GeospatialData {
  constructor(
    private readonly id: number,
    private readonly coordinates: string,
    private readonly municipality: string,
    private readonly province: string,
    private readonly locality: string,
  ) {}
  getId(): number {
    return this.id;
  }
  getCoordinates(): string {
    return this.coordinates;
  }
  getMunicipality(): string {
    return this.municipality;
  }
  getProvince(): string {
    return this.province;
  }
  getLocality(): string {
    return this.locality;
  }
}
