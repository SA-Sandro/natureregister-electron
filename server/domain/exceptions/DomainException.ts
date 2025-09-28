export class DomainException extends Error {
  constructor(readonly domain: string, message: string) {
    super(`[${domain}] ${message}`);
    this.name = 'DomainException';
  }
}
