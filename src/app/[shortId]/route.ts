import { redirect } from "next/navigation";

import { readUrlByShortId } from "../../../prisma/db";

export async function GET(
  req: Request,
  { params }: { params: { shortId: string } }
) {
  const shortId = params.shortId;

  try {
    const url = await readUrlByShortId(shortId);

    if (!url) {
      return new Response("Invalid short URL.", { status: 404 });
    }

    const { longUrl } = url;

    redirect(longUrl);
  } catch (error) {
    console.error(error);
    new Response("Internal Server Error", { status: 500 });
  }
}
