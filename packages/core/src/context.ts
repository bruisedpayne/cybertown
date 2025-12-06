import { AsyncLocalStorage } from 'node:async_hooks'
import { drizzle } from 'drizzle-orm/node-postgres'
import { createAuth } from './auth/index.js'

export type AppContext = {
  db: ReturnType<typeof drizzle>
  auth: ReturnType<typeof createAuth>
}

const contextStorage = new AsyncLocalStorage<AppContext>()

export function createContext<R>(ctx: AppContext, cb: () => R) {
  return contextStorage.run(ctx, cb)
}

function useContext() {
  const ctx = contextStorage.getStore()
  if (!ctx) {
    throw new Error('app context not found')
  }
  return ctx
}

export function useDB() {
  return useContext().db
}

export function useAuth() {
  return useContext().auth
}
