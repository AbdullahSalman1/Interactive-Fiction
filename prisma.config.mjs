// Prisma 7: the database address lives HERE (for the CLI), not in schema.prisma.
// src/db.js reads the same DATABASE_URL for the running app.
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "node prisma/seed.js",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
