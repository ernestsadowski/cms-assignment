import type { PortableTextBlock, PortableTextComponentProps } from "next-sanity";
import clsx from "clsx";

import { slug } from "@/lib/utils";

const AnchoredHeading = ({
  as: Tag,
  children,
  value,
  className,
}: {
  as: React.ElementType;
  className?: string;
} & PortableTextComponentProps<PortableTextBlock>) => {
  const id = slug(value.children.reduce((acc, { text }) => acc + text, ""));

  return (
    <Tag id={id} className={clsx("group", className)}>
      {children}

      <a
        className="anim-fade-to-r ms-2 no-underline! group-target:inline-block md:hidden md:group-hover:inline-block"
        href={`#${id}`}
      >
        <span className="text-ink/25 inline-block">¶</span>
      </a>
    </Tag>
  );
};

export default AnchoredHeading;
