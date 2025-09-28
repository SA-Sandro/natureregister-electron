import { SpecimenInfo as PrismaSpecimenInfo } from '@prisma/client';

export class SpecimenInfo {
  constructor(
    private readonly id: number,
    private readonly scientificName: string,
    private readonly genus: string,
    private readonly family: string,
  ) {}

  getId(): number {
    return this.id;
  }
  static fromPrisma(record: PrismaSpecimenInfo): SpecimenInfo {
    return new SpecimenInfo(record.id, record.scientificName, record.genus, record.family);
  }
}
