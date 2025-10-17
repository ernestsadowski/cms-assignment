import { stegaClean } from "next-sanity";
import { Suspense } from "react";
import type { SearchScope } from "./store";

import Pretitle from "@/ui/Pretitle";
import CTAList from "@/ui/CTAList";
import moduleProps from "@/lib/moduleProps";
import RichText from "@/ui/RichText";

import SearchForm from "./SearchForm";

const SearchModule = ({
  pretitle,
  intro,
  ctas,
  scope,
  path,
  ...props
}: Partial<{
  pretitle: string;
  intro: any;
  ctas: Sanity.CTA[];
  scope: SearchScope;
  path: string;
}>) => (
  <section className="section space-y-8" {...moduleProps(props)}>
    {(pretitle || intro) && (
      <header className="richtext text-center">
        <Pretitle>{pretitle}</Pretitle>
        <RichText value={intro} />
      </header>
    )}

    <div className="mx-auto max-w-screen-sm">
      <Suspense fallback={<div className="skeleton-[calc(1lh+.5rem+2px)]" />}>
        <SearchForm scope={stegaClean(scope)} path={stegaClean(path)} />
      </Suspense>
    </div>

    <CTAList className="justify-center" ctas={ctas} />
  </section>
);

export default SearchModule;
