import { Router } from 'express';
const router = Router();
import  authMiddleware  from '../middleware/auth.js';
import entriesController from '../controllers/entriesController.js';

router.use(authMiddleware);

// READING
router.post('/reading', entriesController.createReading);
router.get('/reading', entriesController.getMyReadings);
router.get('/reading/:id', entriesController.getReading);
router.put('/reading/:id', entriesController.updateReading);
router.delete('/reading/:id', entriesController.deleteReading);

// GAME
router.post('/game', entriesController.createGame);
router.get('/game', entriesController.getMyGames);
router.get('/game/:id', entriesController.getGame);
router.put('/game/:id', entriesController.updateGame);
router.delete('/game/:id', entriesController.deleteGame);

// ANIME
router.post('/anime', entriesController.createAnime);
router.get('/anime', entriesController.getMyAnimes);
router.get('/anime/:id', entriesController.getAnime);
router.put('/anime/:id', entriesController.updateAnime);
router.delete('/anime/:id', entriesController.deleteAnime);


//Juntitos
router.get('/', entriesController.getAllEntries);
router.put('/:id', entriesController.updateEntry);
router.delete('/:id', entriesController.deleteReading);
router.post('/', entriesController.createReading);

export default router;