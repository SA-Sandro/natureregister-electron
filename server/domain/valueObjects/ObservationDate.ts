import { DomainException } from '@domain/exceptions/DomainException';

export class ObservationDate {
  constructor(private readonly date: Date) {
    const now = new Date().toLocaleDateString('es-ES');

    if (this.date.toLocaleDateString('es-ES') > now) {
      throw new DomainException(
        'SpecimentObservation',
        `Observation cannot be future: ${this.date.toLocaleDateString('es-ES')}`,
      );
    }
  }
}
