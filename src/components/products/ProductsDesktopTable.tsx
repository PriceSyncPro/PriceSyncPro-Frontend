import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Link2, 
  AlertTriangle, 
  Edit, 
  Trash2, 
  Zap, 
  Ban, 
  ThumbsUp 
} from 'lucide-react';
import { DesktopStatusInfo, Product } from '@/utils/types/Products';


interface ProductDesktopTableProps {
  productList: Product[];
  title: string;
  description: string;
  className?: string;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onApprove?: (product: Product) => void;
  getStatusInfo: (status: number) => DesktopStatusInfo;
  getStatusText: (status: number) => string;
}

const ProductDesktopTable: React.FC<ProductDesktopTableProps> = ({
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
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
      </div>
      
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
        <Table>
          <TableHeader className="bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/30">
            <TableRow className="border-b border-gray-200 dark:border-gray-700">
              <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Ürün Adı</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Eşleştirilen Ürün</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Durum</TableHead>
              <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Aktiflik</TableHead>
              {title === "Onay Bekleyen Ürünler" && (
                <TableHead className="text-gray-900 dark:text-gray-100 font-semibold">Onay</TableHead>
              )}
              <TableHead className="text-right text-gray-900 dark:text-gray-100 font-semibold">İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {productList.map((product) => {
              const statusInfo = getStatusInfo(product.productStatus);
              const statusText = getStatusText(product.productStatus);
              const isAwaitingApproval = product.productStatus === 4;
              const isApproved = product.productStatus === 5;
              const showRemoteName = (isAwaitingApproval || isApproved) && product.remoteName;
              
              return (
                <TableRow
                  key={product.id}
                  className={`border-b border-gray-100 dark:border-gray-800 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-gray-100/30 dark:hover:from-gray-800/30 dark:hover:to-gray-900/20 transition-all duration-200 ${statusInfo.bgColor}`}
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${statusInfo.iconBg} shadow-sm`}>
                        <Package className={`h-5 w-5 ${statusInfo.iconColor}`} />
                      </div>
                      <span className="text-gray-900 dark:text-gray-100 font-medium">{product.name}</span>
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    {showRemoteName ? (
                      <div className="flex flex-col space-y-1">
                        {product.remoteUrl ? (
                          <a 
                            href={product.remoteUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer`}
                            title={`${product.remoteName} - Ürün sayfasına git`}
                          >
                            <Link2 className={`h-4 w-4 ${isApproved ? 'text-emerald-500' : 'text-blue-500'}`} />
                            <span className={`font-medium ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                              {product.remoteName}
                            </span>
                          </a>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Link2 className={`h-4 w-4 ${isApproved ? 'text-emerald-500' : 'text-blue-500'}`} />
                            <span className={`font-medium ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                              {product.remoteName}
                            </span>
                          </div>
                        )}
                        {product.remoteUrl ? (
                          <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">
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
                    ) : (
                      <span className="text-gray-400 dark:text-gray-500">—</span>
                    )}
                  </TableCell>
                  
                  <TableCell>
                    <Badge className={`font-medium ${statusInfo.className}`}>
                      {statusInfo.icon}
                      <span className="ml-1.5">{statusText}</span>
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      className={`font-medium ${
                        product.isActive 
                          ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 shadow-sm' 
                          : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm'
                      }`}
                    >
                      {product.isActive ? <Zap className="h-4 w-4" /> : <Ban className="h-4 w-4" />}
                      <span className="ml-1.5">{product.isActive ? 'Aktif' : 'Pasif'}</span>
                    </Badge>
                  </TableCell>
                  
                  {title === "Onay Bekleyen Ürünler" && (
                    <TableCell>
                      {isAwaitingApproval && onApprove ? (
                        <Button
                          size="sm"
                          onClick={() => onApprove(product)}
                          className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white shadow-sm"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1.5" />
                          Onayla
                        </Button>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">—</span>
                      )}
                    </TableCell>
                  )}
                  
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        <Edit className="h-4 w-4 mr-1.5" />
                        Düzenle
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                        className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4 mr-1.5" />
                        Sil
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductDesktopTable;