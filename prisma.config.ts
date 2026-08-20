import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  // Tells the CLI where your schema file lives
  schema: "apps/docs/prisma/schema.prisma",
  
  // Tells the CLI where migrations should output
  migrations: {
    path: "apps/docs/prisma/migrations",
  },
  
  // Safe environment connection string mapper
  datasource: {
    url: env("DATABASE_URL"),
  },
});
