import type { SanityAssetDocument, SanityDocument } from "next-sanity"
import type * as sanityTypes from "@/types/sanity.types"

declare global {
  namespace Sanity {
    // documents overwrites
    interface Site extends sanityTypes.Site {
      seo: sanityTypes.Site["seo"] & {
        image?: Image
      }
      logo?: Image
    }

    interface Header extends sanityTypes.Header {
      logo?: Image
      menu?: (Link | LinkList)[]
      ctas?: CTA[]
    }

    interface Footer extends sanityTypes.Footer {
      logo?: Image
      social?: Link[]
      navigation?: { links: Link[]; _key: string }[]
      importantLinks?: Link[]
    }

    // pages

    interface PageBase extends SanityDocument {
      title?: string
      metadata: Metadata
      readonly language?: string
    }

    interface Page extends PageBase {
      readonly _type: "page"
      modules?: Module[]
    }

    interface Translation {
      slug: string
      translations?: {
        slug: string
        language: string
      }[]
    }

    interface GlobalModule extends SanityDocument {
      path: string
      excludePaths?: string[]
      modules?: Module[]
    }


    // objects

    interface Code extends sanityTypes.Code {}

    interface CTA extends sanityTypes.Cta {
      link?: Link
    }

    interface CustomHTML extends Module<"custom-html"> {
      className?: string
      html?: {
        code: string
      }
    }

    interface Icon extends sanityTypes.Icon {
      image?: Image
    }

    interface Img extends sanityTypes.Img {
      image?: Image
      responsive?: {
        image: Image
        media: string
      }[]
    }

    interface Image extends SanityAssetDocument {
      alt?: string
      loading?: "lazy" | "eager"
      asset?: NonNullable<sanityTypes.Img["image"]>["asset"];
    }

    interface Link extends Omit<sanityTypes.Link, "internal"> {
      internal?: {
        _type?: string
        title: string
        metadata: Metadata
      }
    }

    interface LinkList extends Omit<sanityTypes.LinkList, "_type"> {
      _type?: string
      link?: Link
      links?: Link[]
    }

    interface Metadata extends sanityTypes.Metadata {
      image?: Image
    }

    interface Module<T = string> {
      _type: T
      _key: string
      options?: {
        hidden?: boolean
        uid?: string
      }
    }
  }
}

export {}
