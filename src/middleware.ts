import { NextResponse, type MiddlewareConfig } from "next/server";

import { checkIfResponseIsValid } from "./lib/errors";

export default async function middleware() {
  if (checkIfResponseIsValid()) {
    return new NextResponse("Something went wrong", {
      status: 500,
      statusText: "Internal Server Error",
    });
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: ["/((?!favicon.ico|_next|api|admin).*)"],
};
