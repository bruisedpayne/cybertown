// server.ts
import handler from '@tanstack/react-start/server-entry'
import { initDB } from '@cybertown/core/db'
import { env } from 'cloudflare:workers'

export default {
  async fetch(request: Request) {
    initDB(env.HYPERDRIVE)
    return handler.fetch(request)
  },
}
