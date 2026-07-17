import { getTrackingForUserDate, upsertTracking, listTrackingForUser } from '../services/trackingService.js'

export async function getTrackingHandler(req, res) {
  try {
    const { userId, date } = req.params
    const entry = await getTrackingForUserDate(userId, date)
    if (!entry) return res.json({})
    res.json(entry.data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo obtener el tracking' })
  }
}

export async function upsertTrackingHandler(req, res) {
  try {
    const { userId, date, data } = req.body
    if (!userId || !date || !data) return res.status(400).json({ error: 'userId, date y data son obligatorios' })
    const entry = await upsertTracking(userId, date, data)
    res.json(entry)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudo guardar el tracking' })
  }
}

export async function listTrackingHandler(req, res) {
  try {
    const { userId } = req.params
    const entries = await listTrackingForUser(userId)
    res.json(entries.map(e => ({ date: e.date, data: e.data })))
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'No se pudieron listar los tracking' })
  }
}
