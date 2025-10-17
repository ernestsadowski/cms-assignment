import type { Metadata } from "next";

import resolveUrl from "./resolveUrl";
import { BASE_URL, vercelPreview } from "./env";

export default async function processMetadata(
  page: Sanity.PageBase & {
    translations?: {
      slug: string;
      language?: string;
    }[];
  },
  defaultSeo?: Sanity.Site["seo"],
): Promise<Metadata> {
  const url = resolveUrl(page);
  const { title, description, image, noIndex } = page.metadata;

  return {
    metadataBase: new URL(BASE_URL),
    title: {
      template: `%s | ${title}`,
      default: defaultSeo?.title || "Nexity",
    },
    description: description || defaultSeo?.description,
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images:
        image?.url ||
        `${BASE_URL}/api/og?title=${encodeURIComponent(defaultSeo?.title || title || "")}`,
    },
    robots: {
      index: noIndex || vercelPreview ? false : undefined,
    },
    alternates: {
      canonical: url,
      languages: {},
    },
  };
}
