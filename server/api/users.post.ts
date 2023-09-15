import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id, email } = await readBody(event);

  try {
    const newUser = await prisma.users.create({
      data: {
        id,
        email,
        liked: [],
      },
    });

    return { success: true, user: newUser };
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});
