// Prisma client disabled until database migrations are run
// import { PrismaClient } from '@prisma/client';

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClient | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Temporary export to prevent build errors
export const prisma = null as any;
