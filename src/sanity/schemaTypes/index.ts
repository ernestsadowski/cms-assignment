import { type SchemaTypeDefinition } from "sanity";

// documents
import site from "./documents/site";
import header from "./documents/header";
import footer from "./documents/footer";
import page from "./documents/page";
import globalModule from "./documents/global-module";
import redirect from "./documents/redirect";
// miscellaneous
import logo from "./fragments/logo";
// objects
import cta from "./objects/cta";
import icon from "./objects/icon";
import img from "./objects/img";
import link from "./objects/link";
import linkList from "./objects/link.list";
import metadata from "./objects/metadata";
import moduleOptions from "./objects/module-options";
import richText from "./objects/richText";
// modules
import cardList from "./modules/card-list";
import customHtml from "./modules/custom-html";
import hero from "./modules/hero";
import heroSplit from "./modules/hero.split";
import richtextModule from "./modules/richtext-module";
import searchModule from "./modules/search-module";

export const schemaTypes: SchemaTypeDefinition[] = [
  // documents
  site,
  header,
  footer,
  page,
  globalModule,
  redirect,

  // objects
  cta,
  icon,
  img,
  link,
  linkList,
  logo,
  metadata,
  moduleOptions,
  richText,

  // modules
  cardList,
  customHtml,
  hero,
  heroSplit,
  searchModule,
  richtextModule,
];
