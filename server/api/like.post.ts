import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { uid, liked } = await readBody(event);
    let likedArray: string[];
    if (liked) {
      likedArray = liked.split("|");
    } else {
      likedArray = [];
    }

    await prisma.users.update({
      where: {
        id: uid,
      },
      data: {
        liked: likedArray,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});
