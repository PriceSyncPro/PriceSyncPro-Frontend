// Re-export optimized functions from helpers
export {
    getStatusText,
    getStatusInfo,
    getTabColor,
    createProductGroups,
    getEmptyStateConfig
} from "@/utils/helpers/productHelpers";

import { getEmptyStateConfig } from "@/utils/helpers/productHelpers";

// Legacy support - wrapper for the new helper
export const renderSmallEmptyMessage = (categoryName: string) => {
    const config = getEmptyStateConfig(categoryName);
    const IconComponent = config.icon;
    
    return (
        <div className="text-center py-12 px-4">
            <div className="max-w-sm mx-auto">
                <div className={`w-16 h-16 mx-auto mb-4 ${config.bgColor} rounded-2xl flex items-center justify-center shadow-sm`}>
                    <div className={config.iconColor}>
                        <IconComponent className="h-8 w-8" />
                    </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {config.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {config.description}
                </p>
            </div>
        </div>
    );
};






