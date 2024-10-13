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

    return new Response(JSON.stringify(longUrl), { status: 200 });
  } catch (error) {
    console.error(error);
    new Response("Internal Server Error", { status: 500 });
  }
}
