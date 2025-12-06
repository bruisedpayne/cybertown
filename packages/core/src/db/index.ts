import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema/index.js'
import { Pool } from 'pg'

let db: ReturnType<typeof drizzle>

export function initDB(hyperdrive: Hyperdrive) {
  const pool = new Pool({
    connectionString: hyperdrive.connectionString,
    max: 5,
  })
  db = drizzle(pool, { schema })
}

export function getDB() {
  if (!db) {
    throw new Error('db not initialized')
  }
  return db
}
