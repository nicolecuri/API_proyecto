import { Router } from 'express'
import { createRoutineHandler, listRoutines, listRoutinesByUser, updateRoutineHandler, deleteRoutineHandler } from '../controllers/routineController.js'

const router = Router()

router.get('/', listRoutines)
router.get('/user/:userId', listRoutinesByUser)
router.post('/', createRoutineHandler)
router.put('/:id', updateRoutineHandler)
router.delete('/:id', deleteRoutineHandler)

export default router
