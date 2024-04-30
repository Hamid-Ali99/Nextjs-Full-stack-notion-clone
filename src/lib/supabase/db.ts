// Import the necessary dependencies
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as dotenv from "dotenv";
import * as schema from "../../../migrations/schema";
import { migrate } from "drizzle-orm/postgres-js/migrator";

// Load environment variables from the .env file
dotenv.config({ path: ".env" });

// Check if the DATABASE_URL environment variable is set
if (!process.env.DATABASE_URL) {
  console.log("🔴 no database URL");
}

// Create a PostgreSQL client using the DATABASE_URL environment variable
const client = postgres(process.env.DATABASE_URL as string, { max: 1 });

// Create a Drizzle database instance using the PostgreSQL client and the schema
const db = drizzle(client, { schema });

// Define an asynchronous function to migrate the database
// Every time we run the server we need to migrate the database
//  so that we can keep the database up to date with the
//  migrations.
//  This is a one time operation.
//  We can run this script whenever we want.
const migrateDb = async () => {
  try {
    // Log the start of the migration process
    console.log("🟠 Migrating client");

    // Apply the database migrations using the Drizzle migrator
    await migrate(db, { migrationsFolder: "migrations" });

    // Log the successful completion of the migration
    console.log("🟢 Successfully Migrated");
  } catch (error) {
    // Log any errors that occurred during the migration process
    console.log("🔴 Error Migrating client", error);
  }
};

// Call the migrateDb function to apply the database migrations
migrateDb();

// Export the Drizzle database instance for use in other parts of the application
export default db;
