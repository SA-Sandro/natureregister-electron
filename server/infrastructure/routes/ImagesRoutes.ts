import { Router } from 'express';
import { ImagesController } from '@controllers/ImagesController';

export class ImagesRoutes {
  public readonly router: Router;

  constructor(private readonly imagesController: ImagesController) {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get('/retrieveAllImages', this.imagesController.getAllImages);
  }
}
