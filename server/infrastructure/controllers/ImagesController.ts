import { Request, Response } from 'express'
import { ImagesManagementService } from '../../application/ImagesManagementService'
import { Image } from '../../domain/images/Image'

export class ImagesController {
  constructor(private readonly imageService: ImagesManagementService) {}

  public getAllImages = async (req: Request, res: Response): Promise<void> => {
    try {
      const folderPath = 'D:/Importante/FOTOGRAFÍA/BIODIVERSIDAD/AFICCIÓN' //TODO: get from request (frontend)
      const images: Image[] = await this.imageService.getAllImagesFromSelectedFolder(folderPath)
      res.json(images)
    } catch (error: unknown) {
      //TODO: handle error properly
      res.status(500).json({ message: error })
    }
  }
}
