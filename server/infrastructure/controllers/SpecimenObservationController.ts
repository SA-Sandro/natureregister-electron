import { NextFunction, Request, Response } from 'express';
import { SpecimenObservationManagementService } from '@application/SpecimenObservationManagementService';
import { SpecimenObservationDTO } from '@infrastructure/DTOs/SpecimenObservationDTO';
import { SpecimenObservation } from '@domain/entities/SpecimenObservation';
import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { SpecimenInfo } from '@domain/valueObjects/SpecimenInfo';
import { GeospatialData } from '@domain/valueObjects/GeospatialData';

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

  public createSpecimenObservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Ensure that req.body and req.body.uuid are defined
      if (!req.body || !req.body.uuid) {
        throw new Error('Missing required property: uuid');
      }

      const specimenObservationDTO = new SpecimenObservationDTO(
        req.body.uuid,
        new SpecimenInfo(
          req.body.id,
          req.body.scientificName,
          req.body.genus,
          req.body.family,
          req.body.orden,
        ),
        req.body.observedAt,
        new GeospatialData(
          req.body.id,
          req.body.coordinates,
          req.body.locality,
          req.body.province,
          req.body.observationSite,
        ),
        req.body.comments,
      );
      await this.specimenObservationManagementService.saveSpecimenObservation(
        new SpecimenObservation(
          specimenObservationDTO.uuid,
          specimenObservationDTO.specimenInfo,
          new ObservationDate(specimenObservationDTO.observedAt),
          specimenObservationDTO.geospatialData,
          specimenObservationDTO.comments,
        ),
      );

      res.status(201).json({
        message: `Specimen observation ${specimenObservationDTO.uuid} created successfully`,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
