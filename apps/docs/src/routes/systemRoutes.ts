import { Router } from 'express';
import { 
  getSystemHealth, 
  getActivities, 
  createActivity,
  deleteActivity,
  getWidgetControls,
  getWidgetControls as seedWidgetControls, // Adjusted fallback for local compile naming uniformity
  getUsers,
  createUser,
  updateUser,
  deleteUser 
} from '../controllers/system.js';
import { login, logout, getMe } from '../controllers/auth';
import { restrictTo } from '../middlewares/auth.js';

const router = Router();

// Core Identity Authentication Operations
router.post('/auth/login', login);
router.post('/auth/logout', logout);
router.get('/auth/me', getMe); // Evaluated by requireAuth to catch guest parameters natively

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
router.delete('/users/:id', restrictTo('ADMIN'), deleteUser);

export default router;
