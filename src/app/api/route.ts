import { nanoid } from "nanoid";

import { readUrl, createUrl } from "../../../prisma/db";

export async function POST(req: Request) {
  const { longUrl } = await req.json();

  if (!longUrl) {
    return Response.json(
      { error: "Please enter a long URL." },
      { status: 400 }
    );
  } else if (
    !longUrl.startsWith("https://") &&
    !longUrl.startsWith("http://")
  ) {
    return Response.json(
      { error: "Please enter a valid long URL." },
      { status: 400 }
    );
  } else if (longUrl.length < 50) {
    return Response.json(
      { error: "Long URL must be at least 50 characters." },
      { status: 400 }
    );
  }

  try {
    let url = await readUrl(longUrl);

    if (url) {
      const shortUrl = url.shortUrl;

      return Response.json({ shortUrl }, { status: 200 });
    } else {
      const shortId = nanoid(7);
      const shortUrl = `https://${req.headers.get("host")}/${shortId}`;
      url = await createUrl(longUrl, shortUrl, shortId);

      return Response.json({ shortUrl }, { status: 201 });
    }
  } catch (error) {
    console.error(error);

    return Response.json({ error: "An error occurred." }, { status: 500 });
  }
}
