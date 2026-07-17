import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import exerciseRoutes from './src/routes/exerciseRoutes.js'
import routineRoutes from './src/routes/routineRoutes.js'
import userRoutes from './src/routes/userRoutes.js'
import trackingRoutes from './src/routes/trackingRoutes.js'
import { initSeed } from './src/controllers/exerciseController.js'
import { initUsers } from './src/controllers/userController.js'

dotenv.config()

const app = express()

app.use(cors({ origin: process.env.FRONTEND_URL || '*' }))
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ ok: true, message: 'API funcionando' })
})

app.use('/api/exercises', exerciseRoutes)
app.use('/api/routines', routineRoutes)
app.use('/api/users', userRoutes)
app.use('/api/tracking', trackingRoutes)

initSeed().catch((error) => {
  console.error('Error al iniciar la carga inicial:', error)
})

initUsers().catch((error) => {
  console.error('Error al inicializar usuarios:', error)
})

export { app }
export default app
