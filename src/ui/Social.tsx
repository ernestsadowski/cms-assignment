import {
  FaBluesky,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { IoIosLink } from "react-icons/io";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import CTA from "./CTA";

const Icon = ({ url, ...props }: { url?: string } & React.ComponentProps<"svg">) => {
  if (!url) return null;

  return url?.includes("bsky.app") ? (
    <FaBluesky {...props} />
  ) : url?.includes("facebook.com") ? (
    <FaFacebookF {...props} />
  ) : url?.includes("github.com") ? (
    <FaGithub {...props} />
  ) : url?.includes("instagram.com") ? (
    <FaInstagram {...props} />
  ) : url?.includes("linkedin.com") ? (
    <FaLinkedinIn {...props} />
  ) : url?.includes("tiktok.com") ? (
    <FaTiktok {...props} />
  ) : url?.includes("twitter.com") || url?.includes("x.com") ? (
    <FaXTwitter {...props} />
  ) : url?.includes("youtube.com") ? (
    <FaYoutube {...props} />
  ) : (
    <IoIosLink {...props} />
  );
};
const Social = async ({
  social,
  className,
}: {
  social?: Sanity.Link[];
} & ComponentProps<"div">) => {
  if (!social?.length) return null;

  return (
    <nav className={cn("group flex flex-wrap items-center", className)}>
      {social?.map((item, key) => {
        switch (item._type) {
          case "link":
            return (
              <CTA
                className="px-2 py-1 group-has-[a:hover]:opacity-50 hover:!opacity-100"
                link={item}
                key={key}
              >
                <Icon url={item.external} aria-label={item.label} />
              </CTA>
            );

          default:
            return null;
        }
      })}
    </nav>
  );
};

export default Social;
