import { Router } from 'express'
import { createExerciseHandler, listExercises } from '../controllers/exerciseController.js'

const router = Router()

router.get('/', listExercises)
router.post('/', createExerciseHandler)

export default router
