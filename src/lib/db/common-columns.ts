import { timestamp, uuid } from "drizzle-orm/pg-core";

export const withTimestamps = () => ({
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()),
});

export const uuidPrimaryKey = (name: string) => uuid(name).defaultRandom().primaryKey();
