import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const roasts = await prisma.requestedRoast.findMany({
      include: { taggedRoasts: true },
    });
    return new Response(JSON.stringify(roasts), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
