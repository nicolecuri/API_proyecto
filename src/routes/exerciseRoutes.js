import { Router } from 'express'
import { createExerciseHandler, listExercises, getExerciseHandler, updateExerciseHandler, deleteExerciseHandler } from '../controllers/exerciseController.js'

const router = Router()

router.get('/', listExercises)
router.get('/:id', getExerciseHandler)
router.post('/', createExerciseHandler)
router.put('/:id', updateExerciseHandler)
router.delete('/:id', deleteExerciseHandler)

export default router
