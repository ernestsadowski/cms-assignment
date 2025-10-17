import { VscLoading } from "react-icons/vsc";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const Loading = ({ className, children }: ComponentProps<"div">) => (
  <aside className={cn("flex items-center gap-2", className)}>
    <VscLoading className="animate-spin" />
    {children || "Loading..."}
  </aside>
);

export default Loading;
