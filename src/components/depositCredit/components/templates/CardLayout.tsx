import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";

interface CardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  headerBackground?: string;
  headerTextColor?: string;
  className?: string;
  footerContent?: React.ReactNode;
  footerClassName?: string;
}

export const CardLayout: React.FC<CardLayoutProps> = ({
  children,
  title,
  description,
  icon,
  headerBackground = "bg-gradient-to-r from-emerald-600 to-green-500",
  headerTextColor = "text-white",
  className = "",
  footerContent,
  footerClassName = "bg-green-50 dark:bg-green-900/10 border-t border-green-100 dark:border-green-900/30",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={`border-green-200 dark:border-green-900/40 shadow-md overflow-hidden ${className}`}>
        {title && (
          <CardHeader className={`${headerBackground} ${headerTextColor}`}>
            <CardTitle className="flex items-center">
              {icon && <span className="mr-2">{icon}</span>}
              {title}
            </CardTitle>
            {description && (
              <CardDescription className="text-green-100">
                {description}
              </CardDescription>
            )}
          </CardHeader>
        )}

        <CardContent className="pt-6">
          {children}
        </CardContent>

        {footerContent && (
          <CardFooter className={`py-4 ${footerClassName}`}>
            {footerContent}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
};
