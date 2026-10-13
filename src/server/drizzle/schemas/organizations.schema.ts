import {
  index,
  integer,
  pgEnum,
  pgTable,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";
import { createdAt, deletedAt, ulidPk, updatedAt } from "./_shared";
import { OrganizationStatuses } from "../types/organization.types";

export const organizationStatusEnum = pgEnum(
  "organization_status",
  OrganizationStatuses,
);

export const organization = pgTable(
  "organizations",
  {
    id: ulidPk(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).notNull(),
    appId: varchar("app_id", { length: 30 }),
    logo: varchar("logo", { length: 255 }),
    domain: varchar("domain", { length: 100 }),
    city: varchar("city", { length: 100 }),
    country: varchar("country", { length: 100 }),
    activeClinicsCount: integer("active_clinics_count").default(0),
    activeWorkspacesCount: integer("active_workspaces_count").default(0),
    status: organizationStatusEnum("status").default("trial").notNull(),
    createdAt: createdAt("created_at"),
    updatedAt: updatedAt("updated_at"),
    deletedAt: deletedAt("deleted_at"),
  },
  (table) => ({
    appSlugUnique: uniqueIndex("organizations_app_id_slug_uniq").on(
      table.appId,
      table.slug,
    ),
    domainUnique: uniqueIndex("organizations_domain_uniq").on(table.domain),
    domainIdx: index("organizations_domain_idx").on(table.domain),
    slugIdx: index("organizations_slug_idx").on(table.slug),
  }),
);

// export const selectedOrganization = pgTable(
//   "selected_organizations",
//   {
//     organizationId: varchar("organization_id", { length: 32 })
//       .notNull()
//       .references(() => organization.id, { onDelete: "cascade" }),
//     userId: varchar("user_id", { length: 32 })
//       .notNull()
//       .references(() => user.id, { onDelete: "cascade" }),
//   },
//   (table) => [
//     index("selected_organizations_organization_id_index").on(
//       table.organizationId,
//     ),
//     index("selected_organizations_user_id_index").on(table.userId),
//     uniqueIndex("selected_organizations_user_id_unique").on(
//       table.organizationId,
//       table.userId,
//     ),
//     primaryKey({ columns: [table.userId, table.organizationId] }),
//   ],
// );
