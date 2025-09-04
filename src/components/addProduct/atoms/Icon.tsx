import React from 'react';
import { LucideIcon } from 'lucide-react';

type IconSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

interface IconProps {
    icon: LucideIcon;
    size?: IconSize;
    className?: string;
    [key: string]: unknown;
}

export const Icon: React.FC<IconProps> = ({
                                              icon: IconComponent,
                                              size = "md",
                                              className = "",
                                              ...props
                                          }) => {
    const sizeClasses: Record<IconSize, string> = {
        sm: "h-4 w-4",
        md: "h-5 w-5",
        lg: "h-6 w-6",
        xl: "h-8 w-8",
        "2xl": "h-12 w-12"
    };

    return <IconComponent className={`${sizeClasses[size]} ${className}`} {...props} />;
};
