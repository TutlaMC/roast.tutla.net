import { prisma } from "@/lib/prisma"
import { NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const idParam = searchParams.get("id")
    if (!idParam) {
      return new Response(JSON.stringify({ error: "No id provided!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const id = parseInt(idParam)
    if (isNaN(id)) {
      return new Response(JSON.stringify({ error: "Invalid id format!" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const roast = await prisma.roast.findUnique({
      where: { id },
      include: { taggedRoasts: true, taggedBy: true },
    })
    console.log(roast);

    if (!roast) {
      return new Response(JSON.stringify({ error: "Roast not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      })
    }

    return new Response(JSON.stringify(roast), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    })
  }
}
