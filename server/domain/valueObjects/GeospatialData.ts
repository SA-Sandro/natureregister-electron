export class GeospatialData {
  constructor(
    private readonly id: number,
    private readonly coordinates: string,
    private readonly locality: string,
    private readonly province: string,
    private readonly observationSite: string,
  ) {}
  getId(): number {
    return this.id;
  }
  getCoordinates(): string {
    return this.coordinates;
  }
  getObservationSite(): string {
    return this.observationSite;
  }
  getProvince(): string {
    return this.province;
  }
  getLocality(): string {
    return this.locality;
  }
}
