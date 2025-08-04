import { Request, Response } from 'express'
import { ImagesManagementService } from '../../application/ImagesManagementService'
import { Image } from '../../domain/entities/Image'

export class ImagesController {
  constructor(private readonly imageService: ImagesManagementService) {}

  public getAllImages = async (req: Request, res: Response): Promise<void> => {
    const folderPath = req.query.folderPath as string //TODO: get from request (frontend)
    if (!folderPath) {
      res.status(400).json({ message: 'folderPath is required' })
      return
    }
    try {
      const images: Image[] = await this.imageService.getAllImagesFromSelectedFolder(folderPath)
      res.json(images)
    } catch (error: unknown) {
      //TODO: handle error properly
      res.status(500).json({ message: error })
    }
  }
}
