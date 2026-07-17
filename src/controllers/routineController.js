import { createRoutine, deleteRoutine, getAllRoutines } from '../services/routineService.js'

export async function listRoutines(req, res) {
  try {
    const routines = await getAllRoutines(req.query.userId)
    res.json(routines)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudieron obtener las rutinas' })
  }
}

export async function createRoutineHandler(req, res) {
  try {
    const { nombre, plan, userId } = req.body
    if (!nombre || !plan) {
      return res.status(400).json({ error: 'nombre y plan son obligatorios' })
    }

    const routine = await createRoutine({ nombre, plan, userId })
    res.status(201).json(routine)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo crear la rutina' })
  }
}

export async function deleteRoutineHandler(req, res) {
  try {
    const { id } = req.params
    const { userId } = req.body
    await deleteRoutine(id, userId)
    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo eliminar la rutina' })
  }
}
