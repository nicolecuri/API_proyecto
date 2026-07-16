import { createExercise, getAllExercises, seedExercises } from '../services/exerciseService.js'

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

export async function initSeed() {
  try {
    await seedExercises()
  } catch (error) {
    console.error('No se pudieron sembrar los ejercicios iniciales:', error)
  }
}
