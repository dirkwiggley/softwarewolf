import express, { Application } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
/* Import bcryptjs to handle dev-mode bootstrapping hashes natively */
import bcrypt from 'bcryptjs';
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

/* Define the self-contained developer environment bootstrap function */
async function bootstrapDevAdmin() {
  if (process.env.NODE_ENV === 'production') return;

  try {
    console.log('[System Seeder] Auditing administrative clearance tables...');
    
    // Check if any admin profiles already exist in the database table
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });

    if (adminCount === 0) {
      console.log('[System Seeder] No administrator found! Bootstrapping default dev-mode account...');
      
      /* Read the password dynamically from your local environment file */
      const defaultPassword = process.env.DEV_BOOTSTRAP_PASSWORD || 'admin123';
      const hashedPassword = await bcrypt.hash(defaultPassword, 10);

      const bootstrappedAdmin = await prisma.user.create({
        data: {
          username: 'admin',
          displayName: 'Local Dev Administrator',
          email: 'admin@softwarewolf.local',
          role: 'ADMIN',
          password: hashedPassword
        }
      });


      console.log(`[System Seeder] Success! Dev Admin "@${bootstrappedAdmin.username}" provisioned safely.`);
    } else {
      console.log('[System Seeder] System tables verified: active administrator account detected.');
    }
  } catch (error: any) {
    console.error('⚠️ [System Seeder] Development seeder pipeline error:', error.message);
  }
}

async function startServer() {
  try {
    console.log('[System] Verifying MariaDB connection handshake...');
    await prisma.$connect();
    console.log('[System] MariaDB handshake connection: SUCCESS');

    /* Fire the dev-mode seed check immediately after connection success but before opening the port listener */
    await bootstrapDevAdmin();

    app.listen(PORT, () => {
      console.log(`Express server live on http://localhost:${PORT}`);
    });
  } catch (error: any) {
    console.error('[Fatal Error] Express failed to establish database connection:', error.message);
    process.exit(1);
  }
}

startServer();
