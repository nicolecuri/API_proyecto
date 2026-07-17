import prisma from '../lib/prisma.js'

export async function getAllRoutines(userId) {
  return prisma.routine.findMany({
    where: userId ? { userId } : undefined,
    orderBy: { createdAt: 'desc' },
  })
}

export async function createRoutine(data) {
  return prisma.routine.create({
    data: {
      nombre: data.nombre,
      plan: data.plan,
      userId: data.userId || null,
    },
  })
}

export async function deleteRoutine(id, userId) {
  const where = userId ? { id, userId } : { id }
  return prisma.routine.delete({ where })
}
