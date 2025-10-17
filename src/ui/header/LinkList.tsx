import { CgChevronRight } from "react-icons/cg";

import CTA from "@/ui/CTA";
import { cn } from "@/lib/utils";

import InteractiveDetails from "./InteractiveDetails";

const LinkList = ({
  link,
  links,
  summaryClassName,
}: Sanity.LinkList & { summaryClassName?: string }) => (
  <InteractiveDetails
    className="group relative max-md:text-center"
    name="header"
    delay={10}
    closeAfterNavigate
  >
    <summary
      className={cn(
        summaryClassName,
        "flex h-full cursor-pointer items-center gap-1 max-md:justify-center max-md:py-2",
      )}
    >
      {link?.label}
      <CgChevronRight className="shrink-0 transition-transform group-open:rotate-90 md:rotate-90" />
    </summary>

    <ul className="anim-fade-to-b md:frosted-glass top-full left-0 border-white/10 px-3 py-2 max-md:border-s md:absolute md:min-w-max md:rounded md:border md:bg-neutral-800 md:shadow-md">
      {links?.map((listLink, key) => (
        <li key={key}>
          <CTA
            className="inline-block px-4 py-2 max-md:w-full max-md:py-2"
            link={listLink}
            style="link"
          />
        </li>
      ))}
    </ul>
  </InteractiveDetails>
);

export default LinkList;
