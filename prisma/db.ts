import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function createUrl(longUrl: string, shortUrl: string) {
  try {
    const response = await prismaClient.url.create({
      data: {
        longUrl,
        shortUrl,
      },
    });

    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function readUrl(longUrl: string = "", shortUrl: string = "") {
  try {
    const url = await prismaClient.url.findFirst({
      where: {
        OR: [{ longUrl }, { shortUrl }],
      },
    });

    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
