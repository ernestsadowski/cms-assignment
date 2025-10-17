"use client";

import React, { FC, PropsWithChildren } from "react";
import NextLink from "next/link";
import { stegaClean } from "next-sanity";

import resolveUrl from "@/lib/resolveUrl";

export interface BaseLinkProps {
  link: Sanity.Link;
  className?: string;
}

export const BaseLink: FC<PropsWithChildren<BaseLinkProps>> = ({
  link,
  children,
  className,
}) => {
  if (link?.type === "internal" && link.internal)
    return (
      <NextLink
        href={resolveUrl(link.internal, {
          base: false,
          params: link.params,
        })}
        className={className}
      >
        {children}
      </NextLink>
    );

  if (link?.type === "external" && link.external) {
    return (
      <a
        href={stegaClean(link.external)}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return children;
};
