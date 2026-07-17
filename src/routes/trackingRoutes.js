// trackingRoutes.js - versión consolidada
import { Router } from 'express';
import {
  // Rutas de tracking simple
  getTrackingHandler,
  upsertTrackingHandler,
  listTrackingHandler,
  // Rutas de log diario y progreso de rutina
  getDailyLogHandler,
  saveDailyLogHandler,
  getRoutineProgressHandler,
  saveRoutineProgressHandler,
  getHistoryHandler,
} from '../controllers/trackingController.js';

const router = Router();

// --- Tracking simple ---
router.get('/:userId/:date', getTrackingHandler); // Obtener tracking por fecha
router.get('/:userId', listTrackingHandler); // Listar tracking por usuario
router.post('/', upsertTrackingHandler); // Crear/actualizar tracking

// --- Log diario ---
router.get('/daily/:userId/:date', getDailyLogHandler);
router.post('/daily/:userId/:date', saveDailyLogHandler);

// --- Progreso de rutina ---
router.get('/progress/:userId/:routineId', getRoutineProgressHandler);
router.post('/progress/:userId/:routineId', saveRoutineProgressHandler);

// --- Historial ---
router.get('/history/:userId', getHistoryHandler);

export default router;
