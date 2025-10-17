"use client";

import { type StructureBuilder } from "sanity/structure";
import { useRouter } from "sanity/router";
import { EyeOpenIcon } from "@sanity/icons";
import { type PortableTextTextBlock, type SanityDocument } from "sanity";
import { VscGlobe } from "react-icons/vsc";
import { IconType } from "react-icons/lib";

import { type Metadata } from "@/types/sanity.types";

const parseSlug = (slug: string | undefined) => {
  if (!slug || slug === "index") return "";

  return slug;
};

export const createDocumentListWithPreview = (
  S: StructureBuilder,
  {
    title,
    type,
    icon,
  }: {
    title: string;
    type: string;
    icon: React.ReactNode | IconType;
  },
) => {
  const handleRedirect = (document: {
    displayed: Partial<SanityDocument> & {
      metadata: Metadata;
      title: string | PortableTextTextBlock[];
    };
  }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const router = useRouter();

    const slug = document.displayed.metadata?.slug?.current;

    const id = document.displayed._id;
    const documentType = document.displayed._type;

    if (!slug) {
      return <div>Please set a slug to enable preview</div>;
    }

    const url = new URL(`/admin/editor/${documentType}/${id}`, window.location.origin);

    url.searchParams.append("preview", parseSlug(slug));
    router.navigateUrl({ path: url.toString() });

    return <div>Opening a Visual Editor... Please wait...</div>;
  };

  const handleRedirectOutside = (document: {
    displayed: Partial<SanityDocument> & {
      metadata: Metadata;
      title: string | PortableTextTextBlock[];
    };
  }) => {
    const slug = document.displayed.metadata?.slug?.current;

    if (!slug) {
      return <div>Please set a slug to enable preview [Metadata -&gt; Slug]</div>;
    }

    window.open(`${window.location.origin}/${parseSlug(slug)}`, "_blank");

    return <div>Your page should be opened in a new tab...</div>;
  };

  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.documentTypeList(type)
        .title(title)
        .apiVersion("v2024-10-28")
        .child((documentId) =>
          S.document()
            .documentId(documentId)
            .schemaType(type)
            .views([
              S.view.form(),
              S.view
                .component(({ document }) => handleRedirect(document))
                .title("Open In Visual Editor")
                .icon(EyeOpenIcon),
              S.view
                .component(({ document }) => handleRedirectOutside(document))
                .title("Open In Website")
                .icon(VscGlobe),
            ]),
        ),
    );
};
