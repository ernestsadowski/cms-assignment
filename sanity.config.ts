import { defineConfig } from "sanity";
import { simplerColorInput } from "sanity-plugin-simpler-color-input";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";

import { projectId, dataset, apiVersion } from "@/sanity/lib/env";
import resolveUrl from "@/lib/resolveUrl";

import { schemaTypes } from "./src/sanity/schemaTypes";
import { presentation } from "./src/sanity/presentation";
import { structure } from "./src/sanity/structure";

const singletonTypes = ["site", "header", "footer"];

export default defineConfig({
  title: "Nexity",
  projectId,
  dataset,
  basePath: "/admin",

  plugins: [
    structure,
    presentation,
    visionTool({ defaultApiVersion: apiVersion }),
    codeInput(),
    simplerColorInput({
      // Note: These are all optional
      defaultColorFormat: "rgba",
      defaultColorList: [
        { label: "White", value: "#ffffff" },
        { label: "Foreground", value: "#0B446F" },
        { label: "Muted Foreground", value: "#055186" },
        { label: "Secondary Foreground", value: "#B9E2FE" },
        { label: "Custom...", value: "custom" },
      ],
      enableSearch: true,
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.includes(schemaType)),
  },
  document: {
    productionUrl: async (prev, { document }) => {
      if (["page"].includes(document?._type)) {
        return resolveUrl(document as Sanity.PageBase, { base: true });
      }

      return prev;
    },
  },
});
