import { PortableText, type PortableTextProps } from "next-sanity";
import { useMemo } from "react";
import clsx from "clsx";

import { cn } from "@/lib/utils";
import CustomHTML from "@/ui/modules/CustomHTML";
import CTA from "@/ui/CTA";

import AnchoredHeading from "./AnchoredHeading";
import Image from "./Image";
import Code from "./Code";

const Content = ({
  value: propsValue,
  className,
  children: propsChildren,
}: { value: any } & React.ComponentProps<"div">) => {
  const components: PortableTextProps["components"] = useMemo(
    () => ({
      marks: {
        link: ({ children, value }) => (
          <CTA link={value} style="link" className="underline transition-all">
            {children}
          </CTA>
        ),
        sub: ({ children }) => <sub>{children}</sub>,
        sup: ({ children }) => <sup>{children}</sup>,
        simplerColor: ({ value, children }) => (
          <span style={{ color: (value as { value: string }).value }}>{children}</span>
        ),
        left: ({ children }) => <span className="block text-left">{children}</span>,
        center: ({ children }) => <span className="block text-center">{children}</span>,
        right: ({ children }) => <span className="block text-right">{children}</span>,
      },
      list: {
        bullet: ({ children }) => (
          <ul className={clsx("mt-4 ml-[20px] list-disc text-sm")}>{children}</ul>
        ),
        number: ({ children }) => (
          <ol className={clsx("mt-4 ml-[20px] list-decimal text-sm")}>{children}</ol>
        ),
        checkmarks: ({ children }) => (
          <ol className={clsx("m-auto list-none text-sm")}>{children}</ol>
        ),
      },
      listItem: {
        bullet: ({ children }) => <li style={{ listStyleType: "disc" }}>{children}</li>,
        number: ({ children }) => (
          <li style={{ listStyleType: "decimal" }}>{children}</li>
        ),
      },
      block: {
        normal: ({ children }) => <p className={clsx("body-1")}>{children}</p>,
        "body-1": ({ children }) => <p className={clsx("body-1")}>{children}</p>,
        "body-2": ({ children }) => <p className={clsx("body-2")}>{children}</p>,
        "body-3": ({ children }) => <p className={clsx("body-3")}>{children}</p>,
        "body-4": ({ children }) => <p className={clsx("body-4")}>{children}</p>,
        "body-5": ({ children }) => <p className={clsx("body-5")}>{children}</p>,
        strong: ({ children }) => <strong className="font-medium">{children}</strong>,
        h1: (node) => <AnchoredHeading as="h1" className={clsx("heading-1")} {...node} />,
        h2: (node) => <AnchoredHeading as="h2" className={clsx("heading-2")} {...node} />,
        h3: (node) => <AnchoredHeading as="h3" className={clsx("heading-3")} {...node} />,
        h4: (node) => <AnchoredHeading as="h4" className={clsx("heading-4")} {...node} />,
        h5: (node) => <AnchoredHeading as="h5" className={clsx("heading-5")} {...node} />,
        h6: (node) => <AnchoredHeading as="h6" className={clsx("heading-6")} {...node} />,
      },
      types: {
        image: Image,
        code: Code,
        "custom-html": ({ value }) => (
          <CustomHTML
            className="has-[table]:md:[grid-column:bleed] has-[table]:md:mx-auto"
            {...value}
          />
        ),
      },
    }),
    [],
  );

  return (
    <div
      className={cn(
        "richtext mx-auto w-full space-y-1 [&>:first-child]:!mt-0",
        className,
      )}
    >
      <PortableText value={propsValue} components={components} />

      {propsChildren}
    </div>
  );
};

export default Content;
