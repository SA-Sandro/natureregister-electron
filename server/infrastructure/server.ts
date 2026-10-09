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
import { createRequire } from 'node:module';
import type { PrismaClient as PrismaClientType } from '@prisma/client';
import { errorHandlingMiddleware } from '@infrastructure/middleware';
import type { Server } from 'node:http';

const require = createRequire(import.meta.url);
const { PrismaClient } = (() => {
  try {
    return require('@prisma/client');
  } catch {
    return require('./generated/prisma');
  }
})() as typeof import('@prisma/client');

export interface ServerOptions {
  host?: string;
  port?: number;
  databaseUrl?: string;
  prisma?: PrismaClientType;
}

export interface StartedServer {
  app: express.Express;
  server: Server;
  prisma: PrismaClientType;
  close: () => Promise<void>;
}

export function createApp(prisma: PrismaClientType): express.Express {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: (origin, callback) => {
        const allowed = !origin || origin === 'http://localhost:5173' || origin === 'null';
        callback(null, allowed);
      },
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    }),
  );

  const imageRepository = new FileSystemImageRepository();
  const imagesService = new ImagesManagementService(imageRepository);
  const imagesController = new ImagesController(imagesService);
  const imagesRoutes = new ImagesRoutes(imagesController);

  const specimenObservationRepository = new PrismaSpecimenObservationRepository(prisma);
  const specimenObservationManagementService = new SpecimenObservationManagementService(
    specimenObservationRepository,
  );
  const specimenObservationController = new SpecimenObservationController(
    specimenObservationManagementService,
    imageRepository,
  );
  const specimenObservationRoutes = new SpecimenObservationRoutes(specimenObservationController);

  app.use('/api/images', imagesRoutes.router);
  app.use('/api/specimenObservations', specimenObservationRoutes.router);
  app.use(errorHandlingMiddleware);

  return app;
}

export function startServer({
  host = '127.0.0.1',
  port = 3000,
  databaseUrl,
  prisma,
}: ServerOptions = {}): Promise<StartedServer> {
  const prismaClient =
    prisma ??
    (databaseUrl
      ? new PrismaClient({ datasources: { db: { url: databaseUrl } } })
      : new PrismaClient());
  const app = createApp(prismaClient);

  return new Promise((resolve, reject) => {
    const server = app.listen(port, host, () => {
      console.log(`Server is running on port ${port}:  http://${host}:${port}`);
      resolve({
        app,
        server,
        prisma: prismaClient,
        close: async () => {
          await new Promise<void>((closeResolve, closeReject) => {
            server.close((error) => (error ? closeReject(error) : closeResolve()));
          });
          await prismaClient.$disconnect();
        },
      });
    });

    server.on('error', reject);
  });
}
