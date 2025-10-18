export class SpecimenInfo {
  constructor(
    private readonly id: number,
    private readonly scientificName: string,
    private readonly genus: string,
    private readonly family: string,
    private readonly orden: string,
  ) {}

  getId(): number {
    return this.id;
  }

  getScientificName(): string {
    return this.scientificName;
  }

  getGenus(): string {
    return this.genus;
  }

  getFamily(): string {
    return this.family;
  }

  getOrden(): string {
    return this.orden;
  }
}
