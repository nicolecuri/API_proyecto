import prisma from '../lib/prisma.js'

export async function getTrackingForUserDate(userId, date) {
  return prisma.tracking.findFirst({ where: { userId, date } })
}

export async function upsertTracking(userId, date, data) {
  const existing = await prisma.tracking.findFirst({ where: { userId, date } })
  if (existing) {
    return prisma.tracking.update({ where: { id: existing.id }, data: { data } })
  }
  return prisma.tracking.create({ data: { userId, date, data } })
}

export async function listTrackingForUser(userId) {
  return prisma.tracking.findMany({ where: { userId }, orderBy: { date: 'desc' } })
}
