import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: "narrow" | "default" | "wide" | "full";
};

const sizeMap = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-[1440px]",
  full: "max-w-none",
} as const;

export function Container({ className, size = "default", ...props }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full px-6 lg:px-10", sizeMap[size], className)} {...props} />
  );
}
