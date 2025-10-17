import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response("Missing environment variable SANITY_REVALIDATE_SECRET", {
        status: 500,
      });
    }

    if (
      req.headers.get("x-vercel-webhook-secret") !== process.env.SANITY_REVALIDATE_SECRET
    ) {
      return new Response("Invalid signature", { status: 401 });
    }

    revalidatePath(`/`, "layout");

    return NextResponse.json({
      body: null,
      message: `Triggered revalidation for all routes`,
    });
  } catch (err) {
    console.error(err);

    return new Response((err as Error).message, { status: 500 });
  }
}
