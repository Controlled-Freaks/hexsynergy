
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import React from "react";

const cardVariants = cva("shadow-md transition-all duration-300", {
  variants: {
    variant: {
      default: "bg-card",
      glassmorphic: "glassmorphic",
      highlighted: "border-l-4 border-l-primary",
      interactive: "card-hover cursor-pointer",
    },
    size: {
      sm: "p-2",
      md: "",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface DashboardCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function DashboardCard({
  title,
  description,
  icon,
  variant,
  size,
  children,
  className,
  ...props
}: DashboardCardProps) {
  return (
    <Card className={cn(cardVariants({ variant, size }), className)} {...props}>
      {(title || icon) && (
        <CardHeader className={cn("flex flex-row items-center justify-between space-y-0 pb-2", !description && "pb-4")}>
          {title && <CardTitle className="text-xl font-semibold">{title}</CardTitle>}
          {icon && <div className="text-muted-foreground">{icon}</div>}
        </CardHeader>
      )}
      {description && <p className="px-6 text-sm text-muted-foreground">{description}</p>}
      <CardContent className={cn(title ? "pt-2" : "pt-6")}>{children}</CardContent>
    </Card>
  );
}
