import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, secret } = body;

    if (secret !== process.env.SECRET) {
      return new Response(JSON.stringify({ error: "Invalid secret" }), { status: 401 });
    }

    const roast = await prisma.roast.findUnique({ where: { id } });
    if (!roast) {
      return new Response(JSON.stringify({ error: "Roast not found" }), { status: 404 });
    }

    await prisma.roast.delete({ where: { id } });

    return new Response(JSON.stringify({ message: "Deleted successfully" }), { status: 200 });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}