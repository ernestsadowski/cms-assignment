import { defineField, defineType } from "sanity";
import { TfiLayoutCtaCenter } from "react-icons/tfi";

export default defineType({
  name: "feature-section",
  title: "Feature Section",
  icon: TfiLayoutCtaCenter,
  type: "object",
  groups: [{ name: "content", default: true }, { name: "asset" }, { name: "options" }],
  fieldsets: [
    // { name: "alignment", options: { columns: 2 } },
    { name: "image", options: { columns: 2 } },
  ],
  fields: [
    defineField({
      name: "options",
      title: "Module options",
      type: "module-options",
      group: "options",
    }),
    defineField({
      name: "pretitle",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "title",
      type: "string",
      group: "content",
    }),
    defineField({
      name: "content",
      type: "richText",
      group: "content",
    }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "feature" }],
      group: "content",
    }),
    defineField({
      name: "ctas",
      title: "Call-to-actions",
      type: "array",
      of: [{ type: "cta" }],
      group: "content",
    }),
    defineField({
      name: "overlayOpacity",
      title: "Overlay Opacity",
      type: "number",
      description: "Adjust the transparency of the background overlay",
      validation: (Rule) => Rule.min(0).max(100),
      initialValue: 35,
      group: "asset",
    }),
    defineField({
      name: "assets",
      title: "Assets",
      type: "array",
      of: [{ type: "img" }],
      validation: (Rule) => Rule.max(1),
      group: "asset",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "assets.0.image",
    },
    prepare: ({ title, media }) => ({
      title: title,
      subtitle: "Feature Section",
      media,
    }),
  },
});
