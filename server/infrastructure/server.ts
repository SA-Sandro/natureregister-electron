import express from 'express';
import cors from 'cors';
import { ImagesRoutes } from '@infrastructure/routes/ImagesRoutes';
import { ImagesController } from '@infrastructure/controllers/ImagesController';
import { ImagesManagementService } from '@application/ImagesManagementService';
import { FileSystemImageRepository } from '@infrastructure/repositories/FileSystemImageRepository';
import { SpecimenObservationRoutes } from '@infrastructure/routes/SpecimenObservationRoutes';
import { SpecimenObservationController } from '@infrastructure/controllers/SpecimenObservationController';
import { SpecimenObservationManagementService } from '@application/SpecimenObservationManagementService';
import { PrismaSpecimenObservationRepository } from '@infrastructure/repositories/PrismaSpecimenObservationRepository';
import { PrismaClient } from '@prisma/client';
import { errorHandlingMiddleware } from '@infrastructure/middleware';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
);

const imageRepository = new FileSystemImageRepository();
const imagesService = new ImagesManagementService(imageRepository);
const imagesController = new ImagesController(imagesService);
const imagesRoutes = new ImagesRoutes(imagesController);

const specimenObservationRepository = new PrismaSpecimenObservationRepository(new PrismaClient());
const specimenObservationManagementService = new SpecimenObservationManagementService(
  specimenObservationRepository,
);
const specimenObservationController = new SpecimenObservationController(
  specimenObservationManagementService,
);
const specimenObservationRoutes = new SpecimenObservationRoutes(specimenObservationController);

app.use('/api/images', imagesRoutes.router);
app.use('/api/specimenObservations', specimenObservationRoutes.router);
app.listen(3000, () => {
  console.log('Server is running on port 3000:  http://localhost:3000');
});
app.use(errorHandlingMiddleware);
