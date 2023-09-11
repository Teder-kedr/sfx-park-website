import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  try {
    const allSounds = await prisma.sounds.findMany();
    return allSounds;
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});
