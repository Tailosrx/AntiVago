const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/auth');
const {
  // Reading
  createReading,
  getMyReadings,
  getReading,
  updateReading,
  deleteReading,
  // Game
  createGame,
  getMyGames,
  getGame,
  updateGame,
  deleteGame,
  // Anime
  createAnime,
  getMyAnimes,
  getAnime,
  updateAnime,
  deleteAnime
} = require('../controllers/entriesController');

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

module.exports = router;