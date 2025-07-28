import { Image } from '../entities/Image'

export interface ImageRepository {
    
    /**
     * Retrieves images from a specified folder.
     * @param folderPath - The path to the folder containing images.
     * @returns A promise that resolves to an array of Image entities.
     */

  getImagesFromFolder(folderPath: string): Promise<Image[]>
}
