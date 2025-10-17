import { structureTool } from "sanity/structure";
import { VscFiles, VscMenu, VscServerProcess } from "react-icons/vsc";

import { singleton, group } from "@/sanity/lib/utils";

import { createDocumentListWithPreview } from "./lib/structure";

export const GLOBAL_SETTINGS_TYPES = ["header", "footer", "site"];

export const structure = structureTool({
  structure: (S) =>
    S.list()
      .title("Nexity Content")
      .items([
        group(S, "Configuration", [
          singleton(S, "site", "Site settings").icon(VscServerProcess),
          singleton(S, "header", "Header settings").icon(VscMenu),
          singleton(S, "footer", "Footer settings").icon(VscMenu),
          S.documentTypeListItem("redirect").title("Redirects"),
        ]),

        S.divider(),
        createDocumentListWithPreview(S, {
          title: "All Pages",
          type: "page",
          icon: VscFiles,
        }),
        S.documentTypeListItem("global-module").title("Global modules"),
        S.divider(),
      ]),
});
