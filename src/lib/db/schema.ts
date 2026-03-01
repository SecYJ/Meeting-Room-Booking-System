import { sql } from "drizzle-orm";
import {
    boolean,
    check,
    integer,
    pgTable,
    primaryKey,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { uuidPrimaryKey, withTimestamps } from "./common-columns";

export const roles = pgTable("roles", {
    roleId: uuidPrimaryKey("role_id"),
    name: varchar("name", { length: 50 }).notNull().unique(),
    description: varchar("description", { length: 255 }),
    ...withTimestamps(),
});

export const users = pgTable("users", {
    userId: uuidPrimaryKey("user_id"),
    username: varchar("username", { length: 50 }).notNull(),
    email: varchar("email", { length: 254 }).notNull().unique(),
    ...withTimestamps(),
});

export const rooms = pgTable(
    "rooms",
    {
        roomId: uuidPrimaryKey("room_id"),
        name: varchar("name", { length: 120 }).notNull(),
        capacity: integer("capacity").notNull().default(1),
        isActive: boolean("is_active").notNull().default(true),
        ...withTimestamps(),
    },
    (table) => [check("rooms_capacity_gt_zero_chk", sql`${table.capacity} > 0`)],
);

export const departments = pgTable("departments", {
    departmentId: uuidPrimaryKey("department_id"),
    name: varchar("name", { length: 120 }).notNull(),
    ...withTimestamps(),
});

export const userDepartments = pgTable(
    "user_departments",
    {
        userId: uuid("user_id")
            .notNull()
            .references(() => users.userId),
        departmentId: uuid("department_id")
            .notNull()
            .references(() => departments.departmentId),
        ...withTimestamps(),
    },
    (table) => [
        primaryKey({
            columns: [table.userId, table.departmentId],
            name: "user_departments_user_department_pk",
        }),
    ],
);

export const bookings = pgTable(
    "bookings",
    {
        bookingId: uuidPrimaryKey("booking_id"),
        organizerId: uuid("organizer_id")
            .notNull()
            .references(() => users.userId),
        roomId: uuid("room_id")
            .notNull()
            .references(() => rooms.roomId),
        title: varchar("title", { length: 255 }).notNull(),
        description: varchar("description", { length: 1024 }),
        startTime: timestamp("start_time", { withTimezone: true }).notNull(),
        endTime: timestamp("end_time", { withTimezone: true }).notNull(),
        ...withTimestamps(),
    },
    (table) => [check("bookings_start_before_end_chk", sql`${table.endTime} > ${table.startTime}`)],
);

export const bookingAttendees = pgTable(
    "booking_attendees",
    {
        bookingId: uuid("booking_id")
            .notNull()
            .references(() => bookings.bookingId),
        attendeeId: uuid("attendee_id")
            .notNull()
            .references(() => users.userId),
        ...withTimestamps(),
    },
    (table) => [
        primaryKey({
            columns: [table.bookingId, table.attendeeId],
            name: "booking_attendees_booking_attendee_pk",
        }),
    ],
);

export const userRoles = pgTable(
    "user_roles",
    {
        userId: uuid("user_id")
            .notNull()
            .references(() => users.userId),
        roleId: uuid("role_id")
            .notNull()
            .references(() => roles.roleId),
        ...withTimestamps(),
    },
    (table) => [
        primaryKey({
            columns: [table.userId, table.roleId],
            name: "user_roles_user_role_pk",
        }),
    ],
);
