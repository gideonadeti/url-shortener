import { readUrlByShortId, updateUrl, deleteUrl } from "../../../../prisma/db";

export async function GET(
  req: Request,
  { params }: { params: { shortId: string } }
) {
  const shortId = params.shortId;

  try {
    const url = await readUrlByShortId(shortId);

    if (!url) {
      return Response.json({ error: "Invalid short URL." }, { status: 404 });
    }

    return Response.json({ url }, { status: 200 });
  } catch (error) {
    console.error(error);

    return Response.json({ error: "An error occurred." }, { status: 500 });
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
      return Response.json({ error: "Invalid short URL." }, { status: 404 });
    }

    await updateUrl(url.id, longUrl);

    return Response.json(
      { message: "Long URL updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return Response.json({ error: "An error occurred." }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { shortId: string } }
) {
  const shortId = params.shortId;

  try {
    const url = await readUrlByShortId(shortId);

    if (!url) {
      return new Response(JSON.stringify({ error: "Invalid short URL." }), {
        status: 404,
      });
    }

    await deleteUrl(url.id);
    return new Response("URL deleted successfully.", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "An error occurred." }), {
      status: 500,
    });
  }
}
