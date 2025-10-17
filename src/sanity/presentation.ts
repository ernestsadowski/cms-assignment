"use client";

import { defineDocuments, defineLocations, presentationTool } from "sanity/presentation";
import { groq } from "next-sanity";

export const presentation = presentationTool({
  name: "editor",
  title: "Editor",
  previewUrl: {
    previewMode: {
      enable: "/api/draft-mode/enable",
    },
  },
  resolve: {
    mainDocuments: defineDocuments([
      {
        route: "/:slug",
        filter: groq`_type == 'page' && metadata.slug.current == $slug`,
      },
    ]),
    locations: {
      header: defineLocations({
        message: "Header is used on all pages",
        locations: [
          {
            title: "Home",
            href: "/",
          },
        ],
      }),
      footer: defineLocations({
        message: "Footer is used on all pages",
        locations: [
          {
            title: "Home",
            href: "/",
          },
        ],
      }),
      page: defineLocations({
        select: {
          title: "title",
          metaTitle: "metadata.title",
          slug: "metadata.slug.current",
        },
        resolve: (doc) => ({
          locations: [
            {
              title: doc?.title || doc?.metaTitle || "Untitled",
              href: doc?.slug ? (doc.slug === "index" ? "/" : `/${doc.slug}`) : "/",
            },
          ],
        }),
      }),
    },
  },
});
