import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function ensureUserExists(userId) {
  const uId = String(userId);
  const user = await prisma.user.findUnique({ where: { id: uId } });
  if (!user) {
    await prisma.user.create({
      data: {
        id: uId,
        nombre: `Usuario ${uId}`,
        correo: `usuario_${uId}_${Date.now()}@local.fitplanner`,
        password: 'local_password'
      }
    });
  }
  return uId;
}

export async function getDailyLog(userId, date) {
  return prisma.workoutLog.findUnique({
    where: {
      userId_date: {
        userId: String(userId),
        date
      }
    }
  })
}

export async function saveDailyLog(userId, date, data) {
  const uId = await ensureUserExists(userId);
  return prisma.workoutLog.upsert({
    where: {
      userId_date: {
        userId: uId,
        date
      }
    },
    update: {
      exercises: data.exercises !== undefined ? data.exercises : undefined,
      history: data.history !== undefined ? data.history : undefined,
    },
    create: {
      userId: uId,
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
        userId: String(userId),
        routineId
      }
    }
  })
}

export async function saveRoutineProgress(userId, routineId, data) {
  const uId = await ensureUserExists(userId);
  return prisma.routineProgress.upsert({
    where: {
      userId_routineId: {
        userId: uId,
        routineId
      }
    },
    update: {
      completedExercises: data.completedExercises !== undefined ? data.completedExercises : undefined,
      dayComments: data.dayComments !== undefined ? data.dayComments : undefined,
    },
    create: {
      userId: uId,
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
