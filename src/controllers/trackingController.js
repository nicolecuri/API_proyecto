import {
  getDailyLog,
  saveDailyLog,
  getRoutineProgress,
  saveRoutineProgress,
  getHistory
} from '../services/trackingService.js'

export async function getDailyLogHandler(req, res) {
  try {
    const { userId, date } = req.params
    const log = await getDailyLog(userId, date)
    res.json(log || { userId, date, exercises: {}, history: null })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener log diario' })
  }
}

export async function saveDailyLogHandler(req, res) {
  try {
    const { userId, date } = req.params
    const data = req.body
    const log = await saveDailyLog(userId, date, data)
    res.json(log)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al guardar log diario' })
  }
}

export async function getRoutineProgressHandler(req, res) {
  try {
    const { userId, routineId } = req.params
    const progress = await getRoutineProgress(userId, routineId)
    res.json(progress || { userId, routineId, completedExercises: {}, dayComments: {} })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener progreso de rutina' })
  }
}

export async function saveRoutineProgressHandler(req, res) {
  try {
    const { userId, routineId } = req.params
    const data = req.body
    const progress = await saveRoutineProgress(userId, routineId, data)
    res.json(progress)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al guardar progreso de rutina' })
  }
}

export async function getHistoryHandler(req, res) {
  try {
    const { userId } = req.params
    const history = await getHistory(userId)
    res.json(history)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener historial' })
  }
}
