import { sql } from "drizzle-orm";
import {
  boolean,
  index,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

//better-auth-schema (need for auth)
export const userTable = pgTable(
  "user",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    emailVerified: boolean("emailVerified").notNull().default(false),
    image: text("image"),
    createdAt: timestamp("createdAt").notNull().default(sql`now()`),
    updatedAt: timestamp("updatedAt").notNull().default(sql`now()`),
  },
  (table) => [uniqueIndex("email_unique").on(table.email)]
);

export const sessionTable = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    token: text("token").notNull().unique(),
    expiresAt: timestamp("expiresAt").notNull(),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    createdAt: timestamp("createdAt").notNull().default(sql`now()`),
    updatedAt: timestamp("updatedAt").notNull().default(sql`now()`),
  },
  (table) => [
    index("session_user_id_idx").on(table.userId),
    index("session_expires_at_idx").on(table.expiresAt),
  ]
);

export const accountTable = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    userId: text("userId")
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),
    accountId: text("accountId").notNull(),
    providerId: text("providerId").notNull(),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
    refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
    scope: text("scope"),
    idToken: text("idToken"),
    password: text("password"),
    createdAt: timestamp("createdAt").notNull().default(sql`now()`),
    updatedAt: timestamp("updatedAt").notNull().default(sql`now()`),
  },
  (table) => [
    index("account_user_id_idx").on(table.userId),
    index("account_account_id_idx").on(table.accountId),
    index("account_provider_id_idx").on(table.providerId),
  ]
);

export const verificationTable = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expiresAt").notNull(),
    createdAt: timestamp("createdAt").notNull().default(sql`now()`),
    updatedAt: timestamp("updatedAt").notNull().default(sql`now()`),
  },
  (table) => [
    index("verification_identifier_idx").on(table.identifier),
    index("verification_value_idx").on(table.value),
    index("verification_expires_at_idx").on(table.expiresAt),
  ]
);

//app-specific schema
