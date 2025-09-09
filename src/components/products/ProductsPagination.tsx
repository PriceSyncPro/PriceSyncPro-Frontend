import React from 'react';
import { Button } from "@/components/ui/button";
import { Pagination as PaginationType } from "@/utils/types/Pagination";

interface PaginationProps {
  pagination?: PaginationType | null;
  onPageChange?: (page: number) => void | null;
}

const Pagination: React.FC<PaginationProps> = ({ pagination, onPageChange }) => {
  if (!pagination || !onPageChange) return null;

  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 dark:from-gray-800/50 dark:to-gray-900/30 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="text-center sm:text-left">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-semibold text-gray-900 dark:text-gray-100">
            {pagination.totalCount}
          </span>{' '}
          ürün bulundu
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          Sayfa {pagination.currentPage} / {pagination.totalPages}
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasPrevious}
          className="h-9 px-4 disabled:opacity-50 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => onPageChange(pagination.currentPage - 1)}
        >
          ← Önceki
        </Button>
        
        <div className="flex items-center px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-medium shadow-sm">
          {pagination.currentPage}
        </div>
        
        <Button
          variant="outline"
          size="sm"
          disabled={!pagination.hasNext}
          className="h-9 px-4 disabled:opacity-50 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          onClick={() => onPageChange(pagination.currentPage + 1)}
        >
          Sonraki →
        </Button>
      </div>
    </div>
  );
};

export default Pagination;