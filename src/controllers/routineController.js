import { createRoutine, getAllRoutines, getRoutinesByUser, updateRoutine, deleteRoutine } from '../services/routineService.js'

export async function listRoutines(_req, res) {
  try {
    const routines = await getAllRoutines()
    res.json(routines)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudieron obtener las rutinas' })
  }
}

export async function listRoutinesByUser(req, res) {
  try {
    const { userId } = req.params
    const routines = await getRoutinesByUser(userId)
    res.json(routines)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudieron obtener las rutinas' })
  }
}

export async function createRoutineHandler(req, res) {
  try {
    const { userId, nombre, plan } = req.body
    if (!userId || !nombre || !plan) {
      return res.status(400).json({ error: 'userId, nombre y plan son obligatorios' })
    }

    const routine = await createRoutine({ userId, nombre, plan })
    res.status(201).json(routine)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo crear la rutina' })
  }
}

export async function updateRoutineHandler(req, res) {
  try {
    const { id } = req.params
    const { nombre, plan } = req.body
    if (!nombre || !plan) {
      return res.status(400).json({ error: 'nombre y plan son obligatorios' })
    }

    const routine = await updateRoutine(id, { nombre, plan })
    res.json(routine)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo actualizar la rutina' })
  }
}

export async function deleteRoutineHandler(req, res) {
  try {
    const { id } = req.params
    await deleteRoutine(id)
    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo eliminar la rutina' })
  }
}
