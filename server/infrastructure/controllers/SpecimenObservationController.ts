import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
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

      this.renameLocalImage(req.body.imagePath, specimenObservationDTO.uuid).catch((error) => {
        console.error('Error renombrando la imagen:', error);
      });

      res.status(201).json({
        message: `Specimen observation ${specimenObservationDTO.uuid} created successfully`,
      });
    } catch (error: unknown) {
      next(error);
    }
  };

  async renameLocalImage(currentPath: string, uuid: string): Promise<void> {
    console.log(`Renombrando imagen: ${currentPath}`);
    const splittedPath = currentPath.split(/[/\\]/);
    splittedPath[splittedPath.length - 1] =
      `${uuid}${splittedPath[splittedPath.length - 1].slice(splittedPath[splittedPath.length - 1].lastIndexOf('.'))}`;
    const newPath = splittedPath.join('/');

    if (currentPath === newPath) {
      console.log(`⚠️ La imagen ya tiene el nombre correcto: ${currentPath}`);
      return;
    }
    await fs.rename(currentPath, newPath);
    console.log(`✅ Imagen renombrada a ${newPath}`);
  }
}
