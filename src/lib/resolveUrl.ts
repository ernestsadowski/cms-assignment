import { stegaClean } from "next-sanity";

export default function resolveUrl(
  page?: { _type?: string; metadata?: { slug?: { current?: string } } },
  {
    base = true,
    params,
  }: {
    base?: boolean;
    params?: string;
    language?: string;
  } = {},
) {
  const segment = "/";
  const slug = page?.metadata?.slug?.current;
  const path = slug === "index" ? null : slug;

  return [base && process.env.NEXT_PUBLIC_BASE_URL, segment, path, stegaClean(params)]
    .filter(Boolean)
    .join("");
}

export const ensureLeadingSlash = (path: string): string =>
  path.startsWith("/") ? path : `/${path}`;
