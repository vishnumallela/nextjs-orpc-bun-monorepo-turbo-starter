import "dotenv/config";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

const migrationsFolder = join(import.meta.dir, "../../drizzle");

export async function runMigration() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    throw new Error("DATABASE_URL is not set");
  }

  const journalPath = join(migrationsFolder, "meta", "_journal.json");
  if (!existsSync(journalPath)) {
    console.log(
      "No migrations found (run `bun run db:generate` first). Skipping migrate."
    );
    return;
  }

  const client = postgres(dbUrl, { max: 1 });
  const db = drizzle(client);
  try {
    await migrate(db, { migrationsFolder });
  } finally {
    await client.end();
  }
}
