/** @type {import('drizzle-kit').Config} */
module.exports = {
  schema: "./src/db/schema/**/*.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
};