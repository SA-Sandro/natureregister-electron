import { DomainException } from '@domain/exceptions/DomainException';

export class ObservationDate {
  constructor(private readonly date: string) {
    const now = new Date().toLocaleDateString('es-ES');

    if (date > now) {
      throw new DomainException(
        'SpecimentObservation',
        `Observation cannot be future: ${date}`,
      );
    }
  }
}
