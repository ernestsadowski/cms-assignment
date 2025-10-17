import CTA from "@/ui/CTA";

const Menu = async ({
  footerMenu,
}: {
  footerMenu?: { links: Sanity.Link[]; _key: string }[];
}) => (
  <nav className="flex flex-wrap items-start gap-x-12 gap-y-6 text-sm max-md:flex-col max-md:gap-y-10 max-md:py-12 md:ml-auto">
    {footerMenu?.map(({ links, _key }) => (
      <div className="flex min-w-44 flex-col gap-y-2 max-md:w-full" key={_key}>
        {links?.map((item, key) => (
          <CTA
            className="py-2 text-left no-underline"
            link={item}
            key={key}
            style="link"
          />
        ))}
      </div>
    ))}
  </nav>
);

export default Menu;
