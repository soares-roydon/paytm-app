import { PrismaClient } from "../generated/prisma/client";
// Import the driver adapter for your specific database (example uses PostgreSQL)
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// console.log(`db/src/index.ts: ${process.env.DATABASE_URL}`)
// console.log("cwd:", process.cwd());

// Initialize the adapter according to your driver's requirements
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
// Pass the adapter instance to PrismaClient
const prisma = new PrismaClient({ adapter });

export { prisma };
