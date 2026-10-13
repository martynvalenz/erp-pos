import type { ComponentProps, ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const IconButton = ({
  label,
  children,
  className,
  ...props
}: {
  label: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Button>, "children" | "aria-label">) => {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      aria-label={label}
      title={label}
      className={className}
      {...props}
    >
      {children}
    </Button>
  );
};
