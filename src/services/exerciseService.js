import prisma from '../lib/prisma.js'

export async function getAllExercises() {
  return prisma.exercise.findMany({ orderBy: { nombre: 'asc' } })
}

export async function createExercise(data) {
  return prisma.exercise.create({
    data: {
      nombre: data.nombre,
      grupoMuscularPrincipal: data.grupoMuscularPrincipal,
      gruposSecundarios: data.gruposSecundarios || [],
    },
  })
}

export async function seedExercises() {
  const existing = await prisma.exercise.count()
  if (existing > 0) return

  const initialExercises = [
    { nombre: 'Press banca', grupoMuscularPrincipal: 'Pectoral', gruposSecundarios: ['Tríceps', 'Hombros'] },
    { nombre: 'Remo con barra', grupoMuscularPrincipal: 'Espalda', gruposSecundarios: ['Bíceps'] },
    { nombre: 'Press militar', grupoMuscularPrincipal: 'Hombros', gruposSecundarios: ['Tríceps'] },
    { nombre: 'Sentadilla', grupoMuscularPrincipal: 'Piernas', gruposSecundarios: ['Glúteos'] },
    { nombre: 'Curl barra', grupoMuscularPrincipal: 'Bíceps', gruposSecundarios: [] },
    { nombre: 'Extensión polea', grupoMuscularPrincipal: 'Tríceps', gruposSecundarios: [] },
    { nombre: 'Elevación de talones', grupoMuscularPrincipal: 'Gemelos', gruposSecundarios: [] },
    { nombre: 'Crunch', grupoMuscularPrincipal: 'Abdominales', gruposSecundarios: [] },
  ]

  await prisma.exercise.createMany({ data: initialExercises })
}
