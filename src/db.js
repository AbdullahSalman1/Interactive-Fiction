// The ONE Prisma client the whole app shares. Import it everywhere:
//   import { prisma } from "./db.js";
//
// Prisma 7: the client needs a "driver adapter" built from the same url
// that prisma.config.mjs gives to the CLI.
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({ url: process.env.DATABASE_URL });

export const prisma = new PrismaClient({ adapter });
