import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function getDailyLog(userId, date) {
  return prisma.workoutLog.findUnique({
    where: {
      userId_date: {
        userId,
        date
      }
    }
  })
}

export async function saveDailyLog(userId, date, data) {
  return prisma.workoutLog.upsert({
    where: {
      userId_date: {
        userId,
        date
      }
    },
    update: {
      exercises: data.exercises !== undefined ? data.exercises : undefined,
      history: data.history !== undefined ? data.history : undefined,
    },
    create: {
      userId,
      date,
      exercises: data.exercises || {},
      history: data.history || null,
    }
  })
}

export async function getRoutineProgress(userId, routineId) {
  return prisma.routineProgress.findUnique({
    where: {
      userId_routineId: {
        userId,
        routineId
      }
    }
  })
}

export async function saveRoutineProgress(userId, routineId, data) {
  return prisma.routineProgress.upsert({
    where: {
      userId_routineId: {
        userId,
        routineId
      }
    },
    update: {
      completedExercises: data.completedExercises !== undefined ? data.completedExercises : undefined,
      dayComments: data.dayComments !== undefined ? data.dayComments : undefined,
    },
    create: {
      userId,
      routineId,
      completedExercises: data.completedExercises || {},
      dayComments: data.dayComments || {},
    }
  })
}

export async function getHistory(userId) {
  return prisma.workoutLog.findMany({
    where: { userId },
    orderBy: { date: 'desc' }
  })
}
