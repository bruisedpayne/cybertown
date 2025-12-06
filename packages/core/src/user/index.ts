import { eq } from 'drizzle-orm'
import { usersTable } from '../db/schema/index.js'
import { useDB } from '../context.js'

export async function isUsernameAvailable(name: string) {
  const res = await useDB()
    .select()
    .from(usersTable)
    .where(eq(usersTable.name, name))
  return res.length === 0
}
