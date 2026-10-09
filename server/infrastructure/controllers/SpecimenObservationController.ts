import { NextFunction, Request, Response } from 'express';
import { SpecimenObservationManagementService } from '@application/SpecimenObservationManagementService';
import { SpecimenObservationDTO } from '@infrastructure/DTOs/SpecimenObservationDTO';
import { SpecimenObservation } from '@domain/entities/SpecimenObservation';
import { ObservationDate } from '@domain/valueObjects/ObservationDate';
import { SpecimenInfo } from '@domain/valueObjects/SpecimenInfo';
import { GeospatialData } from '@domain/valueObjects/GeospatialData';
import { FileSystemImageRepository } from '@infrastructure/repositories/FileSystemImageRepository';
import { ObservationSuggestionField } from '@domain/repositories/SpecimenObservationRepository';

export class SpecimenObservationController {
  constructor(
    private readonly specimenObservationManagementService: SpecimenObservationManagementService,
    private readonly imageRepository: FileSystemImageRepository,
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

  public getSpecimenInfoSuggestions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { input, field } = req.query;

      const suggestions =
        await this.specimenObservationManagementService.getSpecimenInfoSuggestions(
          input as string,
          field as ObservationSuggestionField,
        );
      res.status(200).json(suggestions);
    } catch (error: unknown) {
      next(error);
    }
  };

  public createSpecimenObservation = async (req: Request, res: Response, next: NextFunction) => {
    try {
      
      if (!req.body || !req.body.uuid) {
        throw new Error('Missing required property: uuid');
      }

      const specimenObservationDTO = new SpecimenObservationDTO(
        req.body.uuid,
        new SpecimenInfo(
          req.body.specimenInfo.scientificName,
          req.body.specimenInfo.genus,
          req.body.specimenInfo.family,
          req.body.specimenInfo.orden,
        ),
        req.body.observedAt,
        new GeospatialData(
          req.body.geospatialData.coordinates,
          req.body.geospatialData.locality,
          req.body.geospatialData.province,
          req.body.geospatialData.observationSite,
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

      try {
        await this.imageRepository.renameLocalImage(req.body.imagePath, specimenObservationDTO.uuid);
      } catch (error) {
        console.error('Error renombrando la imagen:', error); 
      }

      res.status(201).json({
        message: `Specimen observation ${specimenObservationDTO.uuid} created successfully`,
      });
    } catch (error: unknown) {
      next(error);
    }
  };
}
