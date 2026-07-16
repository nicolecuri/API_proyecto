import { Router } from 'express'
import {
  deleteUserHandler,
  getUserHandler,
  listUsers,
  loginHandler,
  registerHandler,
  updateUserHandler,
} from '../controllers/userController.js'

const router = Router()

router.post('/login', loginHandler)
router.post('/register', registerHandler)
router.get('/', listUsers)
router.get('/:id', getUserHandler)
router.put('/:id', updateUserHandler)
router.delete('/:id', deleteUserHandler)

export default router
