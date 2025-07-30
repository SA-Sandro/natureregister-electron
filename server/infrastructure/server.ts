import express from 'express'
import cors from 'cors'
import { ImagesRoutes } from '@routes/ImagesRoutes'
import { ImagesController } from '@controllers/ImagesController'
import { ImagesManagementService } from '@application/ImagesManagementService'
import { FileSystemImageRepository } from '@repositories/FileSystemImageRepository'

const app = express()

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }),
)

const imageRepository = new FileSystemImageRepository()
const imagesService = new ImagesManagementService(imageRepository)
const imagesController = new ImagesController(imagesService)
const imagesRoutes = new ImagesRoutes(imagesController)

app.use('/api/images', imagesRoutes.router)

app.listen(3000, () => {
  console.log('Server is running on port 3000:  http://localhost:3000')
})
