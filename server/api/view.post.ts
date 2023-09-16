import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  try {
    const { id } = await readBody(event);
    const sound = await prisma.sounds.findUnique({
      where: {
        id,
      },
    });

    if (!sound) throw new Error("Record not found");
    const views = (sound.views += 1);
    await prisma.sounds.update({
      where: {
        id,
      },
      data: {
        views,
      },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
  } finally {
    prisma.$disconnect();
  }
});
