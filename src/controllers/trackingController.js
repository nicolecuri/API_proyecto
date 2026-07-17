// trackingController.js - versión actualizada
import {
  getDailyLog,
  saveDailyLog,
  getRoutineProgress,
  saveRoutineProgress,
  getHistory,
  getTrackingForUserDate,
  upsertTracking,
  listTrackingForUser,
} from '../services/trackingService.js';

// Obtener un registro de tracking por usuario y fecha
export async function getTrackingHandler(req, res) {
  try {
    const { userId, date } = req.params;
    const entry = await getTrackingForUserDate(userId, date);
    if (!entry) return res.json({});
    res.json(entry.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo obtener el tracking' });
  }
}

// Crear o actualizar un tracking
export async function upsertTrackingHandler(req, res) {
  try {
    const { userId, date, data } = req.body;
    if (!userId || !date || !data) return res.status(400).json({ error: 'userId, date y data son obligatorios' });
    const entry = await upsertTracking(userId, date, data);
    res.json(entry);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo guardar el tracking' });
  }
}

// Listar todos los tracking de un usuario
export async function listTrackingHandler(req, res) {
  try {
    const { userId } = req.params;
    const entries = await listTrackingForUser(userId);
    res.json(entries.map(e => ({ date: e.date, data: e.data })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudieron listar los tracking' });
  }
}

// Obtener registro diario
export async function getDailyLogHandler(req, res) {
  try {
    const { userId, date } = req.params;
    const log = await getDailyLog(userId, date);
    res.json(log || { userId, date, exercises: {}, history: null });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener log diario' });
  }
}

// Guardar registro diario
export async function saveDailyLogHandler(req, res) {
  try {
    const { userId, date } = req.params;
    const data = req.body;
    const log = await saveDailyLog(userId, date, data);
    res.json(log);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar log diario' });
  }
}

// Obtener progreso de rutina
export async function getRoutineProgressHandler(req, res) {
  try {
    const { userId, routineId } = req.params;
    const progress = await getRoutineProgress(userId, routineId);
    res.json(
      progress || {
        userId,
        routineId,
        completedExercises: {},
        dayComments: {},
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener progreso de rutina' });
  }
}

// Guardar progreso de rutina
export async function saveRoutineProgressHandler(req, res) {
  try {
    const { userId, routineId } = req.params;
    const data = req.body;
    const progress = await saveRoutineProgress(userId, routineId, data);
    res.json(progress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar progreso de rutina' });
  }
}

// Obtener historial completo del usuario
export async function getHistoryHandler(req, res) {
  try {
    const { userId } = req.params;
    const history = await getHistory(userId);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener historial' });
  }
}
