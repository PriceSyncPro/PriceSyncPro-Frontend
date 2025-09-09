import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui//button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { 
  Package, 
  Link2, 
  AlertTriangle, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Zap, 
  Ban, 
  ThumbsUp 
} from 'lucide-react';
import { BaseStatusInfo, Product} from "@/utils/types/Products";



interface ProductMobileCardProps {
  product: Product;
  title: string;
  onEdit: (product: Product) => void;
  onDelete: (id: string ) => void;
  onApprove?: (product: Product) => void;
  getStatusInfo: (status: number) => BaseStatusInfo;
  getStatusText: (status: number) => string;
}

const ProductMobileCard: React.FC<ProductMobileCardProps> = ({
  product,
  title,
  onEdit,
  onDelete,
  onApprove,
  getStatusInfo,
  getStatusText
}) => {
  const statusInfo = getStatusInfo(product.productStatus);
  const statusText = getStatusText(product.productStatus);
  const isAwaitingApproval = product.productStatus === 4;
  const isApproved = product.productStatus === 5;
  const showRemoteName = (isAwaitingApproval || isApproved) && product.remoteName;

  return (
    <Card 
      className={`group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 border-l-4 ${statusInfo.borderColor} ${statusInfo.cardBg} backdrop-blur-sm`}
    >
      <CardContent className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            <div className={`p-2.5 rounded-xl ${statusInfo.iconBg} shadow-sm`}>
              <Package className={`h-5 w-5 ${statusInfo.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base leading-tight mb-1">
                {product.name}
              </h3>
              {showRemoteName && (
                <div className="flex flex-col space-y-1 mt-1">
                  {product.remoteUrl ? (
                    <a 
                      href={product.remoteUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`flex items-center space-x-1.5 hover:opacity-80 transition-opacity cursor-pointer`}
                      title={`${product.remoteName} - Ürün sayfasına git`}
                    >
                      <Link2 className={`h-3.5 w-3.5 ${isApproved ? 'text-emerald-500' : 'text-blue-500'}`} />
                      <span className={`text-xs font-medium truncate ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        {product.remoteName}
                      </span>
                    </a>
                  ) : (
                    <div className="flex items-center space-x-1.5">
                      <Link2 className={`h-3.5 w-3.5 ${isApproved ? 'text-emerald-500' : 'text-blue-500'}`} />
                      <span className={`text-xs font-medium truncate ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                        {product.remoteName}
                      </span>
                    </div>
                  )}
                  {product.remoteUrl ? (
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {product.remoteUrl}
                    </span>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <AlertTriangle className="h-3 w-3 text-amber-500" />
                      <span className="text-xs text-amber-600 dark:text-amber-400">
                        URL bulunamadı
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          
          {/* Actions Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 shadow-lg">
              <DropdownMenuItem onClick={() => onEdit(product)} className="text-sm">
                <Edit className="h-4 w-4 mr-2" />
                Düzenle
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onDelete(product.id)} className="text-sm text-red-600 dark:text-red-400">
                <Trash2 className="h-4 w-4 mr-2" />
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Status Badges */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={`text-xs font-medium px-2.5 py-1.5 ${statusInfo.className}`}>
            {statusInfo.icon}
            <span className="ml-1.5">{statusText}</span>
          </Badge>
          <Badge 
            className={`text-xs font-medium px-2.5 py-1.5 ${
              product.isActive 
                ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 shadow-sm' 
                : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm'
            }`}
          >
            {product.isActive ? (
              <>
                <Zap className="h-3 w-3" />
                <span className="ml-1.5">Aktif</span>
              </>
            ) : (
              <>
                <Ban className="h-3 w-3" />
                <span className="ml-1.5">Pasif</span>
              </>
            )}
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          {title === "Onay Bekleyen Ürünler" && isAwaitingApproval && onApprove && (
            <Button
              size="sm"
              onClick={() => onApprove(product)}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white text-xs font-medium h-9 shadow-sm"
            >
              <ThumbsUp className="h-3.5 w-3.5 mr-1.5" />
              Onayla
            </Button>
          )}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(product)}
              className="flex-1 text-xs font-medium h-9 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <Edit className="h-3.5 w-3.5 mr-1.5" />
              Düzenle
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(product.id)}
              className="flex-1 text-xs font-medium h-9 border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1.5" />
              Sil
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductMobileCard;