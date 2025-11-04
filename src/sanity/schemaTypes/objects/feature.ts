import { defineField, defineType } from "sanity";

export default defineType({
  name: "feature",
  title: "Feature",
  type: "object",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "icon",
      type: "image",
    }),
  ],
  preview: {
    select: {
      image: "icon",
      name: "name",
      description: "description",
    },
    prepare: ({ name, description, image }) => ({
      title: name,
      subtitle: description,
      media: image,
    }),
  },
});
