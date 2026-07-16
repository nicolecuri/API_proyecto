import test from 'node:test'
import assert from 'node:assert/strict'
import { createServer } from 'node:http'
import { app } from '../app.js'

test('GET /health responde con mensaje de éxito', async () => {
  const server = createServer(app)
  await new Promise((resolve) => server.listen(0, resolve))

  const address = server.address()
  const response = await fetch(`http://127.0.0.1:${address.port}/health`)
  const body = await response.json()

  assert.equal(response.status, 200)
  assert.deepEqual(body, { ok: true, message: 'API funcionando' })

  await new Promise((resolve) => server.close(resolve))
})
