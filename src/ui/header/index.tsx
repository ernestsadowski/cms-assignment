import Link from "next/link";

import { getHeader, getSite } from "@/sanity/lib/queries";
import { cn } from "@/lib/utils";
import { Img } from "@/ui/Img";
import CTAList from "@/ui/CTAList";

import Wrapper from "./Wrapper";
import Navigation from "./Navigation";
import Toggle from "./Toggle";
import { getLogo } from "./utils/getLogo";

const Header = async () => {
  const [{ logo: logoFallback, title }, { logo: headerLogo, menu, ctas }] =
    await Promise.all([getSite(), getHeader()]);

  const logo = getLogo(logoFallback, headerLogo);

  return (
    <Wrapper className="max-md:header-open:h-screen max-md:overfow-auto sticky top-0 z-10 bg-neutral-800 text-white max-md:border-b-[1px] max-md:border-b-neutral-700">
      <div
        className={cn(
          "mx-auto grid gap-x-4 p-4 max-md:h-full",
          // Mobile: 2-row grid (logo/toggle in row 1, content in row 2 with remaining height)
          "max-md:grid-cols-[1fr_auto] max-md:grid-rows-[auto_1fr] max-md:[grid-template-areas:'logo_toggle'_'content_content']",
          // Desktop: single row grid
          "md:grid-cols-[auto_1fr_auto] md:items-center md:[grid-template-areas:'logo_._content']",
          "flex-nowrap md:min-h-[72px] md:max-w-[1440px] md:px-6 md:py-4 lg:px-16",
        )}
      >
        {/* Logo section */}
        <div className="flex items-center [grid-area:logo] md:w-20">
          <Link
            className={cn("h4 md:h3 flex items-center", logo && "max-w-3xs")}
            href="/"
          >
            {logo ? (
              <Img
                className="inline-block max-h-[1.2em] w-auto md:max-h-9"
                image={logo}
                alt={title || "Logo"}
              />
            ) : (
              <span>{title}</span>
            )}
          </Link>
        </div>

        <label className="[grid-area:toggle] md:hidden">
          <Toggle />
        </label>

        <div className="[grid-area:content] max-md:flex max-md:h-full max-md:flex-col md:flex md:items-center md:justify-end md:gap-8">
          <nav className="max-md:header-closed:hidden max-md:p-6 max-md:pb-10 md:flex md:items-center">
            <Navigation headerMenu={menu} />
          </nav>

          <CTAList
            ctas={ctas}
            className="max-md:header-closed:hidden max-md:mt-auto max-md:pb-10 max-md:*:w-full md:flex md:flex-nowrap md:items-center"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Header;
