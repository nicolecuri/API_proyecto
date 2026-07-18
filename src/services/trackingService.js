import prisma from '../lib/prisma.js'

export async function getTrackingForUserDate(userId, date) {
  return prisma.tracking.findFirst({ where: { userId, date } })
}

function deepMerge(target, source) {
  if (typeof target !== 'object' || target === null) return source;
  if (typeof source !== 'object' || source === null) return source;
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object && !Array.isArray(source[key]) && key in target && target[key] instanceof Object && !Array.isArray(target[key])) {
      output[key] = deepMerge(target[key], source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}

export async function upsertTracking(userId, date, data) {
  const existing = await prisma.tracking.findFirst({ where: { userId, date } })
  if (existing) {
    const mergedData = typeof existing.data === 'object' && existing.data !== null 
      ? deepMerge(existing.data, data)
      : data;
    return prisma.tracking.update({ where: { id: existing.id }, data: { data: mergedData } })
  }
  return prisma.tracking.create({ data: { userId, date, data } })
}

export async function listTrackingForUser(userId) {
  return prisma.tracking.findMany({ where: { userId }, orderBy: { date: 'desc' } })
}
