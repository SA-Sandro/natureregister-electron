import { NextFunction, Request, Response } from 'express';
import { SpecimenObservationManagementService } from '@application/SpecimenObservationManagementService';

export class SpecimenObservationController {
  constructor(
    private readonly specimenObservationManagementService: SpecimenObservationManagementService,
  ) {}

  public getAllSpecimenObservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const specimenObservations =
        await this.specimenObservationManagementService.getAllSpecimenObservations();
      res.status(200).json(specimenObservations);
    } catch (error: unknown) {
      next(error);
    }
  };
}
