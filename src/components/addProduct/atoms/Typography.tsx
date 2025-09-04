import React from 'react';

type TypographyVariant = 'title' | 'subtitle' | 'body' | 'caption' | 'small';

interface TypographyProps {
    variant: TypographyVariant;
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
}

export const Typography: React.FC<TypographyProps> = ({
                                                          variant,
                                                          children,
                                                          className = "",
                                                          ...props
                                                      }) => {
    const variantClasses: Record<TypographyVariant, string> = {
        title: "text-title-md font-semibold",
        subtitle: "text-lg text-gray-500",
        body: "text-base",
        caption: "text-sm text-gray-500",
        small: "text-xs"
    };

    return (
        <div className={`${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </div>
    );
};
