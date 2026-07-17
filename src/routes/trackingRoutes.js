import { Router } from 'express'
import {
  getDailyLogHandler,
  saveDailyLogHandler,
  getRoutineProgressHandler,
  saveRoutineProgressHandler,
  getHistoryHandler
} from '../controllers/trackingController.js'

const router = Router()

router.get('/daily/:userId/:date', getDailyLogHandler)
router.post('/daily/:userId/:date', saveDailyLogHandler)

router.get('/progress/:userId/:routineId', getRoutineProgressHandler)
router.post('/progress/:userId/:routineId', saveRoutineProgressHandler)

router.get('/history/:userId', getHistoryHandler)

export default router
