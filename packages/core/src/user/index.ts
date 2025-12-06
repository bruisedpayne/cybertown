import { eq } from 'drizzle-orm'
import { getDB } from '../db/index.js'
import { usersTable } from '../db/schema/index.js'

export function createUser(id: string, name: string, email: string) {
  return getDB()
    .insert(usersTable)
    .values({
      id,
      name,
      email,
    })
    .returning({ id: usersTable.id })
}

export async function isUsernameAvailable(name: string) {
  const res = await getDB()
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, name))
  return res.length === 0
}
