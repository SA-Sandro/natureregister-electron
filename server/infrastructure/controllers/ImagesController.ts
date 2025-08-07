import { Request, Response } from 'express';
import { ImagesManagementService } from '@application/ImagesManagementService';

export class ImagesController {
  constructor(private readonly imageService: ImagesManagementService) {}

  public getAllImages = async (req: Request, res: Response) => {
    const folderPath = req.query.folderPath as string;
    if (!folderPath) {
      return res.status(400).json({ message: 'folderPath is required' });
    }
    try {
      const images = await this.imageService.getAllImagesFromSelectedFolder(folderPath);
      res.json(images);
    } catch (error: unknown) {
      //TODO: handle error properly
      res.status(500).json({ message: error });
    }
  };
}
