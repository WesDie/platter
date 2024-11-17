import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const records = pgTable("records", {
  id: integer("id").primaryKey().notNull().generatedAlwaysAsIdentity(),
  userId: integer("user_id")
    .references(() => users.id)
    .notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  artist: varchar("artist", { length: 255 }).notNull(),
  releaseYear: integer("release_year").notNull(),
  format: varchar("format", { length: 50 }).notNull(), // vinyl, CD, cassette, etc.
  condition: varchar("condition", { length: 50 }), // mint, excellent, good, fair, poor
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  imageUrl: varchar("image_url", { length: 255 }),
});

export type User = typeof users.$inferSelect;
export type Record = typeof records.$inferSelect;
export type NewRecord = typeof records.$inferInsert;
