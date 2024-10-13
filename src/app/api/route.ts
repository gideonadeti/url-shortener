import { NextRequest } from "next/server";
import { nanoid } from "nanoid";

import { readUrl, createUrl } from "../../../prisma/db";

export async function POST(req: NextRequest) {
  const { longUrl } = await req.json();

  try {
    let url = await readUrl(longUrl);

    if (url) {
      const shortUrl = url.shortUrl;
      return new Response(JSON.stringify(shortUrl), { status: 200 });
    } else {
      const shortId = nanoid(7);
      const shortUrl = `https://${req.headers.get("host")}/${shortId}`;
      url = await createUrl(longUrl, shortUrl, shortId);

      return new Response(JSON.stringify(shortUrl), { status: 201 });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}
