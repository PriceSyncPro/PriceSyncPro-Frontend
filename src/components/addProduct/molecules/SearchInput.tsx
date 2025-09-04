import React, { ChangeEvent, KeyboardEvent } from "react";
import { Icon } from "../atoms/Icon";
import { Search, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    placeholder: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
                                                            value,
                                                            onChange,
                                                            onSubmit,
                                                            placeholder
                                                        }) => {
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div className="flex items-center gap-2">
            <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Icon icon={Search} className="text-gray-400" />
                </div>
                <input
                    type="text"
                    className="w-full h-10 p-2 pl-10 border rounded-md"
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                />
            </div>
            <Button
                className="h-10 flex items-center"
                disabled={!value.trim()}
                onClick={onSubmit}
            >
                <Icon icon={Plus} className="mr-1" /> Ekle
            </Button>
        </div>
    );
};