import { PrismaClient } from './generated/client/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

// 1. Prisma 7's MariaDB adapter accepts your database URL string directly as its primary argument!
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

// 2. Instantiate your secure Prisma Client engine wrapper with the driver adapter attached.
const prisma = new PrismaClient({ 
  adapter,
  log: ['error', 'warn']
});

export default prisma;
