import {
  createUser,
  deleteUser,
  ensureAdminUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
} from '../services/userService.js'

export async function initUsers() {
  try {
    await ensureAdminUser()
  } catch (error) {
    console.error('No se pudo asegurar el usuario administrador:', error)
  }
}

export async function loginHandler(req, res) {
  try {
    const { correo, password } = req.body
    if (!correo || !password) {
      return res.status(400).json({ error: 'correo y password son obligatorios' })
    }

    const user = await findUserByEmail(correo)
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    if (user.bloqueado) {
      return res.status(403).json({ error: 'Cuenta bloqueada' })
    }

    const { password: _password, ...safeUser } = user
    res.json(safeUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo iniciar sesión' })
  }
}

export async function registerHandler(req, res) {
  try {
    const { nombre, correo, password } = req.body
    if (!nombre || !correo || !password) {
      return res.status(400).json({ error: 'nombre, correo y password son obligatorios' })
    }

    const existing = await findUserByEmail(correo)
    if (existing) {
      return res.status(409).json({ error: 'El correo ya está registrado' })
    }

    const user = await createUser({ nombre, correo, password })
    const { password: _password, ...safeUser } = user
    res.status(201).json(safeUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo registrar el usuario' })
  }
}

export async function listUsers(_req, res) {
  try {
    const users = await getAllUsers()
    res.json(users.map(({ password, ...rest }) => rest))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudieron obtener los usuarios' })
  }
}

export async function getUserHandler(req, res) {
  try {
    const user = await findUserById(req.params.id)
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    const { password, ...safeUser } = user
    res.json(safeUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo obtener el usuario' })
  }
}

export async function updateUserHandler(req, res) {
  try {
    const user = await updateUser(req.params.id, req.body)
    const { password, ...safeUser } = user
    res.json(safeUser)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo actualizar el usuario' })
  }
}

export async function deleteUserHandler(req, res) {
  try {
    await deleteUser(req.params.id)
    res.json({ ok: true })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo eliminar el usuario' })
  }
}
