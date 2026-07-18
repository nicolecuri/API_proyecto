import prisma from '../lib/prisma.js'

export async function getTrackingForUserDate(userId, date) {
  return prisma.tracking.findFirst({ where: { userId, date } })
}

export async function upsertTracking(userId, date, data) {
  const existing = await prisma.tracking.findFirst({ where: { userId, date } })
  if (existing) {
    const mergedData = typeof existing.data === 'object' && existing.data !== null 
      ? { ...existing.data, ...data } 
      : data;
    return prisma.tracking.update({ where: { id: existing.id }, data: { data: mergedData } })
  }
  return prisma.tracking.create({ data: { userId, date, data } })
}

export async function listTrackingForUser(userId) {
  return prisma.tracking.findMany({ where: { userId }, orderBy: { date: 'desc' } })
}
