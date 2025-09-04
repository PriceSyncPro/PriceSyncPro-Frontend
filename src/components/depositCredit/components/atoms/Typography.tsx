import React from "react";
import { cn } from "../../utils/cn";

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "title" | "subtitle" | "body" | "small" | "muted";
  component?: React.ElementType;
}

export const Typography: React.FC<TypographyProps> = ({
  variant = "body",
  component,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    title: "text-2xl font-bold text-gray-800 dark:text-white/90",
    subtitle: "text-xl font-semibold text-gray-800 dark:text-white/90",
    body: "text-base text-gray-700 dark:text-gray-300",
    small: "text-sm text-gray-600 dark:text-gray-400",
    muted: "text-sm text-gray-500 dark:text-gray-500",
  };

  const Component = component || {
    title: "h2",
    subtitle: "h3",
    body: "p",
    small: "p",
    muted: "p",
  }[variant];

  return (
    <Component className={cn(variantClasses[variant], className)} {...props}>
      {children}
    </Component>
  );
};
