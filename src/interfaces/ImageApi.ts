export interface ImageApi {
  retrieveAllImages(folderPath: string): Promise<string[]>;
}
