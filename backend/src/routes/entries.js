import { Router } from 'express';
const router = Router();

import authMiddleware from '../middleware/auth.js';
import entriesController from '../controllers/entriesController.js';


const {
  createReading,
  getMyReadings,
  getReading,
  updateReading,
  deleteReading,
  createGame,
  getMyGames,
  getGame,
  updateGame,
  deleteGame,
  createAnime,
  getMyAnimes,
  getAnime,
  updateAnime,
  deleteAnime
} = entriesController;

// Proteger todas las rutas
router.use(authMiddleware);

// ===== READING ROUTES =====
router.post('/reading', createReading);
router.get('/reading', getMyReadings);
router.get('/reading/:id', getReading);
router.put('/reading/:id', updateReading);
router.delete('/reading/:id', deleteReading);

// ===== GAME ROUTES =====
router.post('/game', createGame);
router.get('/game', getMyGames);
router.get('/game/:id', getGame);
router.put('/game/:id', updateGame);
router.delete('/game/:id', deleteGame);

// ===== ANIME ROUTES =====
router.post('/anime', createAnime);
router.get('/anime', getMyAnimes);
router.get('/anime/:id', getAnime);
router.put('/anime/:id', updateAnime);
router.delete('/anime/:id', deleteAnime);

export default router;
