"use server";

import { draftMode } from "next/headers";
import { type QueryOptions, type QueryParams } from "next-sanity";

import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";
import { dev } from "@/lib/env";

export async function fetchSanity<T = unknown>({
  query,
  params = {},
  next,
}: {
  query: string;
  params?: Partial<QueryParams>;
  next?: QueryOptions["next"];
}) {
  const preview = dev || (await draftMode()).isEnabled;

  return client.fetch<T>(
    query,
    params,
    preview
      ? {
          stega: true,
          perspective: "drafts",
          useCdn: false,
          token,
          next,
        }
      : {
          perspective: "published",
          useCdn: true,
          next,
        },
  );
}

export async function fetchSanityLive<T = unknown>(
  args: Parameters<typeof fetchSanity>[0],
) {
  const data = await fetchSanity(args);

  return data as T;
}
