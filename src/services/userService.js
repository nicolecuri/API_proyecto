import prisma from '../lib/prisma.js'

export async function getAllUsers() {
  return prisma.user.findMany({ orderBy: { createdAt: 'desc' } })
}

export async function createUser(data) {
  return prisma.user.create({
    data: {
      nombre: data.nombre,
      correo: data.correo,
      password: data.password,
      rol: data.rol || 'usuario',
      bloqueado: false,
    },
  })
}

export async function findUserByEmail(correo) {
  return prisma.user.findUnique({ where: { correo } })
}

export async function findUserById(id) {
  return prisma.user.findUnique({ where: { id } })
}

export async function updateUser(id, data) {
  return prisma.user.update({ where: { id }, data })
}

export async function deleteUser(id) {
  return prisma.user.delete({ where: { id } })
}

export async function ensureAdminUser() {
  const existingAdmin = await prisma.user.findFirst({ where: { rol: 'admin' } })
  if (existingAdmin) return existingAdmin

  return prisma.user.create({
    data: {
      nombre: 'Administrador',
      correo: 'admin@gmail.com',
      password: 'admin123',
      rol: 'admin',
    },
  })
}
