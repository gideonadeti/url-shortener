import { readUrlByShortId, updateUsageCount } from "../../../prisma/db";

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

    await updateUsageCount(url.id);

    const { longUrl } = url;

    return Response.redirect(longUrl);
  } catch (error) {
    console.error(error);

    return Response.json({ error: "An error occurred." }, { status: 500 });
  }
}
