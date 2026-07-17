// trackingService.js - versión consolidada
import prisma from '../lib/prisma.js';

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

// ---------- Tracking simple ----------
export async function getTrackingForUserDate(userId, date) {
  const uId = String(userId);
  return prisma.tracking.findFirst({ where: { userId: uId, date } });
}

export async function upsertTracking(userId, date, data) {
  const uId = await ensureUserExists(userId);
  const existing = await prisma.tracking.findFirst({ where: { userId: uId, date } });
  if (existing) {
    return prisma.tracking.update({ where: { id: existing.id }, data: { data } });
  }
  return prisma.tracking.create({ data: { userId: uId, date, data } });
}

export async function listTrackingForUser(userId) {
  const uId = String(userId);
  return prisma.tracking.findMany({ where: { userId: uId }, orderBy: { date: 'desc' } });
}

// ---------- Log diario ----------
export async function getDailyLog(userId, date) {
  const uId = String(userId);
  return prisma.workoutLog.findUnique({
    where: { userId_date: { userId: uId, date } },
  });
}

export async function saveDailyLog(userId, date, data) {
  const uId = await ensureUserExists(userId);
  return prisma.workoutLog.upsert({
    where: { userId_date: { userId: uId, date } },
    update: {
      exercises: data.exercises !== undefined ? data.exercises : undefined,
      history: data.history !== undefined ? data.history : undefined,
    },
    create: {
      userId: uId,
      date,
      exercises: data.exercises || {},
      history: data.history || null,
    },
  });
}

// ---------- Progreso de rutina ----------
export async function getRoutineProgress(userId, routineId) {
  const uId = String(userId);
  return prisma.routineProgress.findUnique({
    where: { userId_routineId: { userId: uId, routineId } },
  });
}

export async function saveRoutineProgress(userId, routineId, data) {
  const uId = await ensureUserExists(userId);
  return prisma.routineProgress.upsert({
    where: { userId_routineId: { userId: uId, routineId } },
    update: {
      completedExercises: data.completedExercises !== undefined ? data.completedExercises : undefined,
      dayComments: data.dayComments !== undefined ? data.dayComments : undefined,
    },
    create: {
      userId: uId,
      routineId,
      completedExercises: data.completedExercises || {},
      dayComments: data.dayComments || {},
    },
  });
}

// ---------- Historial ----------
export async function getHistory(userId) {
  const uId = String(userId);
  return prisma.workoutLog.findMany({
    where: { userId: uId },
    orderBy: { date: 'desc' },
  });
}
