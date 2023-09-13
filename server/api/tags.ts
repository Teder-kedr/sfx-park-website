import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (): Promise<string[]> => {
  const sounds = await prisma.sounds.findMany();

  const allTags = new Set();
  sounds.forEach((sound) => {
    sound.tags.forEach((tag) => {
      allTags.add(tag);
    });
  });

  return [...allTags] as string[];
});
