import { DomainException } from '@domain/exceptions/DomainException';

export class ObservationDate {
  constructor(private readonly date: string) {
    const [day, month, year] = this.date.split('/').map(Number);
    const observationDate = new Date(year, month - 1, day);
    if (observationDate > new Date()) {
      throw new DomainException('SpecimenObservation', `Observation cannot be future: ${date}`);
    }
  }
}
