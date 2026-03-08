const { PrismaClient } = require('@prisma/client')

// Prisma v7 requires either an adapter or accelerateUrl when constructing the client
// in "client" engine mode. Provide a simple adapter object that points to the
// direct database URL (DIRECT_URL) or pooled DATABASE_URL as a fallback.
// Standard PrismaClient initialization (v4-compatible). When using Prisma v4,
// `new PrismaClient()` will read the datasource configuration from prisma.config.ts
// or environment variables.
const prisma = new PrismaClient()

module.exports = prisma