import React from 'react';
import ProductMobileCard from './ProductMobileCard'; // Path'i projenize göre güncelleyin
import { BaseStatusInfo, Product } from "@/utils/types/Products";

interface ProductMobileCardsProps {
  productList: Product[];
  title: string;
  description: string;
  className?: string;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onApprove?: (product: Product) => void;
  getStatusInfo: (status: number) => BaseStatusInfo;
  getStatusText: (status: number) => string;
}

const ProductMobileCards: React.FC<ProductMobileCardsProps> = ({
  productList,
  title,
  description,
  className = "",
  onEdit,
  onDelete,
  onApprove,
  getStatusInfo,
  getStatusText
}) => {
  if (productList.length === 0) return null;

  return (
    <div className={`mb-8 ${className}`}>
      <div className="mb-4 px-1">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-1">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      <div className="space-y-3">
        {productList.map(product => (
          <ProductMobileCard
            key={product.id}
            product={product}
            title={title}
            onEdit={onEdit}
            onDelete={onDelete}
            onApprove={onApprove}
            getStatusInfo={getStatusInfo}
            getStatusText={getStatusText}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductMobileCards;