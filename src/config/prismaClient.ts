import { PrismaClient } from "../generated/prisma/client.ts";
import { env } from "./env.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// const adapter = new PrismaBetterSqlite3({
// 	url: env.DATABASE_URL,
// });
// const client = new PrismaClient({
// 	adapter,
// })

const pool = new Pool({
	connectionString: env.DATABASE_URL,
	max: 2, // всего одно соединение
	idleTimeoutMillis: 0,
});

const adapter = new PrismaPg(pool);

const client = new PrismaClient({
	adapter,
});

export default client;
