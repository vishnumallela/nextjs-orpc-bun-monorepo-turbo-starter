import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
export const db = drizzle(
  process.env.DATABASE_URL ??
    "postgresql://admin:password@localhost:5434/postgres"
);
