import Pretitle from "@/ui/Pretitle";
import CTAList from "@/ui/CTAList";
import { cn } from "@/lib/utils";
import moduleProps from "@/lib/moduleProps";

import RichText from "../RichText";

import Asset from "./Asset";

const HeroSplit = ({
  pretitle,
  content,
  ctas,
  assets,
  assetOnRight,
  assetBelowContent,
  ...props
}: Partial<{
  pretitle: string;
  content: any;
  ctas: Sanity.CTA[];
  assets: Array<Sanity.Img | Sanity.Code | Sanity.CustomHTML>;
  assetOnRight: boolean;
  assetBelowContent: boolean;
}>) => {
  const asset = assets?.[0];

  return (
    <section
      className="section grid items-center gap-8 md:grid-cols-2 md:gap-x-12"
      {...moduleProps(props)}
    >
      <figure
        className={cn(
          asset?._type === "img" && "max-md:full-bleed",
          assetOnRight && "md:order-1",
          assetBelowContent && "max-md:order-last",
        )}
      >
        <Asset asset={asset} />
      </figure>

      <div className="richtext headings:text-balance mx-auto w-full max-w-lg">
        <Pretitle>{pretitle}</Pretitle>
        <RichText value={content} />
        <CTAList ctas={ctas} className="!mt-6" />
      </div>
    </section>
  );
};

export default HeroSplit;
