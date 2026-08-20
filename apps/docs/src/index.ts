import express, { Application } from 'express';
import cors from 'cors';
import systemRouter from './routes/systemRoutes.js';
import prisma from './db.js';
import { injectMockUser } from './middlewares/auth.js';

const app: Application = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use(injectMockUser);

app.use('/api/system', systemRouter);

// Hardcoded Static Developer UUID key for a stable local testing matrix
const DEV_ADMIN_ID = '00000000-0000-0000-0000-000000000000';

async function startServer() {
  try {
    console.log('[System] Verifying MariaDB connection handshake...');
    await prisma.$connect();
    console.log('[System] MariaDB handshake connection: SUCCESS');

    // --- AUTOMATED DEVELOPER BOOTSTRAP HOOK ---
    console.log('[System] Verifying developer database state allocation...');
    await prisma.user.upsert({
      where: { id: DEV_ADMIN_ID },
      update: {}, // Leave untouched if already exists
      create: {
        id: DEV_ADMIN_ID,
        username: 'admin',
        displayName: 'Bootstrap Admin',
        email: 'admin@softwarewolf.com',
        role: 'ADMIN'
      }
    });
    console.log(`[System] Developer Admin Account Ready. Static Token Key: ${DEV_ADMIN_ID}`);
    // ------------------------------------------

    app.listen(PORT, () => {
      console.log(`Express server live on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error('[Fatal Error] Express failed to establish database connection:', error.message);
    process.exit(1);
  }
}

startServer();
