import { Router } from 'express'
import { createRoutineHandler, deleteRoutineHandler, listRoutines } from '../controllers/routineController.js'

const router = Router()

router.get('/', listRoutines)
router.post('/', createRoutineHandler)
router.delete('/:id', deleteRoutineHandler)

export default router
