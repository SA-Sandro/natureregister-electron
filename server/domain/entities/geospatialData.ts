export class GeospatialData {
  constructor(
    private readonly id: number,
    private readonly coordenates: string,
    private readonly municipality: string,
    private readonly province: string,
    private readonly locality: string,
  ) {}
}
