// Import the entire file namespace using wildcard syntax
import * as prismaModule from './generated/client/index.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

// Safely grab the constructor out of the compiled namespace keys
const { PrismaClient } = prismaModule;

// Prisma 7's MariaDB adapter accepts your database URL string directly as its primary argument!
const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);

// Instantiate your secure Prisma Client engine wrapper with the driver adapter attached.
const prisma = new PrismaClient({ 
  adapter,
  log: ['error', 'warn']
});

export default prisma;
