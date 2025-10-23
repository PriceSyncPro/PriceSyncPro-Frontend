"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Settings,
    Plus,
    Edit,
    Trash2,
    MoreVertical,
    CheckCircle,
    XCircle,
    Clock,
    AlertTriangle,
    User,
    Calendar,
    Package,
    Shield,
    Activity,
    Ban,
    ChevronDown,
    ChevronRight,
    Layers
} from "lucide-react";
import { ruleService } from "@/utils/api/services/ruleService";
import { ProductService } from "@/utils/api/services/productService";
import { Rule} from "@/utils/types/Rule";
import { Product } from "@/utils/types/Product";

interface ProductWithRules {
    product: Product;
    rules: Rule[];
    ruleCount: number;
}

export default function RulesPage() {
    const [productsWithRules, setProductsWithRules] = useState<ProductWithRules[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            setLoading(true);
            
            // Paralel olarak ürünler ve kuralları çek
            const [productsResponse, rulesResponse] = await Promise.all([
                ProductService.getAll(1, 100), // Tüm ürünleri çek
                ruleService.getAllRules()
            ]);

            if (!productsResponse.isSuccessful) {
                throw new Error(productsResponse.errorMessages?.join(', ') || 'Ürünler yüklenirken hata oluştu');
            }

            if (!rulesResponse.isSuccessful) {
                throw new Error(rulesResponse.errorMessages?.join(', ') || 'Kurallar yüklenirken hata oluştu');
            }

            const products = productsResponse.data.items as unknown as Product[];
            const productRules = rulesResponse.data;

            // Ürünleri kurallarla eşleştir
            const productsWithRulesData: ProductWithRules[] = products.map((product: Product) => {
                const matchingProductRule = productRules.find(pr => pr.productId === product.id);
                const rules = matchingProductRule ? matchingProductRule.rules : [];
                
                return {
                    product,
                    rules,
                    ruleCount: rules.length
                };
            });

            // Sadece kuralı olan ürünleri göster
            const filteredProducts = productsWithRulesData.filter(p => p.ruleCount > 0);
            
            setProductsWithRules(filteredProducts);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Veriler yüklenirken hata oluştu');
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    // Kural tipini metne dönüştürme
    const getRuleTypeText = (ruleType: number): string => {
        switch (ruleType) {
            case 1: return 'Fiyat Takibi';
            case 2: return 'Stok Takibi';
            case 3: return 'İndirim Takibi';
            case 4: return 'Rekabet Takibi';
            default: return `Tip ${ruleType}`;
        }
    };

    // Kural tipi renklendirmeleri
    const getRuleTypeInfo = (ruleType: number) => {
        switch (ruleType) {
            case 1: // Fiyat Takibi
                return {
                    icon: <Settings className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-200 dark:border-blue-800 shadow-sm",
                    iconBg: "bg-blue-100 dark:bg-blue-900/40",
                    iconColor: "text-blue-600 dark:text-blue-400"
                };
            case 2: // Stok Takibi
                return {
                    icon: <Package className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 shadow-sm",
                    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
                    iconColor: "text-emerald-600 dark:text-emerald-400"
                };
            case 3: // İndirim Takibi
                return {
                    icon: <AlertTriangle className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-950/30 dark:to-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-200 dark:border-amber-800 shadow-sm",
                    iconBg: "bg-amber-100 dark:bg-amber-900/40",
                    iconColor: "text-amber-600 dark:text-amber-400"
                };
            case 4: // Rekabet Takibi
                return {
                    icon: <Shield className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-950/30 dark:to-purple-900/30 text-purple-800 dark:text-purple-200 border-purple-200 dark:border-purple-800 shadow-sm",
                    iconBg: "bg-purple-100 dark:bg-purple-900/40",
                    iconColor: "text-purple-600 dark:text-purple-400"
                };
            default:
                return {
                    icon: <Settings className="h-3 w-3 md:h-4 md:w-4" />,
                    className: "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm",
                    iconBg: "bg-gray-100 dark:bg-gray-800/50",
                    iconColor: "text-gray-600 dark:text-gray-400"
                };
        }
    };

    // Durum bilgisi
    const getStatusInfo = (rule: Rule) => {
        if (rule.isDeleted) {
            return {
                icon: <Trash2 className="h-3 w-3 md:h-4 md:w-4" />,
                text: "Silinmiş",
                className: "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/30 text-red-800 dark:text-red-200 border-red-200 dark:border-red-800 shadow-sm"
            };
        }
        if (rule.isActive) {
            return {
                icon: <CheckCircle className="h-3 w-3 md:h-4 md:w-4" />,
                text: "Aktif",
                className: "bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 shadow-sm"
            };
        }
        return {
            icon: <Ban className="h-3 w-3 md:h-4 md:w-4" />,
            text: "Pasif",
            className: "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm"
        };
    };

    // Tarih formatlama
    const formatDate = (dateString: string | null) => {
        if (!dateString) return '—';
        return new Date(dateString).toLocaleDateString('tr-TR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Accordion toggle
    const toggleItem = (productId: string) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(productId)) {
            newOpenItems.delete(productId);
        } else {
            newOpenItems.add(productId);
        }
        setOpenItems(newOpenItems);
    };

    // Kural detay kartı
    const renderRuleCard = (rule: Rule) => {
        const ruleTypeInfo = getRuleTypeInfo(rule.ruleType);
        const statusInfo = getStatusInfo(rule);

        return (
            <Card key={rule.id} className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${ruleTypeInfo.iconBg} shadow-sm`}>
                                {ruleTypeInfo.icon}
                            </div>
                            <div>
                                <Badge className={`text-xs font-medium px-2.5 py-1 ${ruleTypeInfo.className}`}>
                                    {getRuleTypeText(rule.ruleType)}
                                </Badge>
                            </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                            <Badge className={`text-xs font-medium px-2.5 py-1 ${statusInfo.className}`}>
                                {statusInfo.icon}
                                <span className="ml-1">{statusInfo.text}</span>
                            </Badge>
                            
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button 
                                        variant="ghost" 
                                        size="sm" 
                                        className="h-8 w-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-40 shadow-lg">
                                    <DropdownMenuItem className="text-sm">
                                        <Edit className="h-4 w-4 mr-2" />
                                        Düzenle
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-sm text-red-600 dark:text-red-400">
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Sil
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-2">
                            <User className="h-4 w-4" />
                            <span>Oluşturan: {rule.createUserName}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>Oluşturulma: {formatDate(rule.createAt)}</span>
                        </div>
                        {rule.updateAt && (
                            <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4" />
                                <span>Güncelleme: {formatDate(rule.updateAt)}</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    // Ürün accordion item
    const renderProductItem = (productWithRules: ProductWithRules) => {
        const { product, rules, ruleCount } = productWithRules;
        const isOpen = openItems.has(product.id);
        const activeRulesCount = rules.filter(r => r.isActive && !r.isDeleted).length;
        const inactiveRulesCount = rules.filter(r => !r.isActive && !r.isDeleted).length;
        const deletedRulesCount = rules.filter(r => r.isDeleted).length;

        return (
            <Collapsible
                key={product.id}
                open={isOpen}
                onOpenChange={() => toggleItem(product.id)}
            >
                <Card className="border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200">
                    <CollapsibleTrigger asChild>
                        <div className="w-full p-4 sm:p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4 flex-1 min-w-0">
                                    <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 shadow-sm">
                                        <Package className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1 truncate">
                                            {product.name}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                            <div className="flex items-center space-x-1">
                                                <Layers className="h-4 w-4" />
                                                <span>{ruleCount} kural</span>
                                            </div>
                                            {activeRulesCount > 0 && (
                                                <Badge className="text-xs px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300">
                                                    {activeRulesCount} aktif
                                                </Badge>
                                            )}
                                            {inactiveRulesCount > 0 && (
                                                <Badge className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                                    {inactiveRulesCount} pasif
                                                </Badge>
                                            )}
                                            {deletedRulesCount > 0 && (
                                                <Badge className="text-xs px-2 py-0.5 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300">
                                                    {deletedRulesCount} silinmiş
                                                </Badge>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-2 ml-4">
                                    <Badge className={`text-xs font-medium px-2.5 py-1 ${
                                        product.isActive 
                                            ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 dark:from-emerald-950/30 dark:to-emerald-900/30 text-emerald-800 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800 shadow-sm' 
                                            : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900/30 dark:to-gray-800/30 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 shadow-sm'
                                    }`}>
                                        {product.isActive ? 'Aktif' : 'Pasif'}
                                    </Badge>
                                    
                                    {isOpen ? (
                                        <ChevronDown className="h-5 w-5 text-gray-400 transition-transform duration-200" />
                                    ) : (
                                        <ChevronRight className="h-5 w-5 text-gray-400 transition-transform duration-200" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                        <div className="border-t border-gray-200 dark:border-gray-700 p-4 sm:p-6 bg-gray-50/50 dark:bg-gray-800/30">
                            {rules.length > 0 ? (
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            Kural Detayları
                                        </h4>
                                        <Button
                                            size="sm"
                                            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                                        >
                                            <Plus className="h-4 w-4 mr-1.5" />
                                            Yeni Kural
                                        </Button>
                                    </div>
                                    
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {rules.map(rule => renderRuleCard(rule))}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center">
                                        <Settings className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 mb-4">Bu ürün için henüz kural bulunmuyor</p>
                                    <Button
                                        size="sm"
                                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
                                    >
                                        <Plus className="h-4 w-4 mr-1.5" />
                                        İlk Kuralı Ekle
                                    </Button>
                                </div>
                            )}
                        </div>
                    </CollapsibleContent>
                </Card>
            </Collapsible>
        );
    };

    // Boş durum mesajı
    const renderEmptyState = () => {
        return (
            <div className="text-center py-12 px-4">
                <div className="max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center shadow-lg">
                        <Settings className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Henüz kural bulunmuyor
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                        Ürünleriniz için kurallar oluşturarak takip sürecinizi başlatın.
                    </p>
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                        <Plus className="h-5 w-5 mr-2" />
                        İlk Kuralımı Ekle
                    </Button>
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 animate-spin text-indigo-600" />
                    <span className="text-gray-600 dark:text-gray-400">Veriler yükleniyor...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-red-100 dark:bg-red-900/30 rounded-2xl flex items-center justify-center">
                    <XCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">Hata Oluştu</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                <Button onClick={fetchData} variant="outline">
                    Tekrar Dene
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 sm:p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/50 dark:to-purple-950/50 rounded-2xl border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                <div>
                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        Kurallarım
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                        Ürünlerinize ait kuralları görüntüleyin ve yönetin.
                    </p>
                </div>
                <Button
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2.5 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 whitespace-nowrap w-full sm:w-auto"
                >
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Kural Ekle
                </Button>
            </div>

            {/* Content */}
            {productsWithRules.length === 0 ? (
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-0">
                        {renderEmptyState()}
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-lg bg-indigo-100 dark:bg-indigo-900/40">
                                        <Package className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Ürün</p>
                                        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            {productsWithRules.length}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/40">
                                        <Settings className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Kural</p>
                                        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            {productsWithRules.reduce((sum, p) => sum + p.ruleCount, 0)}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        
                        <Card className="border border-gray-200 dark:border-gray-700 shadow-sm">
                            <CardContent className="p-4">
                                <div className="flex items-center space-x-3">
                                    <div className="p-2 rounded-lg bg-amber-100 dark:bg-amber-900/40">
                                        <CheckCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Aktif Kural</p>
                                        <p className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                                            {productsWithRules.reduce((sum, p) => 
                                                sum + p.rules.filter(r => r.isActive && !r.isDeleted).length, 0
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Products List */}
                    <div className="space-y-4">
                        {productsWithRules.map(productWithRules => renderProductItem(productWithRules))}
                    </div>
                </div>
            )}
        </div>
    );
}
