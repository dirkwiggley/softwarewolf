import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import systemRouter from './routes/systemRoutes.js';
import prisma from './db.js';
import { requireAuth } from './middlewares/auth.js';

const app: Application = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(cookieParser()); // Enables parsing of incoming HttpOnly cookies
app.use(requireAuth);    // Universally handles JWT checks and guest fallbacks

app.use('/api/system', systemRouter);

async function startServer() {
  try {
    console.log('[System] Verifying MariaDB connection handshake...');
    await prisma.$connect();
    console.log('[System] MariaDB handshake connection: SUCCESS');

    app.listen(PORT, () => {
      console.log(`Express server live on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error('[Fatal Error] Express failed to establish database connection:', error.message);
    process.exit(1);
  }
}

startServer();
