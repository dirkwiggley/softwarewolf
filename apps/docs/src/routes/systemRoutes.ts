import { Router } from 'express';
import { getSystemHealth, getActivities, createActivity } from '../controllers/system.js';

const router = Router();

router.get('/health', getSystemHealth);
router.get('/activities', getActivities);    // <-- Read list state route
router.post('/activities', createActivity);  // <-- Write list mutation route

export default router;
