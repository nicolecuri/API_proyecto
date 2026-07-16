import prisma from '../lib/prisma.js'

export async function getAllRoutines() {
  return prisma.routine.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createRoutine(data) {
  return prisma.routine.create({
    data: {
      nombre: data.nombre,
      plan: data.plan,
    },
  })
}
