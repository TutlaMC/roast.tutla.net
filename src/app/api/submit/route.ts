import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.content || !body.authorName) {
      return new Response(JSON.stringify({ error: "Missing content or authorName" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data: any = {
      content: body.content,
      description: body.description || null,
      authorName: body.authorName,
    };
    if (Array.isArray(body.taggedRoastIds) && body.taggedRoastIds.length > 0) {
      data.taggedRoasts = {
        connect: body.taggedRoastIds.map((id: number) => ({ id })),
      };
    }

    const newRoast = await prisma.requestedRoast.create({ data });
    console.log(newRoast)
    return new Response(JSON.stringify(newRoast), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
