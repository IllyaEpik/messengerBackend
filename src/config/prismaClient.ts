import {PrismaClient} from "../generated/prisma/client.ts";
import { env } from "./env.ts";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const adapter = new PrismaBetterSqlite3({
	url: env.DATABASE_URL!,
});
const client = new PrismaClient({
	adapter,
});

export default client