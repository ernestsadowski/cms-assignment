import { PortableText, type PortableTextProps } from "@portabletext/react";
import clsx from "clsx";
import React, { useMemo } from "react";
import { type PortableTextBlock } from "sanity";

import CTA from "../CTA";
import CustomHTML from "../modules/CustomHTML";
import Code from "../modules/RichtextModule/Code";
import Image from "../modules/RichtextModule/Image";

export interface IMyPortableText {
  value: PortableTextBlock[];
  className?: HTMLElement["className"];
}

const RichText: React.FC<IMyPortableText> = ({ value: propsValue, className }) => {
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
        h1: ({ children }) => <h1 className={clsx("heading-1")}>{children}</h1>,
        h2: ({ children }) => <h2 className={clsx("heading-2")}>{children}</h2>,
        h3: ({ children }) => <h3 className={clsx("heading-3")}>{children}</h3>,
        h4: ({ children }) => <h4 className={clsx("heading-4")}>{children}</h4>,
        h5: ({ children }) => <h5 className={clsx("heading-5")}>{children}</h5>,
        h6: ({ children }) => <h6 className={clsx("heading-6")}>{children}</h6>,
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

  if (!propsValue) {
    return null;
  }

  return (
    <div className={clsx("richtext", className)}>
      <PortableText value={propsValue} components={components} />
    </div>
  );
};

export default RichText;
