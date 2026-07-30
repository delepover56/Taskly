import assert from 'node:assert/strict'
import { after, before, describe, it } from 'node:test'
import app from '../src/app.js'

let server
let baseUrl

before(async () => {
    server = app.listen(0)
    await new Promise((resolve) => server.once('listening', resolve))
    baseUrl = `http://127.0.0.1:${server.address().port}`
})

after(async () => {
    await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()))
})

describe('Taskly API', () => {
    it('reports its health without requiring a configured database', async () => {
        const response = await fetch(`${baseUrl}/api/health`)
        const body = await response.json()
        assert.equal(response.status, 200)
        assert.equal(body.status, 'ok')
        assert.equal(body.service, 'taskly-api')
        assert.equal(body.database.configured, false)
        assert.equal(body.database.state, 'disconnected')
    })

    it('returns JSON for unknown API routes', async () => {
        const response = await fetch(`${baseUrl}/api/unknown`)
        const body = await response.json()
        assert.equal(response.status, 404)
        assert.equal(body.error, 'Not found')
    })
})
