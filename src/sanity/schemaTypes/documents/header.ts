import { defineField, defineType } from "sanity";

export default defineType({
  name: "header",
  title: "Header settings",
  type: "document",
  groups: [{ name: "branding", default: true }, { name: "navigation" }],
  fields: [
    defineField({
      name: "logo",
      type: "image",
      description:
        'Logo displayed in the header (optional) - it will overwrite the default logo from "site" settings',
      group: "branding",
    }),
    defineField({
      name: "menu",
      type: "array",
      of: [{ type: "link" }, { type: "link.list" }],
      group: "navigation",
    }),
    defineField({
      name: "ctas",
      title: "Call-to-action",
      description: "Buttons displayed in the header (on the right side)",
      type: "array",
      of: [{ type: "cta" }],
      group: "navigation",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Header settings",
    }),
  },
});
