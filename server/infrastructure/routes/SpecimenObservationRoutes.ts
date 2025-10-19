import { SpecimenObservationController } from '@infrastructure/controllers/SpecimenObservationController';
import { Router } from 'express';

export class SpecimenObservationRoutes {
  public readonly router: Router;
  constructor(private readonly specimenObservationController: SpecimenObservationController) {
    this.router = Router();
    this.configureRoutes();
  }

  private configureRoutes(): void {
    this.router.get(
      '/getAllSpecimenObservations',
      this.specimenObservationController.getAllSpecimenObservations.bind(
        this.specimenObservationController,
      ),
    );
  }
}
