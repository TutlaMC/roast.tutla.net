import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, secret } = body;

    if (secret !== process.env.SECRET) {
      return new Response(JSON.stringify({ error: "Invalid secret" }), { status: 401 });
    }

    const roastRequest = await prisma.requestedRoast.findUnique({
      where: { id },
      include: { taggedRoasts: true },
    });
    if (!roastRequest) {
      return new Response(JSON.stringify({ error: "Requested roast not found" }), { status: 404 });
    }

    console.log("neq req cret ", roastRequest)
    const newRoast = await prisma.roast.create({
      data: {
        content: roastRequest.content,
        description: roastRequest.description,
        authorName: roastRequest.authorName,
        taggedRoasts: {
          connect: roastRequest.taggedRoasts.map(r => ({ id: r.id })),
        },
      },
    });
    console.log("new roast ", newRoast)

    await prisma.requestedRoast.delete({ where: { id } });

    return new Response(JSON.stringify(newRoast), { status: 201 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
