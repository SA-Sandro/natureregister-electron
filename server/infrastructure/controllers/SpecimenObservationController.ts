import { NextFunction, Request, Response } from 'express';
import { SpecimenObservationManagementService } from '@application/SpecimenObservationManagementService';
import { SpecimenObservationDTO } from '@infrastructure/DTOs/SpecimenObservationDTO';

export class SpecimenObservationController {
  constructor(
    private readonly specimenObservationManagementService: SpecimenObservationManagementService,
  ) {}

  public getAllSpecimenObservations = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const specimenObservations =
        await this.specimenObservationManagementService.getAllSpecimenObservations();

      const specimenObservationDTO = specimenObservations.map((observation) =>
        SpecimenObservationDTO.fromDomain(observation),
      );

      res.status(200).json(specimenObservationDTO);
    } catch (error: unknown) {
      next(error);
    }
  };
}
