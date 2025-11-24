import { db } from '../db/index.js'
import { usersTable } from '../db/schema.js'

export function createUser(name: string, displayName: string) {
  return db
    .insert(usersTable)
    .values({
      name,
      displayName,
    })
    .returning({ id: usersTable.id })
}
