import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: ".env.local" });
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/drizzle/schemas/index.ts",
  out: "./src/server/drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
