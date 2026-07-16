import { createRoutine, getAllRoutines } from '../services/routineService.js'

export async function listRoutines(_req, res) {
  try {
    const routines = await getAllRoutines()
    res.json(routines)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudieron obtener las rutinas' })
  }
}

export async function createRoutineHandler(req, res) {
  try {
    const { nombre, plan } = req.body
    if (!nombre || !plan) {
      return res.status(400).json({ error: 'nombre y plan son obligatorios' })
    }

    const routine = await createRoutine({ nombre, plan })
    res.status(201).json(routine)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo crear la rutina' })
  }
}
