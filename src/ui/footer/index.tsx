import Link from "next/link";

import Social from "@/ui/Social";
import { getFooter, getSite } from "@/sanity/lib/queries";
import { Img } from "@/ui/Img";
import RichText from "@/ui/modules/RichtextModule/Content";

import CTA from "../CTA";
import { getLogo } from "../header/utils/getLogo";

import Navigation from "./Navigation";

const Footer = async () => {
  const [
    { title, logo: logoFallback },
    { logo: footerLogo, social, navigation, importantLinks, copyright, info },
  ] = await Promise.all([getSite(), getFooter()]);

  const logo = getLogo(logoFallback, footerLogo);

  return (
    <footer className="bg-white text-neutral-800" role="contentinfo">
      <div className="mx-auto flex max-w-screen-xl flex-col p-20 max-md:p-12 max-md:px-5">
        <div className="flex w-full max-md:flex-col md:pb-20">
          <div className="flex flex-col gap-6 self-stretch">
            <Link className="h3 md:h2 max-w-max" href="/">
              {logo ? (
                <Img
                  className="max-h-[1.5em] w-auto"
                  image={logo}
                  alt={title || "Logo"}
                />
              ) : (
                title
              )}
            </Link>

            {info && (
              <div className="max-w-sm text-balance">
                <RichText value={info} className="text-neutral-800" />
              </div>
            )}

            <Social className="mb-auto -ml-2" social={social} />
          </div>

          <Navigation footerMenu={navigation} />
        </div>

        <div className="flex border-t border-neutral-300 pt-8 text-sm max-md:flex-col">
          {copyright && (
            <div className="flex justify-center max-md:order-2 max-md:mt-8">
              <RichText value={copyright} />
            </div>
          )}
          {importantLinks && (
            <div className="flex items-start gap-4 max-md:flex-col max-md:pt-8 md:ml-auto md:items-center">
              {importantLinks.map((link, key) => (
                <CTA key={key} link={link} className="p-1 underline" style="link">
                  {link.label}
                </CTA>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
