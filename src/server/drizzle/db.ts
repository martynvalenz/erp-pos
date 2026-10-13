import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schemas";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

export const pool = new Pool({
  connectionString,
});

export const db = drizzle({
  client: pool,
  schema,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as unknown as any);

export type DB = typeof db;
