import CTA from "@/ui/CTA";
import { cn } from "@/lib/utils";

import LinkList from "./LinkList";

const Menu = async ({ headerMenu }: { headerMenu?: Sanity.Header["menu"] }) => {
  const parentClassName = cn("md:px-4 md:text-center md:leading-tight md:text-base ");

  return (
    <nav
      className="max-md:anim-fade-to-r max-md:header-closed:hidden flex gap-y-2 max-md:my-4 max-md:flex-col md:justify-center"
      role="navigation"
    >
      {headerMenu?.map((item, key) => {
        switch (item._type) {
          case "link":
            return (
              <CTA
                className={cn(
                  parentClassName,
                  "max-md:py-2 md:grid md:place-content-center",
                )}
                link={item as unknown as Sanity.Link}
                style="link"
                key={key}
              />
            );

          case "link.list":
            return <LinkList summaryClassName={parentClassName} {...item} key={key} />;

          default:
            return null;
        }
      })}
    </nav>
  );
};

export default Menu;
