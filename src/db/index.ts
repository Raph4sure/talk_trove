// import { PrismaBetterSqlite3 } from "@db/adapter-better-sqlite3";

// import { PrismaClient } from "./generated/client";



// const connectionString = `${process.env.DATABASE_URL}`;

// const db = new PrismaBetterSqlite3({ url: connectionString });

// // export const db = new PrismaClient({});

// // import "dotenv/config";
// // import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// // import { PrismaClient } from "@prisma/client";

// // const connectionString = `${process.env.DATABASE_URL}`;

// // const adapter = new PrismaBetterSqlite3({ url: connectionString });
// // const db = new PrismaClient({ adapter });

// export { db };



import "dotenv/config";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
// import { PrismaClient } from "../generated/prisma/client";
import { PrismaClient } from "./generated/client";


const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaBetterSqlite3({ url: connectionString });
const db = new PrismaClient({ adapter });

export { db };
