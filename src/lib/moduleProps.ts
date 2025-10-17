import { stegaClean } from "next-sanity";

import { dev } from "./env";

export default function moduleProps({
  _type,
  options,
  _key,
  ...props
}: Partial<Sanity.Module>) {
  return {
    id: stegaClean(options?.uid) || "module-" + _key,
    "data-module": _type,
    hidden: !dev && options?.hidden,
    ...props,
    "data-sanity": undefined, // We overwrite that as modules doesn't have their own field in sanity and they are not selectable by visual editor
  };
}
