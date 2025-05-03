import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/**/*.ts",
  out: "./migrations",

  dialect: "postgresql",

  /* single place that works for both generate & push */
  dbCredentials: {
    url: process.env.DATABASE_URL!,   // ← your Supabase URI
  },
} satisfies Config;
