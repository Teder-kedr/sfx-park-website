import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  try {
    if (query.homepage === "true") {
      const popularSounds = await prisma.sounds.findMany({
        orderBy: {
          views: "desc",
        },
        take: 4,
      });
      return popularSounds;
    }

    const searchField = query.s?.toString();
    const tags = query.t?.toString().split("|");

    const result = await prisma.sounds.findMany({
      where: {
        title: searchField
          ? {
              contains: searchField,
              mode: "insensitive",
            }
          : undefined,
        tags: tags
          ? {
              hasEvery: tags,
            }
          : undefined,
      },
    });
    return result;
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});
