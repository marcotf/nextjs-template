// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { randomUUID } from "crypto";
import { relations, sql } from "drizzle-orm";
import { mysqlTableCreator, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `trpc-clerk_${name}`);

/**
 * JOB CATEGORIES
 */

export const jobCategories = mysqlTable("job_category", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: varchar("name", { length: 256 }).notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .onUpdateNow(),
});

export const categoriesRelations = relations(jobCategories, ({ many }) => ({
  jobs: many(jobs),
}));

/**
 * JOBS
 */
export const jobs = mysqlTable("job", {
  id: varchar("id", { length: 36 })
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: varchar("title", { length: 256 }).notNull(),
  categoryId: varchar("category_id", { length: 36 }).default("").notNull(),
  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updatedAt")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull()
    .onUpdateNow(),
});

export const jobsRelations = relations(jobs, ({ one }) => ({
  jobCategory: one(jobCategories, {
    fields: [jobs.categoryId],
    references: [jobCategories.id],
  }),
}));

// export type JobSelect = InferSelectModel<typeof jobs>;
// export type JobInsert = InferInsertModel<typeof jobs>;
