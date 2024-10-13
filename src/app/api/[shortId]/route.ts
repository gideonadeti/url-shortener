import { readUrlByShortId } from "../../../../prisma/db";

export async function GET(
  req: Request,
  { params }: { params: { shortId: string } }
) {
  const shortId = params.shortId;

  try {
    const url = await readUrlByShortId(shortId);

    if (!url) {
      return new Response(
        JSON.stringify({
          error: "Invalid short URL.",
        }),
        { status: 404 }
      );
    }

    return new Response(JSON.stringify(url), { status: 200 });
  } catch (error) {
    console.error(error);
    throw error;
  }
}
