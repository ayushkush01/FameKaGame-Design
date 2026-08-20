import type { ComponentPropsWithoutRef } from "react";

type ItemCardProps = ComponentPropsWithoutRef<"div"> & {
  variant?: "default" | "secondary" | "tertiary" | "outline" | "transparent";
};

const variantClass = {
  default: "bg-transparent",
  outline: "bg-transparent",
  secondary: "bg-transparent",
  tertiary: "bg-transparent",
  transparent: "bg-transparent",
};

export function ItemCard({ className = "", variant = "default", ...props }: ItemCardProps) {
  return (
    <div
      className={`flex items-center gap-3 border-b border-default px-0 py-3 last:border-b-0 ${variantClass[variant]} ${className}`}
      {...props}
    />
  );
}

ItemCard.Icon = function ItemCardIcon({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  void className;
  void props;

  return null;
};

ItemCard.Content = function ItemCardContent({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={`min-w-0 flex-1 ${className}`} {...props} />;
};

ItemCard.Title = function ItemCardTitle({ className = "", ...props }: ComponentPropsWithoutRef<"span">) {
  return <span className={`block truncate text-sm font-medium text-foreground ${className}`} {...props} />;
};

ItemCard.Description = function ItemCardDescription({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"span">) {
  return <span className={`block truncate text-sm text-muted ${className}`} {...props} />;
};

ItemCard.Action = function ItemCardAction({ className = "", ...props }: ComponentPropsWithoutRef<"div">) {
  return <div className={`shrink-0 ${className}`} {...props} />;
};
