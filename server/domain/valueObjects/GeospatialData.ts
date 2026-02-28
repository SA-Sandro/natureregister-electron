export class GeospatialData {
  constructor(
    private readonly coordinates: string,
    private readonly locality: string,
    private readonly province: string,
    private readonly observationSite: string,
  ) {}
  
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
