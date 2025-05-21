import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_API_URL?.includes("localhost")
    ? "postgresql://postgres:postgres@localhost:5432/linkedin_content_manager"
    : process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Create a Drizzle ORM instance
export const db = drizzle(pool)

// Export the pool for direct queries if needed
export { pool }
