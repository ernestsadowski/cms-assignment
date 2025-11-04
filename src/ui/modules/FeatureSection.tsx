import { cn } from "@/lib/utils";
import moduleProps from "@/lib/moduleProps";
import { ResponsiveImg } from "@/ui/Img";
import CTAList from "@/ui/CTAList";
import Pretitle from "@/ui/Pretitle";
import RichText from "@/ui/RichText";
import FeatureList from "@/ui/FeatureList";

const FeatureSection = ({
  pretitle,
  title,
  content,
  features,
  ctas,
  assets,
  ...props
}: Partial<{
  pretitle: string;
  title: string;
  content: any;
  features: Sanity.Feature[];
  ctas: Sanity.CTA[];
  assets: Sanity.Img[];
}> &
  Sanity.Module) => {
  const hasImage = !!assets?.[0];
  const asset = assets?.[0];

  return (
    <section
      className={cn(hasImage && "bg-ink text-canvas overflow-hidden relative")}
      {...moduleProps(props)}
    >
      {hasImage && (
        <ResponsiveImg
          img={asset}
          className="absolute inset-0 max-h-fold size-full object-cover object-center"
          width={2400}
          draggable={false}
        />
      )}

      {/* Background Overlay */}
      <div className="absolute inset-0 bg-ink opacity-30"></div>

      {content && (
        <div className="section py-16 lg:py-24 xl:py-28 relative grid w-full text-balance lg:grid-cols-2">
          <header>
            <Pretitle className={cn(hasImage && "text-canvas/70")}>{pretitle}</Pretitle>
            <h2
              className={cn(
                "mb-8 text-3xl font-bold leading-tight md:text-4xl",
                hasImage && "text-canvas",
              )}
            >
              {title}
            </h2>
          </header>

          <div>
            <div
              className={cn(
                "mb-8 richtext headings:text-balance relative isolate max-w-xl",
                hasImage && "text-shadow",
              )}
            >
              <RichText value={content} />
            </div>

            <FeatureList features={features} />

            <CTAList ctas={ctas} className={cn("!mt-8")} />
          </div>
        </div>
      )}
    </section>
  );
};

export default FeatureSection;
