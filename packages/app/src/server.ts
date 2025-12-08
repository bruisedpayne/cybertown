// server.ts
import handler from '@tanstack/react-start/server-entry'
import { createDB } from '@cybertown/core/db'
import { env } from 'cloudflare:workers'
import { createAuth } from '@cybertown/core/auth'
import { createContext } from '@cybertown/core/context'

export default {
  async fetch(request: Request) {
    const db = createDB(env.HYPERDRIVE)
    const auth = createAuth(db)

    return createContext({ db, auth, request: {} }, () => {
      return handler.fetch(request)
    })
  },
}
