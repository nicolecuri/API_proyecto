import prisma from '../lib/prisma.js'

export async function getAllRoutines() {
  return prisma.routine.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function getRoutinesByUser(userId) {
  return prisma.routine.findMany({ 
    where: { userId },
    orderBy: { createdAt: 'desc' } 
  })
}

export async function createRoutine(data) {
  return prisma.routine.create({
    data: {
      userId: data.userId,
      nombre: data.nombre,
      plan: data.plan,
    },
  })
}

export async function updateRoutine(id, data) {
  return prisma.routine.update({
    where: { id },
    data: {
      nombre: data.nombre,
      plan: data.plan,
    },
  })
}

export async function deleteRoutine(id) {
  return prisma.routine.delete({
    where: { id }
  })
}
