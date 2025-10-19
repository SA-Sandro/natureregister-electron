import { NextFunction, Request, Response } from 'express';
import { ImagesManagementService } from '@application/ImagesManagementService';
import { ImageDTO } from '@infrastructure/DTOs/ImageDTO';

export class ImagesController {
  constructor(private readonly imageService: ImagesManagementService) {}

  public getAllImages = async (req: Request, res: Response, next: NextFunction) => {
    const folderPath = req.query.folderPath as string;
    if (!folderPath) {
      return res.status(400).json({ message: 'folderPath is required' });
    }
    try {
      const images = await this.imageService.getAllImagesFromSelectedFolder(folderPath);
      const imageDTO = ImageDTO.fromDomain(images);
      res.json(imageDTO);
    } catch (error: unknown) {
      next(error);
    }
  };
}
