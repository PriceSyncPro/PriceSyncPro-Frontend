// components/ui/stepper.tsx
import React from "react";
import { cn } from "@/lib/utils";

interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
    activeStep?: number;
    children: React.ReactNode;
}

interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
    index?: number;
    active?: boolean;
    completed?: boolean;
    isLast?: boolean;
    label?: string;
}

const Stepper = ({
                     activeStep = 0,
                     children,
                     className,
                     ...props
                 }: StepperProps) => {
    const steps = React.Children.toArray(children);

    return (
        <div className={cn("flex w-full", className)} {...props}>
            {steps.map((step, index) => {
                if (React.isValidElement<StepProps>(step)) {
                    return React.cloneElement(step, {
                        index,
                        active: index === activeStep,
                        completed: index < activeStep,
                        isLast: index === steps.length - 1,
                        key: index,
                    } as Partial<StepProps>);
                }
                return step;
            })}
        </div>
    );
};

const Step = ({
                  index = 0,
                  active = false,
                  completed = false,
                  isLast = false,
                  label,
                  className,
                  ...props
              }: StepProps) => {
    return (
        <div
            className={cn(
                "flex flex-1 items-center",
                isLast ? "flex-col" : "flex-col md:flex-row",
                className
            )}
            {...props}
        >
            <div className="flex items-center">
                <div
                    className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-medium",
                        active ? "border-primary bg-primary text-white" :
                            completed ? "border-primary bg-primary text-white" :
                                "border-gray-300 bg-white text-gray-500 dark:border-gray-600 dark:bg-gray-800"
                    )}
                >
                    {completed ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        index + 1
                    )}
                </div>
            </div>

            {label && (
                <div className={cn(
                    "mt-2 text-center text-sm font-medium md:ml-2 md:text-left",
                    active ? "text-primary" :
                        completed ? "text-primary" :
                            "text-gray-500 dark:text-gray-400"
                )}>
                    {label}
                </div>
            )}

            {!isLast && (
                <div className={cn(
                    "hidden h-0.5 flex-1 md:block mx-4",
                    active || completed ? "bg-primary" : "bg-gray-300 dark:bg-gray-600"
                )} />
            )}
        </div>
    );
};

export { Stepper, Step };
export type { StepperProps, StepProps };
