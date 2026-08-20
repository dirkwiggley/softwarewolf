import { Router } from 'express';
import { 
  getSystemHealth, 
  getActivities, 
  createActivity,
  deleteActivity,
  getWidgetControls,
  seedWidgetControls,
  getUsers,
  createUser,
  updateUser,
  deleteUser // <-- Import the new deleteUser function
} from '../controllers/system.js';
import { restrictTo } from '../middlewares/auth.js';

const router = Router();

// Public / General Developer Routes
router.get('/health', getSystemHealth);
router.get('/activities', getActivities);
router.post('/activities', createActivity);
router.delete('/activities/:id', deleteActivity);
router.get('/widgets', getWidgetControls);
router.get('/widgets/seed', seedWidgetControls);

// Secure Administrative User Management Routing Paths
router.get('/users', restrictTo('ADMIN'), getUsers);
router.post('/users', restrictTo('ADMIN'), createUser);
router.patch('/users/:id', restrictTo('ADMIN'), updateUser);
router.delete('/users/:id', restrictTo('ADMIN'), deleteUser); // <-- Register the DELETE user endpoint

export default router;
