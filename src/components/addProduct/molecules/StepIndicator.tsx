import React from "react";
import { Typography } from "../atoms/Typography";
import { Step } from "../types/types";

interface StepIndicatorProps {
    steps: Step[];
    currentStep: number;
    activeColor?: string;
}

export const StepIndicator: React.FC<StepIndicatorProps> = ({
                                                                steps,
                                                                currentStep,
                                                                activeColor = "bg-primary",
                                                            }) => {
    // Mobile step titles (shortened versions)
    const getMobileTitle = (title: string, index: number) => {
        const mobileTitles = ["Yöntem", "Bilgiler", "Önizleme", "Tamam"];
        return mobileTitles[index] || title;
    };

    return (
        <div className="flex items-center justify-between w-full mb-6 sm:mb-10">
            {steps.map((step, index) => {
                // currentStep===1 ise, yalnızca index 0 ve 1 aktif, diğerleri pasif.
                const isActive =
                    currentStep === 1 ? index <= 1 : index <= currentStep;
                return (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center min-w-0">
                            <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-500 text-xs sm:text-sm font-medium ${
                                    isActive ? (currentStep === 1 ? "bg-blue-500 text-white" : `${activeColor} text-white`) : "bg-gray-200 text-gray-500"
                                }`}
                            >
                                {index + 1}
                            </div>
                            <Typography
                                variant="small"
                                className={`mt-1 sm:mt-2 transition-all duration-500 text-center text-xs sm:text-sm leading-tight ${
                                    isActive
                                        ? currentStep === 1
                                            ? "text-blue-500 font-medium"
                                            : "text-primary font-medium"
                                        : "text-gray-500"
                                }`}
                            >
                                <span className="block sm:hidden">{getMobileTitle(step.title, index)}</span>
                                <span className="hidden sm:block">{step.title}</span>
                            </Typography>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`h-0.5 sm:h-1 flex-1 mx-1 sm:mx-4 transition-all duration-500 ${
                                    currentStep === 1
                                        ? index < 1
                                            ? "bg-blue-500"
                                            : "bg-gray-200"
                                        : index < currentStep
                                            ? "bg-primary"
                                            : "bg-gray-200"
                                }`}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};
