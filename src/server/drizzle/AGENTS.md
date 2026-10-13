# Drizzle instructions

These rules apply to `src/server/drizzle` and supplement the repository guide.

- The Drizzle database client is in `src/server/drizzle/db.ts`.
- Drizzle schemas live in `src/server/drizzle/schemas` and shared database types
  live in `src/server/drizzle/types`.
- Keep schema changes consistent with existing naming, relations, indexes,
  tenant identifiers, timestamps, and soft-delete conventions.
- Prefer indexed queries and select only the data required by the caller.
- Keep database access in server-only code, repositories, queries, or services.
- Migration files are produced by Drizzle tooling. Do not rewrite old
  migrations or run `db:push`, `db:migrate`, or production migrations unless
  the task explicitly requires it.
- After schema changes, use the appropriate project command and verify the
  resulting types before changing application code around them.
