import Link from "next/link";
import { stegaClean } from "next-sanity";
import type { ComponentProps } from "react";

import resolveUrl from "@/lib/resolveUrl";
import { cn } from "@/lib/utils";

const variants = {
  primary: "bg-primary text-primary-foreground hover:bg-primary/70",
  secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
  accent: "bg-muted text-muted-foreground hover:bg-muted/70",
  outline:
    "border border-current text-current hover:border-white hover:bg-white hover:text-black",
  ghost: "bg-transparent text-current hover:bg-primary hover:text-primary-foreground",
  link: "text-current hover:text-current/40",
};

const CTA = ({
  link,
  style,
  className,
  children,
  ...rest
}: Omit<Sanity.CTA, "_type"> & { link: Sanity.Link } & ComponentProps<"a">) => {
  const props = {
    className:
      cn(
        variants[stegaClean(style) as keyof typeof variants],
        "btn transition-colors font-medium text-center",
        stegaClean(style) !== "link" && "py-3 px-6",
        className,
      ) || undefined,
    children: children || link?.label || link?.internal?.title || link?.external,
    ...rest,
  };

  if (link?.type === "internal" && link.internal)
    return (
      <Link
        href={resolveUrl(link.internal, {
          base: false,
          params: link.params,
        })}
        {...props}
      />
    );

  if (link?.type === "external" && link.external)
    return <a href={stegaClean(link.external)} target="_blank" {...props} />;

  return <div {...(props as ComponentProps<"div">)} />;
};

export default CTA;
