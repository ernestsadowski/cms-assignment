import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

type WebhookPayload = { metadata: { slug: { current: string } } };

export async function POST(req: NextRequest) {
  try {
    if (!process.env.SANITY_REVALIDATE_SECRET) {
      return new Response("Missing environment variable SANITY_REVALIDATE_SECRET", {
        status: 500,
      });
    }

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true, // this will delay the revalidation so if we are using useCDN in queries- we will have the fresh data
    );

    if (!isValidSignature) {
      return new Response(
        JSON.stringify({
          message: "Invalid signature",
          isValidSignature,
          body,
        }),
        {
          status: 401,
        },
      );
    } else if (!body?.metadata?.slug?.current) {
      return new Response(JSON.stringify({ message: "Bad Request", body }), {
        status: 400,
      });
    }

    // TODO: add revalidate

    return NextResponse.json({
      body,
      message: `Updated route: ${body.metadata.slug.current}`,
    });
  } catch (err) {
    console.error(err);

    return new Response((err as Error).message, { status: 500 });
  }
}
