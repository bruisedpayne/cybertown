import { pgTable, varchar, serial, text, integer, pgEnum, primaryKey, timestamp } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamps.js";

export const usersTable = pgTable('users', {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 256 }).unique().notNull(),
	displayName: varchar("display_name", { length: 256 }).notNull(),
	avatar: varchar("avatar", { length: 256 }),
	...timestamps,
});

export const roomsTable = pgTable('rooms', {
	id: serial("id").primaryKey(),
	topic: varchar("name", { length: 256 }),
	languages: text("languages").array().notNull(),
	size: integer("size").notNull(),
	welcomeMessage: varchar("welcome_message", { length: 512 }),
	createdBy: integer("created_by").references(() => usersTable.id).notNull(),
	host: integer("host").references(() => usersTable.id).notNull(),
	...timestamps,
});

export const roomRoleEnum = pgEnum('room_role', ['co_host', 'guest']);

export const roomRolesTable = pgTable('room_roles', {
	roomId: integer("room_id").references(() => roomsTable.id, { onDelete: 'cascade' }).notNull(),
	userId: integer("user_id").references(() => usersTable.id, { onDelete: 'cascade' }).notNull(),
	role: roomRoleEnum('role').notNull(),
	grantedAt: timestamp("granted_at").notNull(),
}, (table) => [
	primaryKey({ columns: [table.roomId, table.userId] })
]);
