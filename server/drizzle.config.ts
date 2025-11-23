import { defineConfig } from 'drizzle-kit'; // 'defineConfig' provides better type hints
import dotenv from 'dotenv';

dotenv.config();

console.log("Checking DB URL:", process.env.DATABASE_URL);

export default defineConfig({
  schema: './src/db/schema.ts', // We tell Drizzle: "Look here for tables"
  out: './drizzle',              // "Put migration files here"
  dialect: 'postgresql',         // Updated syntax (formerly 'driver: pg')
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});