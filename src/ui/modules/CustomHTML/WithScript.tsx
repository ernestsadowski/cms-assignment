"use client";

import { type ComponentProps, useEffect, useRef, useState } from "react";

import moduleProps from "@/lib/moduleProps";

/**
 * @description If the code includes a <script> tag, ensure the script is re-run on each render
 */
const WithScript = ({
  code,
  className,
  ...props
}: Sanity.CustomHTML["html"] & Sanity.Module & ComponentProps<"section">) => {
  const ref = useRef<HTMLElement>(null);
  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
    } else {
      const parsed = document.createRange().createContextualFragment(code);

      ref.current?.appendChild(parsed);
    }
  }, [code, firstRender]);

  if (!code) return null;

  return <section ref={ref} className={className} {...moduleProps(props)} />;
};

export default WithScript;
