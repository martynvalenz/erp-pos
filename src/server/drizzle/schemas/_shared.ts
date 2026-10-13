import { timestamp, varchar } from "drizzle-orm/pg-core";
import { ulid } from "ulid";

export const ulidPk = (name = "id") =>
  varchar(name, { length: 26 })
    .primaryKey()
    .$defaultFn(() => ulid());

export const createdAt = (name = "created_at") =>
  timestamp(name, { mode: "date" }).defaultNow().notNull();

export const updatedAt = (name = "updated_at") =>
  timestamp(name, { mode: "date" })
    .defaultNow()
    .$onUpdateFn(() => new Date())
    .notNull();

export const deletedAt = (name = "deleted_at") =>
  timestamp(name, { mode: "date" });
