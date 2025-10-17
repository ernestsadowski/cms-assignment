import { defineField } from "sanity";

export default defineField({
  name: "modules",
  description: "Page content",
  type: "array",
  of: [
    { type: "card-list" },
    { type: "custom-html" },
    { type: "hero" },
    { type: "hero.split" },
    { type: "richtext-module" },
    { type: "search-module" },
  ],
  options: {
    insertMenu: {
      views: [
        {
          name: "grid",
          previewImageUrl: (schemaType) => `/admin/thumbnails/${schemaType}.webp`,
        },
        { name: "list" },
      ],
      groups: [
        { name: "hero", of: ["hero", "hero.split"] },
        {
          name: "lists",
          of: ["card-list"],
        },
      ],
    },
  },
});
