import express, { json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { cors as _cors } from './config/environment';
import errorHandler from './middleware/errorHandler';
import authRoutes from './routes/auth.js';
import entriesRoutes from './routes/entries.js';

const app = express();

// Middlewares
app.use(cors({ origin: _cors.origin }));
app.use(morgan('dev'));
app.use(json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/entries', entriesRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use(errorHandler);

export default app;
