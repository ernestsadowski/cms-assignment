import { cn } from "@/lib/utils";

const Pretitle = ({ className, children }: React.ComponentProps<"p">) => {
  if (!children) return null;

  return <p className={cn("technical text-ink/65", className)}>{children}</p>;
};

export default Pretitle;
