import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

type ButtonVariant = "solid" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 font-mono uppercase tracking-widest transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-acid focus-visible:outline-offset-2";

const variants: Record<ButtonVariant, string> = {
  solid: "bg-acid text-ink hover:bg-acid-soft",
  ghost: "text-bone hover:text-acid",
  outline: "border border-bone/30 text-bone hover:border-acid hover:text-acid",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-[10px]",
  md: "h-11 px-5 text-xs",
  lg: "h-14 px-8 text-sm",
};

export function Button({
  className,
  variant = "solid",
  size = "md",
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  );
}

type LinkButtonProps = ComponentPropsWithoutRef<"a"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
};

export function LinkButton({
  className,
  variant = "solid",
  size = "md",
  children,
  ...props
}: LinkButtonProps) {
  return (
    <a className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </a>
  );
}
