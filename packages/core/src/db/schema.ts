import { pgTable, varchar, serial, text, integer } from "drizzle-orm/pg-core";
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
	...timestamps,
});
