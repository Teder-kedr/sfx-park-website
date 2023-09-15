import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const id = query.id?.toString();

  try {
    const user = await prisma.users.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});
