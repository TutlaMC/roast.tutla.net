import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, secret } = body;

    if (secret !== process.env.SECRET) {
      return new Response(JSON.stringify({ error: "Invalid secret" }), { status: 401 });
    }

    const roastRequest = await prisma.requestedRoast.findUnique({ where: { id } });
    if (!roastRequest) {
      return new Response(JSON.stringify({ error: "Requested roast not found" }), { status: 404 });
    }

    await prisma.requestedRoast.delete({ where: { id } });

    return new Response(JSON.stringify({ message: "Rejected successfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
