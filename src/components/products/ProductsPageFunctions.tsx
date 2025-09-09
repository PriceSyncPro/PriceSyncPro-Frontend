import { CheckCircle, Clock, Calendar, XCircle, AlertTriangle, Ban, AlertCircle, Package } from "lucide-react";
import { Product} from "@/utils/types/Products";



type ProductGroups = {
  approved: Product[];
  awaitingApproval: Product[];
  pending: Product[];
  error: Product[];
  rejected: Product[];
  inactive: Product[];
};


// Durum değerini metne dönüştürme
export const getStatusText = (statusCode: number): string => {
    switch (statusCode) {
        case 0: return 'İnaktif';
        case 1: return 'Reddedildi';
        case 2: return 'Hata';
        case 3: return 'Beklemede';
        case 4: return 'Onay Bekliyor';
        case 5: return 'Onaylandı';
        default: return 'Bilinmiyor';
    }
};

// Gelişmiş durum renklendirmeleri
export const getStatusInfo = (statusCode: number) => {
    const statusText = getStatusText(statusCode);
    switch (statusText) {
        case 'Onaylandı':
            return {
                variant: "default",
                icon: <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />,
                className: "bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 shadow-sm",
                bgColor: "bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 dark:from-emerald-950/20 dark:to-emerald-900/10",
                cardBg: "bg-emerald-50/30 dark:bg-emerald-950/10",
                borderColor: "border-l-emerald-500 dark:border-l-emerald-400",
                iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
                iconColor: "text-emerald-600 dark:text-emerald-400"
            };
        case 'Beklemede':
            return {
                variant: "secondary",
                icon: <Clock className="h-3 w-3 md:h-4 md:w-4" />,
                className: "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800 shadow-sm",
                bgColor: "bg-gradient-to-br from-amber-50/80 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10",
                cardBg: "bg-amber-50/30 dark:bg-amber-950/10",
                borderColor: "border-l-amber-500 dark:border-l-amber-400",
                iconBg: "bg-amber-100 dark:bg-amber-900/40",
                iconColor: "text-amber-600 dark:text-amber-400"
            };
        case 'Onay Bekliyor':
            return {
                variant: "outline",
                icon: <Calendar className="h-3 w-3 md:h-4 md:w-4" />,
                className: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800 shadow-sm",
                bgColor: "bg-gradient-to-br from-blue-50/80 to-blue-100/50 dark:from-blue-950/20 dark:to-blue-900/10",
                cardBg: "bg-blue-50/30 dark:bg-blue-950/10",
                borderColor: "border-l-blue-500 dark:border-l-blue-400",
                iconBg: "bg-blue-100 dark:bg-blue-900/40",
                iconColor: "text-blue-600 dark:text-blue-400"
            };
        case 'Reddedildi':
            return {
                variant: "destructive",
                icon: <XCircle className="h-3 w-3 md:h-4 md:w-4" />,
                className: "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800 shadow-sm",
                bgColor: "bg-gradient-to-br from-red-50/80 to-red-100/50 dark:from-red-950/20 dark:to-red-900/10",
                cardBg: "bg-red-50/30 dark:bg-red-950/10",
                borderColor: "border-l-red-500 dark:border-l-red-400",
                iconBg: "bg-red-100 dark:bg-red-900/40",
                iconColor: "text-red-600 dark:text-red-400"
            };
        case 'Hata':
            return {
                variant: "destructive",
                icon: <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />,
                className: "bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-950/30 dark:to-orange-900/30 text-orange-800 dark:text-orange-200 border-orange-200 dark:border-orange-800 shadow-sm",
                bgColor: "bg-gradient-to-br from-orange-50/80 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10",
                cardBg: "bg-orange-50/30 dark:bg-orange-950/10",
                borderColor: "border-l-orange-500 dark:border-l-orange-400",
                iconBg: "bg-orange-100 dark:bg-orange-900/40",
                iconColor: "text-orange-600 dark:text-orange-400"
            };
        case 'İnaktif':
            return {
                variant: "outline",
                icon: <Ban className="h-3 w-3 md:h-4 md:w-4" />,
                className: "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm",
                bgColor: "bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/10",
                cardBg: "bg-gray-50/30 dark:bg-gray-900/10",
                borderColor: "border-l-gray-400 dark:border-l-gray-500",
                iconBg: "bg-gray-100 dark:bg-gray-800/50",
                iconColor: "text-gray-600 dark:text-gray-400"
            };
        default:
            return {
                variant: "outline",
                icon: <AlertCircle className="h-3 w-3 md:h-4 md:w-4" />,
                className: "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm",
                bgColor: "bg-gradient-to-br from-gray-50/80 to-gray-100/50 dark:from-gray-900/20 dark:to-gray-800/10",
                cardBg: "bg-gray-50/30 dark:bg-gray-900/10",
                borderColor: "border-l-gray-400 dark:border-l-gray-500",
                iconBg: "bg-gray-100 dark:bg-gray-800/50",
                iconColor: "text-gray-600 dark:text-gray-400"
            };
    }
};


// Tab renklendirmeleri
export const getTabColor = (tabKey: string) => {
    switch (tabKey) {
        case 'all':
            return {
                activeColor: 'text-indigo-600 dark:text-indigo-400',
                count: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
            };
        case 'approved':
            return {
                activeColor: 'text-emerald-600 dark:text-emerald-400',
                count: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300'
            };
        case 'awaiting':
            return {
                activeColor: 'text-blue-600 dark:text-blue-400',
                count: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
            };
        case 'pending':
            return {
                activeColor: 'text-amber-600 dark:text-amber-400',
                count: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
            };
        case 'rejected':
            return {
                activeColor: 'text-red-600 dark:text-red-400',
                count: 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300'
            };
        case 'error':
            return {
                activeColor: 'text-orange-600 dark:text-orange-400',
                count: 'bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300'
            };
        case 'inactive':
            return {
                activeColor: 'text-gray-600 dark:text-gray-400',
                count: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
            };
        default:
            return {
                activeColor: 'text-indigo-600 dark:text-indigo-400',
                count: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300'
            };
    }
};


export const createProductGroups =  (products:Product[]): ProductGroups => products.reduce((acc, product) => {
  switch (product.productStatus) {
    case 5:
      acc.approved.push(product);
      break;
    case 4:
      acc.awaitingApproval.push(product);
      break;
    case 3:
      acc.pending.push(product);
      break;
    case 2:
      acc.error.push(product);
      break;
    case 1:
      acc.rejected.push(product);
      break;
    case 0:
      acc.inactive.push(product);
      break;
  }
  return acc;
}, {
  approved: [],
  awaitingApproval: [],
  pending: [],
  error: [],
  rejected: [],
  inactive: []
} as ProductGroups);

export const renderSmallEmptyMessage = (categoryName: string) => {
        const getCategoryInfo = (category: string) => {
            switch (category) {
                case 'Onaylı':
                    return {
                        icon: <CheckCircle className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/20',
                        iconColor: 'text-emerald-600 dark:text-emerald-400',
                        title: 'Onaylı ürün bulunmuyor',
                        description: 'Henüz onaylanmış ürününüz yok. Ürünleriniz onaylandığında burada görünecek.'
                    };
                case 'Onay Bekleyen':
                    return {
                        icon: <Calendar className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20',
                        iconColor: 'text-blue-600 dark:text-blue-400',
                        title: 'Onay bekleyen ürün yok',
                        description: 'Şu anda onayınızı bekleyen ürün bulunmuyor.'
                    };
                case 'Beklemede':
                    return {
                        icon: <Clock className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/20',
                        iconColor: 'text-amber-600 dark:text-amber-400',
                        title: 'Beklemedeki ürün yok',
                        description: 'Şu anda işlem bekleyen ürününüz bulunmuyor.'
                    };
                case 'Reddedilen':
                    return {
                        icon: <XCircle className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/20',
                        iconColor: 'text-red-600 dark:text-red-400',
                        title: 'Reddedilen ürün yok',
                        description: 'Reddedilmiş ürününüz bulunmuyor.'
                    };
                case 'Hatalı':
                    return {
                        icon: <AlertTriangle className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20',
                        iconColor: 'text-orange-600 dark:text-orange-400',
                        title: 'Hatalı ürün yok',
                        description: 'Hata durumunda olan ürününüz bulunmuyor.'
                    };
                case 'İnaktif':
                    return {
                        icon: <Ban className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/20',
                        iconColor: 'text-gray-600 dark:text-gray-400',
                        title: 'İnaktif ürün yok',
                        description: 'Pasif durumda olan ürününüz bulunmuyor.'
                    };
                default:
                    return {
                        icon: <Package className="h-8 w-8" />,
                        bgColor: 'bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/20',
                        iconColor: 'text-indigo-600 dark:text-indigo-400',
                        title: 'Bu kategoride ürün yok',
                        description: 'Seçilen kategoride henüz ürün bulunmuyor.'
                    };
            }
        };

        const categoryInfo = getCategoryInfo(categoryName);

        return (
            <div className="text-center py-12 px-4">
                <div className="max-w-sm mx-auto">
                    <div className={`w-16 h-16 mx-auto mb-4 ${categoryInfo.bgColor} rounded-2xl flex items-center justify-center shadow-sm`}>
                        <div className={categoryInfo.iconColor}>
                            {categoryInfo.icon}
                        </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {categoryInfo.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                        {categoryInfo.description}
                    </p>
                </div>
            </div>
        );
    };






