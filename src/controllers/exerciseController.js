import { createExercise, getAllExercises, seedExercises, getExerciseById, updateExercise, deleteExercise } from '../services/exerciseService.js'

export async function listExercises(_req, res) {
  try {
    const exercises = await getAllExercises()
    res.json(exercises)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudieron obtener los ejercicios' })
  }
}

export async function createExerciseHandler(req, res) {
  try {
    const { nombre, grupoMuscularPrincipal, gruposSecundarios = [] } = req.body
    if (!nombre || !grupoMuscularPrincipal) {
      return res.status(400).json({ error: 'nombre y grupoMuscularPrincipal son obligatorios' })
    }

    const exercise = await createExercise({ nombre, grupoMuscularPrincipal, gruposSecundarios })
    res.status(201).json(exercise)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo crear el ejercicio' })
  }
}

export async function getExerciseHandler(req, res) {
  try {
    const exercise = await getExerciseById(req.params.id)
    if (!exercise) return res.status(404).json({ error: 'Ejercicio no encontrado' })
    res.json(exercise)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo obtener el ejercicio' })
  }
}

export async function updateExerciseHandler(req, res) {
  try {
    const exercise = await updateExercise(req.params.id, req.body)
    res.json(exercise)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo actualizar el ejercicio' })
  }
}

export async function deleteExerciseHandler(req, res) {
  try {
    await deleteExercise(req.params.id)
    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo eliminar el ejercicio' })
  }
}

export async function initSeed() {
  try {
    await seedExercises()
  } catch (error) {
    console.error('No se pudieron sembrar los ejercicios iniciales:', error)
  }
}
