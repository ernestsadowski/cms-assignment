import React from "react";

const RawTextRenderer = ({
  children,
  value,
  ..._props
}: {
  children: React.ReactNode;
  value: string;
}) => <div className={value}>{children}</div>;

export default RawTextRenderer;

export const HEADING_STYLES = [
  { title: "Heading 1 (54px)", value: "heading-1", component: RawTextRenderer },
  { title: "Heading 2 (46px)", value: "heading-2", component: RawTextRenderer },
  { title: "Heading 3 (40px)", value: "heading-3", component: RawTextRenderer },
  { title: "Heading 4 (32px)", value: "heading-4", component: RawTextRenderer },
  { title: "Heading 5 (24px)", value: "heading-5", component: RawTextRenderer },
  { title: "Heading 6 (18px)", value: "heading-6", component: RawTextRenderer },
];

export const PARAGRAPH_STYLES = [
  { title: "Text Large (20px)", value: "body-1", component: RawTextRenderer },
  { title: "Text Medium (18px)", value: "body-2", component: RawTextRenderer },
  { title: "Text Normal (16px)", value: "body-3", component: RawTextRenderer },
  { title: "Text Small (14px)", value: "body-4", component: RawTextRenderer },
  { title: "Text Tiny (12px)", value: "body-5", component: RawTextRenderer },
];
