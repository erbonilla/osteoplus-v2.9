"use client";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex min-w-12 cursor-pointer items-center justify-center gap-2 rounded-button font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-focus disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-bg-tertiary disabled:text-text-tertiary",
  {
    variants: {
      variant: {
        primary:
          "bg-brand-primary osteoplus-on-brand hover:bg-brand-primary-hover active:bg-brand-primary-active",
        secondary:
          "border border-border-default bg-surface-card text-text-primary hover:bg-bg-secondary active:bg-bg-tertiary",
        outline:
          "border border-border-brand bg-transparent text-brand-primary hover:bg-bg-brand-subtle active:bg-bg-tertiary",
        ghost: "bg-transparent text-text-primary hover:bg-bg-secondary active:bg-bg-tertiary",
        accent:
          "bg-accent-default osteoplus-on-brand hover:bg-accent-hover active:bg-accent-active",
      },
      size: {
        sm: "min-h-10 px-4 [font-size:0.875rem]",
        md: "min-h-12 px-5 [font-size:1rem]",
        lg: "min-h-14 px-6 [font-size:1rem]",
        icon: "h-12 w-12 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

export function Button({ asChild, className, size, variant, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
