import React, { memo, useMemo } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// Removed Lucide icons - replaced with inline SVGs for better performance
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

const ProductDesktopTable = memo<ProductDesktopTableProps>(function ProductDesktopTable({
  productList,
  title,
  description,
  className = "",
  onEdit,
  onDelete,
  onApprove,
  getStatusInfo,
  getStatusText
}) {
  // Memoized inline SVG icons for better performance
  const EditIcon = useMemo(() => (
    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ), []);

  const TrashIcon = useMemo(() => (
    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ), []);

  const PackageIcon = useMemo(() => (
    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
  ), []);

  const Link2Icon = useMemo(() => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ), []);

  const AlertTriangleIcon = useMemo(() => (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
    </svg>
  ), []);

  const ZapIcon = useMemo(() => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ), []);

  const BanIcon = useMemo(() => (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636" />
    </svg>
  ), []);

  const ThumbsUpIcon = useMemo(() => (
    <svg className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
    </svg>
  ), []);

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
                        <div className={statusInfo.iconColor}>
                          {PackageIcon}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-gray-900 dark:text-gray-100 font-medium">{product.name}</span>
                        {showRemoteName && (
                          <div className="flex items-center space-x-1 mt-1">
                            <div className={`${isApproved ? 'text-emerald-500' : 'text-blue-500'}`}>
                              {Link2Icon}
                            </div>
                            <span className={`text-xs font-medium ${isApproved ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
                              {product.remoteName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
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
                      {product.isActive ? ZapIcon : BanIcon}
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
                          {ThumbsUpIcon}
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
                        {EditIcon}
                        Düzenle
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                        className="border-red-200 dark:border-red-700 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                      >
                        {TrashIcon}
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
});

export default ProductDesktopTable;
