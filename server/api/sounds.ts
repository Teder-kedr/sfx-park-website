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

    const ITEMS_PER_PAGE = 8;

    const searchField = query.s?.toString();
    const tags = query.t?.toString().split("|");
    const pageQuery = query.p;
    const sortByQuery = query.sort?.toString();

    let lengthOrder: "desc" | "asc" | undefined;
    if (sortByQuery === "shortest") {
      lengthOrder = "asc";
    } else if (sortByQuery === "longest") {
      lengthOrder = "desc";
    }

    const viewsOrder: "desc" | undefined = lengthOrder ? undefined : "desc";

    const result = await prisma.sounds.findMany({
      where: {
        OR: !searchField
          ? undefined
          : [
              {
                title: {
                  contains: searchField,
                  mode: "insensitive",
                },
              },
              {
                tags: {
                  has: searchField.toLowerCase(),
                },
              },
            ],
        tags: !tags
          ? undefined
          : {
              hasEvery: tags,
            },
      },
      orderBy: {
        views: viewsOrder,
        duration: lengthOrder,
      },
      take: ITEMS_PER_PAGE,
      skip: !pageQuery ? undefined : (parseInt(pageQuery.toString()) - 1) * ITEMS_PER_PAGE,
    });

    return result;
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});
