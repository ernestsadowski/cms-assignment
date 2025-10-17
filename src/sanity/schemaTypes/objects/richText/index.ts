import { VscColorMode } from "react-icons/vsc";
import { defineArrayMember, defineField } from "sanity";

import { imageBlock } from "../../fragments";

import { COMMON_DECORATORS } from "./decorators";
import { HEADING_STYLES, PARAGRAPH_STYLES } from "./styles";

export default defineField({
  title: "Text",
  name: "richText",
  type: "array",
  of: [
    {
      type: "block",
      name: "block",
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Numbered", value: "number" },
      ],
      marks: {
        decorators: COMMON_DECORATORS,
        annotations: [
          {
            name: "link",
            type: "link",
            description: "Ignore label as it's not used in the editor",
            title: "Link",
          },
          {
            type: "simplerColor",
            title: "Color",
            icon: VscColorMode,
          },
        ],
      },
      styles: [...HEADING_STYLES, ...PARAGRAPH_STYLES],
    },
    imageBlock,
    defineArrayMember({
      title: "Code block",
      type: "code",
      options: {
        withFilename: true,
      },
    }),
    { type: "custom-html" },
  ],
});
