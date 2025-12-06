import {
  pgTable,
  varchar,
  serial,
  text,
  integer,
  pgEnum,
  primaryKey,
  boolean,
} from 'drizzle-orm/pg-core'
import { timestamps } from '../timestamps.js'
import { usersTable } from './user.js'

export const roomRoleEnum = pgEnum('room_role', ['co_host', 'guest'])

export const roomsTable = pgTable('rooms', {
  id: serial('id').primaryKey(),
  topic: varchar('name', { length: 256 }),
  languages: text('languages').array().notNull(),
  size: integer('size').notNull(),
  welcomeMessage: varchar('welcome_message', { length: 512 }),
  createdBy: text('created_by')
    .references(() => usersTable.id)
    .notNull(),
  host: text('host')
    .references(() => usersTable.id)
    .notNull(),
  ...timestamps,
})

export const roomRolesTable = pgTable(
  'room_roles',
  {
    roomId: integer('room_id')
      .references(() => roomsTable.id, { onDelete: 'cascade' })
      .notNull(),
    userId: text('user_id')
      .references(() => usersTable.id, { onDelete: 'cascade' })
      .notNull(),
    role: roomRoleEnum('role').notNull(),
  },
  (table) => [primaryKey({ columns: [table.roomId, table.userId] })],
)
