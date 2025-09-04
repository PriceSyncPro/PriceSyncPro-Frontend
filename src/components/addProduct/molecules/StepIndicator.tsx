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
    return (
        <div className="flex items-center justify-between w-full mb-10">
            {steps.map((step, index) => {
                // currentStep===1 ise, yalnızca index 0 ve 1 aktif, diğerleri pasif.
                const isActive =
                    currentStep === 1 ? index <= 1 : index <= currentStep;
                return (
                    <React.Fragment key={step.id}>
                        <div className="flex flex-col items-center">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                                    isActive ? (currentStep === 1 ? "bg-blue-500 text-white" : `${activeColor} text-white`) : "bg-gray-200 text-gray-500"
                                }`}
                            >
                                {index + 1}
                            </div>
                            <Typography
                                variant="small"
                                className={`mt-2 transition-all duration-500 ${
                                    isActive
                                        ? currentStep === 1
                                            ? "text-blue-500 font-medium"
                                            : "text-primary font-medium"
                                        : "text-gray-500"
                                }`}
                            >
                                {step.title}
                            </Typography>
                        </div>
                        {index < steps.length - 1 && (
                            <div
                                className={`h-1 flex-1 mx-4 transition-all duration-500 ${
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