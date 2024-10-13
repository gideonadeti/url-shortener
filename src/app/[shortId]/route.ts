export async function GET(
  req: Request,
  { params }: { params: { shortId: string } }
) {
  const shortId = params.shortId;

  return new Response(JSON.stringify(shortId), { status: 200 });
}
