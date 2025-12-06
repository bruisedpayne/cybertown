import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from './schema/index.js'
import { Pool } from 'pg'

export function createDB(hyperdrive: Hyperdrive) {
  const pool = new Pool({
    connectionString: hyperdrive.connectionString,
    max: 5,
  })
  return drizzle(pool, { schema })
}
