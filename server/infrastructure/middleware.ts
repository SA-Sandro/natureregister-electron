import { DomainException } from '@domain/exceptions/DomainException';
import { NextFunction, Request, Response } from 'express';

export function errorHandlingMiddleware(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof DomainException) {
    return res.status(400).json({
      error: {
        message: err.message,
        domain: err.domain,
        name: err.name,
      },
    });
  }

  console.error('Unhandled error:', err);
  res.status(500).json({
    error: {
      message: err.message,
      name: err.name,
    },
  });
}
