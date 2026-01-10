// import { PrismaClient } from "@prisma/client";

// export const prisma = new PrismaClient();

import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const db = new PrismaClient({ adapter });

export { db };
