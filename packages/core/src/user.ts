import { usersTable } from './db/schema/user.js'

export type User = Pick<typeof usersTable.$inferSelect, 'id' | 'name' | 'image'>
