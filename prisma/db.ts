import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export async function createUrl(
  longUrl: string,
  shortUrl: string,
  shortId: string
) {
  try {
    const response = await prismaClient.url.create({
      data: {
        longUrl,
        shortUrl,
        shortId,
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

export async function readUrlByShortId(shortId: string) {
  try {
    const url = await prismaClient.url.findFirst({
      where: {
        shortId,
      },
    });

    return url;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateUrl(id: string, longUrl: string) {
  try {
    await prismaClient.url.update({
      where: {
        id,
      },
      data: {
        longUrl,
      },
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
