import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import achievementsController from '../controllers/achievementsController.js';

const router = Router();

router.use(authMiddleware);

router.get('/definitions', achievementsController.getAchievementDefinitions);
router.get('/my', achievementsController.getMyAchievements);
router.get('/progress', achievementsController.getAchievementProgress);
router.post('/check', achievementsController.checkAndUnlock);

export default router;