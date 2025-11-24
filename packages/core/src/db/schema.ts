import { pgTable, varchar, serial, timestamp } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users', {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 256 }).unique().notNull(),
	displayName: varchar("display_name", { length: 256 }).notNull(),
	avatar: varchar("avatar", { length: 256 }),
	createdAt: timestamp("created_at").defaultNow(),
	updatedAt: timestamp("updated_at").defaultNow(),
});
