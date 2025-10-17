import {
  MdFormatAlignCenter,
  MdFormatAlignLeft,
  MdFormatAlignRight,
  MdSuperscript,
  MdSubscript,
  MdTextFields,
} from "react-icons/md";

import {
  Acronym,
  Subscript,
  Superscript,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
} from "./components";

export const COMMON_DECORATORS = [
  { title: "Strong", value: "strong" },
  { title: "Emphasis", value: "em" },
  { title: "Underline", value: "underline" },
  { title: "Strike", value: "strike-through" },
  {
    title: "Subscript",
    value: "sub",
    icon: MdSubscript,
    component: Subscript,
  },
  {
    title: "Superscript",
    value: "sup",
    icon: MdSuperscript,
    component: Superscript,
  },
  {
    title: "Acronym",
    value: "acronym",
    icon: MdTextFields,
    component: Acronym,
  },
  {
    title: "Text left",
    value: "left",
    component: TextAlignLeft,
    icon: MdFormatAlignLeft,
  },
  {
    title: "Text center",
    value: "center",
    component: TextAlignCenter,
    icon: MdFormatAlignCenter,
  },
  {
    title: "Text right",
    value: "right",
    component: TextAlignRight,
    icon: MdFormatAlignRight,
  },
];
