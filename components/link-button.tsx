import { buttonVariants, cn } from "@heroui/react";
import Link from "next/link";
import type { ReactNode } from "react";

export function LinkButton({
  children,
  className,
  href,
  size = "md",
  variant = "primary",
}: {
  children: ReactNode;
  className?: string;
  href: string;
  size?: "sm" | "md" | "lg";
  variant?: "danger" | "danger-soft" | "ghost" | "outline" | "primary" | "secondary" | "tertiary";
}) {
  return (
    <Link className={cn(buttonVariants({ size, variant }), className)} href={href}>
      {children}
    </Link>
  );
}
