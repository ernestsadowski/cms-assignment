import { defineField, defineType } from "sanity";

import CharacterCount from "@/sanity/ui/CharacterCount";
import PreviewOG from "@/sanity/ui/PreviewOG";

export default defineType({
  name: "site",
  title: "Site settings",
  type: "document",
  groups: [{ name: "branding", default: true }, { name: "seo" }],
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "branding",
    }),
    defineField({
      name: "logo",
      type: "image",
      group: "branding",
    }),
    defineField({
      name: "seo",
      title: "Default Metadata",
      description: "Metadata used for all pages (can be overridden on a per-page basis)",
      type: "object",
      group: "seo",
      fields: [
        defineField({
          name: "title",
          type: "string",
          validation: (Rule) => Rule.max(60).warning(),
          components: {
            input: (props) => (
              <CharacterCount max={60} {...props}>
                <PreviewOG title={props.elementProps.value} />
              </CharacterCount>
            ),
          },
        }),
        defineField({
          name: "description",
          type: "text",
          validation: (Rule) => Rule.max(160).warning(),
          components: {
            input: (props) => <CharacterCount as="textarea" max={160} {...props} />,
          },
        }),
        defineField({
          name: "image",
          description: "Used for social sharing previews",
          type: "image",
          options: {
            hotspot: true,
            metadata: ["lqip"],
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Site settings",
    }),
  },
});
