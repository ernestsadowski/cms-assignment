import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer settings",
  type: "document",
  groups: [
    { name: "details", default: true },
    { name: "navigation" },
    { name: "copyright" },
  ],
  fields: [
    defineField({
      name: "logo",
      type: "image",
      description:
        'Logo displayed in the footer (optional) - it will overwrite the default logo from "site" settings',
      group: "details",
    }),
    defineField({
      name: "info",
      type: "richText",
      description:
        "Content displayed in the footer (likely address and contact information)",
      group: "details",
    }),
    defineField({
      name: "social",
      type: "array",
      description:
        "Social links displayed in the footer (icons will be matched based on urls)",
      of: [{ type: "link" }],
      group: "navigation",
    }),
    defineField({
      name: "navigation",
      type: "array",
      description: "Menu displayed in the footer in columns",
      of: [
        defineField({
          name: "menu",
          type: "object",
          fields: [
            defineField({
              name: "links",
              title: "Menu items",
              type: "array",
              description:
                "Links displayed in the menu in a single column (it's a good practice to have no more then 5 links in a column)",
              of: [{ type: "link" }],
            }),
          ],
          preview: {
            select: {
              links: "links",
            },
            prepare: ({ links }) => ({
              title:
                links?.length > 0 ? `Menu: ${links.length} elements` : "No menu items",
              subtitle: `${links?.map((link: Sanity.Link) => link.label).join(", ")}`,
            }),
          },
        }),
      ],

      group: "navigation",
    }),
    defineField({
      name: "copyright",
      type: "richText",
      description: "Copyright text displayed in the footer",
      group: "copyright",
    }),
    defineField({
      name: "importantLinks",
      type: "array",
      description: "Important links displayed in the footer",
      of: [{ type: "link" }],
      group: "copyright",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Footer settings",
    }),
  },
});
