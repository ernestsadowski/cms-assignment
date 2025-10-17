import { cn } from "@/lib/utils";

import CTA from "./CTA";

const CTAList = ({
  ctas,
  className,
}: {
  ctas?: Sanity.CTA[];
} & React.ComponentProps<"div">) => {
  if (!ctas?.length) return null;

  return (
    <div className={cn("flex flex-wrap items-center gap-[.5em] md:gap-4", className)}>
      {ctas?.map((cta, key) =>
        cta.link ? (
          <CTA className="max-sm:w-full" {...cta} link={cta.link} key={key} />
        ) : null,
      )}
    </div>
  );
};

export default CTAList;
