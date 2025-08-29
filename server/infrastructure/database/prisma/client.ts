import { PrismaClient } from '@prisma/client';
import './database'

const prisma = new PrismaClient();
export default prisma;
