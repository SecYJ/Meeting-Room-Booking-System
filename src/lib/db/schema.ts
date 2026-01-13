import { integer, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";

export const meetingRooms = pgTable("meeting_rooms", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    capacity: integer("capacity").notNull().default(1),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
