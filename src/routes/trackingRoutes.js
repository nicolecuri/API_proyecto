import { Router } from 'express'
import { getTrackingHandler, upsertTrackingHandler, listTrackingHandler } from '../controllers/trackingController.js'

const router = Router()

router.get('/:userId/:date', getTrackingHandler)
router.get('/:userId', listTrackingHandler)
router.post('/', upsertTrackingHandler)

export default router
