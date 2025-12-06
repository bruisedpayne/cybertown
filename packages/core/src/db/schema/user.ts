import { pgTable, text, boolean } from 'drizzle-orm/pg-core'
import { timestamps } from '../timestamps.js'

export const usersTable = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  image: text('image'),
  ...timestamps,
})
