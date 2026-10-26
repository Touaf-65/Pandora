import type { ComponentProps } from "react";

/** Glass panel, the base surface for content blocks. */
export function Card({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`glass rounded-card p-5 ${className}`} {...props} />;
}
