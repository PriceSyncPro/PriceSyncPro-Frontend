import React from "react";
import { Button } from "@/components/ui/button";
import { Icon } from "../atoms/Icon";
import { X, Package } from "lucide-react";
import { Product } from "../types/types";

interface ProductItemProps {
    product: Product;
    onRemove: () => void;
}

export const ProductItem: React.FC<ProductItemProps> = ({ product, onRemove }) => {
    return (
        <div className="group flex items-center p-3.5 border rounded-lg bg-white hover:bg-blue-50 transition-all duration-200 shadow-sm hover:shadow mb-2.5">
            <div className="flex-shrink-0 w-10 h-10 mr-3 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Package className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                    {product.name}
                </p>
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="ml-2 text-gray-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
            >
                <Icon icon={X} size="sm"/>
            </Button>
        </div>
    );
};