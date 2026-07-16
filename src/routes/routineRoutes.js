import { Router } from 'express'
import { createRoutineHandler, listRoutines } from '../controllers/routineController.js'

const router = Router()

router.get('/', listRoutines)
router.post('/', createRoutineHandler)

export default router
