export class GeospatialData {
  constructor(
    private readonly id: number,
    private readonly coordinates: string,
    private readonly municipality: string,
    private readonly province: string,
    private readonly locality: string,
  ) {}
}
