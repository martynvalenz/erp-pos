import {
  boolean,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { UserTypes } from "../types/user.types";
import { organization } from ".";
import { createdAt, ulidPk, updatedAt } from "./_shared";

export const userTypeEnum = pgEnum("user_type", UserTypes);

export const user = pgTable(
  "users",
  {
    id: ulidPk(),
    name: varchar("name", { length: 50 }).notNull(),
    email: varchar("email", { length: 100 }).notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    username: varchar("username", { length: 50 }),
    displayUsername: text("display_username"),
    image: varchar("image", { length: 255 }),
    color: varchar("color", { length: 10 }).default("#2655FFFF").notNull(),
    organizationId: varchar("organization_id", { length: 26 }).references(
      () => organization.id,
      { onDelete: "set null" },
    ), // This is optional, when a user does not have a real email account (username) it strictly belongs to an organization, however the user can be freed, when adding a real email
    userType: userTypeEnum("user_type").default("USER").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at"),
  },
  (table) => ({
    emailUnique: uniqueIndex("users_email_uniq").on(table.email),
    usernameIdx: index("users_username_idx").on(table.username),
    organizationIdIdx: index("users_organization_id_idx").on(
      table.organizationId,
    ),
  }),
);

export const session = pgTable(
  "sessions",
  {
    id: ulidPk(),
    expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
    token: text("token").notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: varchar("user_id", { length: 32 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at"),
  },
  (table) => ({
    tokenUnique: uniqueIndex("sessions_token_uniq").on(table.token),
    userIdx: index("sessions_user_id_idx").on(table.userId),
  }),
);

export const account = pgTable(
  "accounts",
  {
    id: ulidPk(),
    // Kept nullable for databases created with Better Auth 1.7.0-1.7.2.
    issuer: text("issuer"),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: varchar("user_id", { length: 32 })
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at", {
      mode: "date",
    }),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at", {
      mode: "date",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at"),
  },
  (table) => ({
    userIdx: index("accounts_user_id_idx").on(table.userId),
    providerAccountIdx: uniqueIndex("accounts_provider_account_uniq").on(
      table.providerId,
      table.accountId,
    ),
  }),
);

export const verification = pgTable("verifications", {
  id: ulidPk(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
  createdAt: createdAt("created_at"),
  updatedAt: updatedAt("updated_at"),
});

export const jwks = pgTable("jwks", {
  id: ulidPk(),
  publicKey: text("public_key").notNull(),
  privateKey: text("private_key").notNull(),
  alg: text("alg"),
  crv: text("crv"),
  expiresAt: timestamp("expires_at", { mode: "date" }),
  createdAt: createdAt("created_at"),
  updatedAt: updatedAt("updated_at"),
});
