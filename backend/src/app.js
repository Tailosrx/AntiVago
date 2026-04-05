import express, { json } from "express";
import cors from "cors";
import morgan from "morgan";

import config from "./config/environment.js";
import errorHandler from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.js";
import entriesRoutes from "./routes/entries.js";
import achievementsRoutes from './routes/achievements.js';

const app = express();
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ extended: true, limit: '10mb'}))

// Middlewares
app.use(cors({ origin: config.cors.origin }));
app.use(morgan("dev"));
app.use(json());


// Health check
app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/entries", entriesRoutes);
app.use('/api/achievements', achievementsRoutes);
// 404
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Error handler
app.use(errorHandler);

export default app;
