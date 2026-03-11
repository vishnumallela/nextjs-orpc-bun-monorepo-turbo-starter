import { betterAuth } from "better-auth";
import { Pool } from "pg";

const pgPool = new Pool({
  connectionString:
    process.env.DATABASE_URL ??
    "postgresql://admin:password@localhost:5434/postgres",
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_BASE_URL ?? "http://localhost:8000",
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  database: pgPool,
  experimental: {
    joins: true,
  },
  advanced: {
    cookiePrefix: "auth-server",
    useSecureCookies: true,
  },
  trustedOrigins: ["http://localhost:3000"],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1
  },
});
