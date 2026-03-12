const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/environment');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middlewares
app.use(cors({ origin: config.cors.origin }));
app.use(morgan('dev'));
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/entries', require('./routes/entries'));

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use(errorHandler);

module.exports = app;
