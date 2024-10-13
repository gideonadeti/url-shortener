import { readUrlByShortId, updateUrl } from "../../../../prisma/db";

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

export async function PUT(
  req: Request,
  { params }: { params: { shortId: string } }
) {
  const shortId = params.shortId;
  const { longUrl } = await req.json();

  try {
    const url = await readUrlByShortId(shortId);

    if (!url) {
      return new Response(JSON.stringify({ error: "Invalid short URL." }), {
        status: 404,
      });
    }

    await updateUrl(url.id, longUrl);
    return new Response(JSON.stringify(url), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "An error occurred." }), {
      status: 500,
    });
  }
}
