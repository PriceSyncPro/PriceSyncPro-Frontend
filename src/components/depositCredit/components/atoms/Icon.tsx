import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "../../utils/cn";

interface IconProps {
  icon: LucideIcon;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export const Icon: React.FC<IconProps> = ({ 
  icon: LucideIcon, 
  size = "md", 
  className,
  ...props 
}) => {
  return <LucideIcon className={cn(sizeMap[size], className)} {...props} />;
};
