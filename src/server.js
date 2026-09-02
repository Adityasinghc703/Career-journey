import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRouter from './routes/api.js';
import { initDB } from './services/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Database
initDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static frontend assets
app.use(express.static(path.join(__dirname, '../public')));

// API Routes
app.use('/api', apiRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'CareerJourney AI Backend',
    timestamp: new Date().toISOString()
  });
});

// Fallback for SPA routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

if (process.env.NODE_ENV !== 'test' && !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`=====================================================`);
    console.log(`  CareerJourney AI - Backend & Platform Server`);
    console.log(`  Running on: http://localhost:${PORT}`);
    console.log(`  API Base:   http://localhost:${PORT}/api`);
    console.log(`=====================================================`);
  });
}

export default app;
