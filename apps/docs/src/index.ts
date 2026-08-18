import express, { Application } from 'express';
import cors from 'cors';
import systemRouter from './routes/systemRoutes.js';

const app: Application = express();

// Consume the environment variable safely with a fallback default
const PORT = process.env.PORT || 5000;
const SECRET_KEY = process.env.API_KEY;

app.use(cors());
app.use(express.json());

// Log out to your terminal window to verify key loading
console.log(`[Config] Secure API Key Loaded Status: ${SECRET_KEY ? 'SUCCESS' : 'FAILED'}`);

app.use('/api/system', systemRouter);

app.listen(PORT, () => {
  console.log(`Express server live on http://localhost:${PORT}`);
});
