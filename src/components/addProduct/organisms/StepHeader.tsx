import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "../atoms/Icon";
import { ArrowLeft } from "lucide-react";
import { Typography } from "../atoms/Typography";

interface StepHeaderProps {
    title: string;
    subtitle?: string;
    icon?: string | React.ReactNode;
    color?: string;
    onBack: () => void;
}

export const StepHeader: React.FC<StepHeaderProps> = ({ title, onBack }) => {
    return (
        <div className="flex items-center justify-between">
            <Typography variant="title">{title}</Typography>
            <Button variant="outline" size="sm" onClick={onBack}>
                <Icon icon={ArrowLeft} className="mr-2" size="sm" /> Geri Dön
            </Button>
        </div>
    );
};