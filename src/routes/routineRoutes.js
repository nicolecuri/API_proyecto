import { Router } from 'express'
import { createRoutineHandler, deleteRoutineHandler, listRoutines, getRoutineHandler, updateRoutineHandler } from '../controllers/routineController.js'

const router = Router()

router.get('/', listRoutines)
router.get('/:id', getRoutineHandler)
router.post('/', createRoutineHandler)
router.put('/:id', updateRoutineHandler)
router.delete('/:id', deleteRoutineHandler)

export default router
