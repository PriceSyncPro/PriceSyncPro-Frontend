"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  XCircle,
  Ban,
  Power,
  ExternalLink,
  Edit,
  Trash2,
  X,
  Calendar,
  Plus,
  Loader2
} from "lucide-react";
import Button from "../ui/button/Button";
import { Spinner } from "../ui/spinner";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover";
import { Skeleton } from "../ui/skeleton";
import ProductService from "@/utils/api/services/productService";
import { getStatusText, getStatusInfo } from "@/utils/helpers/productHelpers";
import RulePanel from "./RulePanel";
import { toast } from "sonner";
import axios from "@/utils/axios";
import { RULE_ENDPOINTS } from "@/utils/api/endpoints";
import ruleService from "@/utils/api/services/ruleService";

// Interface for the API response
interface ProductRule {
  ruleType: number;
  ruleTypeName: string;
  id: string;
  isActive: boolean;
  createdAt: string;
}

interface ProductDetail {
  name: string;
  remoteName?: string | null;
  remoteUrl?: string | null;
  rules: ProductRule[];
  id: string;
  isActive: boolean;
  createdAt: string;
  productStatus: number;
}

interface ProductModalProps {
  productId: string | null;
  triggerOpen: boolean;
  onModalClose: () => void;
  onEdit?: (productId: string) => void;
  onDelete?: (id: string) => void;
  onApprove?: (productId: string) => void;
}

interface RuleFormData {
  ruleType: number;
  minValue: string;
  maxValue: string;
  reportFrequency: string;
  customFrequency: string;
  isActive: boolean;
}

const ProductModal: React.FC<ProductModalProps> = ({
  productId,
  triggerOpen,
  onModalClose,
  onEdit,
  onDelete,
  onApprove
}) => {
  const [productData, setProductData] = useState<ProductDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAddRulePanel, setShowAddRulePanel] = useState(false);
  const [ruleFormData, setRuleFormData] = useState<RuleFormData>({
    ruleType: 1,
    minValue: "",
    maxValue: "",
    reportFrequency: "12",
    customFrequency: "",
    isActive: true
  });
  const [ruleFormError, setRuleFormError] = useState<string | null>(null);
  const [isAddingRule, setIsAddingRule] = useState(false);
  const [deletingRuleId, setDeletingRuleId] = useState<string | null>(null);
  const [openDeletePopover, setOpenDeletePopover] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newlyAddedRuleId, setNewlyAddedRuleId] = useState<string | null>(null);
  const [isRefreshingRules, setIsRefreshingRules] = useState(false);

  const formatDate = (dateString: string) => {
    if (!dateString || dateString === "0001-01-01T00:00:00") return "Bilinmiyor";
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const getRuleTypeText = (ruleType: number): string => {
    switch (ruleType) {
      case 1: return "Fiyat Kuralı";
      case 2: return "Stok Kuralı";
      case 3: return "İndirim Kuralı";
      default: return `Kural Tipi ${ruleType}`;
    }
  };

  // Fetch product data when modal opens
  const fetchProductData = async () => {
    if (!productId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await ProductService.getProductDetails(productId);
      if (response.isSuccessful) {
        setProductData(response.data);
      } else {
        setError(response.errorMessages?.[0] || "Ürün bilgileri getirilemedi");
      }
    } catch (err) {
      setError("Ürün bilgileri getirilirken bir hata oluştu");
      console.error("Product fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingRule(true);
    setRuleFormError(null);

    try {
      if (!productData?.id) {
        setRuleFormError("Ürün bilgisi bulunamadı");
        setIsAddingRule(false);
        return;
      }

      const requestBody = {
        productId: productData.id,
        ruleType: 1
      };

      const response = await axios.post(RULE_ENDPOINTS.CREATE, requestBody);

      if (response.data.isSuccessful) {
        toast.success(response.data.data || "Kural başarıyla kaydedildi");
        setIsRefreshingRules(true);

        const refreshedData = await ProductService.getProductDetails(productData.id);
        if (refreshedData.isSuccessful && refreshedData.data.rules) {
          const newRule = refreshedData.data.rules[refreshedData.data.rules.length - 1];
          setNewlyAddedRuleId(newRule?.id || null);
          setProductData(refreshedData.data);
          setTimeout(() => setNewlyAddedRuleId(null), 2000);
        }

        setIsRefreshingRules(false);

        setTimeout(() => {
          setShowAddRulePanel(false);
          resetRuleForm();
        }, 500);
      } else {
        const errorMessage = response.data.errorMessages?.[0] || "Kural eklenirken bir hata oluştu";
        setRuleFormError(errorMessage);
        toast.error(errorMessage);
        setIsRefreshingRules(false);
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.errorMessages?.[0] ||
        err.response?.data?.message ||
        "Kural eklenirken bir hata oluştu";
      setRuleFormError(errorMessage);
      toast.error(errorMessage);
      console.error("Add rule error:", err);
      setIsRefreshingRules(false);
    } finally {
      setIsAddingRule(false);
    }
  };

  const resetRuleForm = () => {
    setRuleFormData({
      ruleType: 1,
      minValue: "",
      maxValue: "",
      reportFrequency: "12",
      customFrequency: "",
      isActive: true
    });
    setRuleFormError(null);
  };

  const handleRuleTypeChange = (ruleType: number) => {
    setRuleFormData(prev => ({
      ...prev,
      ruleType,
      minValue: "",
      maxValue: "",
      reportFrequency: "12",
      customFrequency: ""
    }));
    setRuleFormError(null);
  };

  const handleCloseAddRulePanel = () => {
    if (!isAddingRule) {
      setShowAddRulePanel(false);
      resetRuleForm();
    }
  };

  const handleToggleAddRulePanel = () => {
    if (showAddRulePanel) {
      handleCloseAddRulePanel();
    } else {
      setShowAddRulePanel(true);
    }
  };

  const handleDeleteRule = async (ruleId: string) => {
    setDeletingRuleId(ruleId);
    setOpenDeletePopover(null); // Close popover immediately

    try {
      const response = await ruleService.deleteRule(ruleId);
      if (response.isSuccessful) {
        toast.success("Kural başarıyla silindi");
        await fetchProductData();
      } else {
        const errorMessage = response.errorMessages?.[0] || "Kural silinirken bir hata oluştu";
        toast.error(errorMessage);
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.errorMessages?.[0] ||
        error.response?.data?.message ||
        "Kural silinirken bir hata oluştu";
      toast.error(errorMessage);
      console.error("Delete rule error:", error);
    } finally {
      setDeletingRuleId(null);
    }
  };

  useEffect(() => {
    if (productId && triggerOpen) {
      setIsModalVisible(true);
      fetchProductData();
    } else if (!triggerOpen) {
      const timer = setTimeout(() => setIsModalVisible(false), 150);
      return () => clearTimeout(timer);
    }
  }, [productId, triggerOpen]);

  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && triggerOpen) {
        if (openDeletePopover) {
          setOpenDeletePopover(null);
        } else if (showAddRulePanel && !isAddingRule) {
          handleCloseAddRulePanel();
        } else {
          onModalClose();
        }
      }
    };

    if (triggerOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [triggerOpen, showAddRulePanel, isAddingRule, openDeletePopover, onModalClose]);

  if (!triggerOpen || typeof window === "undefined") {
    return null;
  }

  const modalContent = (
    <TooltipProvider delayDuration={0}>
      <div
        className={`fixed inset-0 z-[99999] flex items-center justify-center md:p-4 transition-opacity duration-200 ${isModalVisible ? "opacity-100" : "opacity-0"
          }`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: isModalVisible ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0)",
          margin: 0,
          padding: 0,
          transition: "background-color 0.2s ease"
        }}
        onClick={onModalClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div
          className={`bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 md:rounded-lg shadow-lg overflow-hidden transition-all duration-200 w-full h-full md:h-auto md:max-h-[90vh] ${showAddRulePanel ? "md:max-w-6xl" : "md:max-w-3xl"
            } ${isModalVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex flex-col md:flex-row h-full overflow-hidden">
            {/* Main Content */}
            <div className={`flex-1 flex flex-col min-h-0 ${showAddRulePanel ? "md:border-r border-gray-200 dark:border-gray-700" : ""}`}>
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-3">
                  <div className="flex-1 min-w-0">
                    <h4 id="modal-title" className="text-lg font-medium text-gray-900 dark:text-white">
                      Ürün Detayları
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 truncate">
                      {productData?.name || "Yükleniyor..."}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onModalClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                  type="button"
                  aria-label="Modali kapat"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-4 overflow-y-auto flex-1 min-h-0">
                {/* Loading State */}
                {isLoading && (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    {/* Status Skeleton */}
                    <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-4 w-12" />
                          <Skeleton className="h-6 w-20" />
                          <Skeleton className="h-6 w-16" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          <div>
                            <Skeleton className="h-3 w-24 mb-1" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                          <div>
                            <Skeleton className="h-3 w-20 mb-1" />
                            <Skeleton className="h-4 w-3/4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Product Info Skeleton */}
                    <div>
                      <Skeleton className="h-5 w-24 mb-2" />
                      <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          <div>
                            <Skeleton className="h-3 w-16 mb-1" />
                            <Skeleton className="h-4 w-full" />
                          </div>
                          <div>
                            <Skeleton className="h-3 w-24 mb-1" />
                            <Skeleton className="h-4 w-2/3" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rules Skeleton */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-5" />
                        </div>
                        <Skeleton className="h-8 w-24" />
                      </div>
                      <div className="space-y-2">
                        {[1, 2].map((i) => (
                          <div key={i} className="border border-gray-200 dark:border-gray-700 rounded p-3 bg-gray-50 dark:bg-gray-800">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <Skeleton className="h-5 w-8" />
                                <Skeleton className="h-2 w-2 rounded-full" />
                                <Skeleton className="h-3 w-12" />
                              </div>
                              <Skeleton className="h-4 w-4" />
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                              <Skeleton className="h-3 w-full" />
                              <Skeleton className="h-3 w-3/4" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Error State */}
                {error && !isLoading && !isRefreshingRules && (
                  <div className="flex items-center justify-center py-12">
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <AlertCircle className="h-8 w-8 text-red-500" />
                      <p className="text-sm text-gray-900 dark:text-white">Hata Oluştu</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{error}</p>
                    </div>
                  </div>
                )}

                {/* Content State */}
                {productData && !isLoading && !error && (
                  <>
                    {/* Product Status Section */}
                    <div className={`mb-4 border border-gray-200 dark:border-gray-700 rounded p-3 ${productData.productStatus === 4 ? "border-red-200 dark:border-red-500" : ""
                      }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900 dark:text-white">Durum:</span>
                          <span className={`px-2 py-1 rounded text-xs ${getStatusInfo(productData.productStatus).className}`}>
                            {getStatusText(productData.productStatus)}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs ${productData.isActive
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                            }`}>
                            {productData.isActive ? "Aktif" : "İnaktif"}
                          </span>
                        </div>
                        {onApprove && productData.productStatus === 4 && (
                          <Button
                            size="sm"
                            onClick={async () => {
                              try {
                                const response = await ProductService.update(productData.id, {
                                  productStatus: 5
                                });
                                if (response.isSuccessful) {
                                  onApprove(productData.id);
                                  onModalClose();
                                } else {
                                  console.error("Approval failed:", response.errorMessages);
                                }
                              } catch (error) {
                                console.error("Approval error:", error);
                              }
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Onayla
                          </Button>
                        )}
                      </div>

                      {/* Matching Information */}
                      {(productData.remoteName || productData.remoteUrl) && (
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                            {productData.remoteName && (
                              <div>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  Eşleştirilen Ürün Adı
                                </p>
                                {productData.remoteName.length > 40 ? (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <p className="text-sm text-gray-800 dark:text-gray-200 cursor-pointer truncate">
                                        {productData.remoteName.substring(0, 40)}...
                                      </p>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="z-[100000] max-w-xs break-words bg-gray-900 text-white px-2 py-1 rounded text-xs">
                                      <p>{productData.remoteName}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ) : (
                                  <p className="text-sm text-gray-800 dark:text-gray-200">
                                    {productData.remoteName}
                                  </p>
                                )}
                              </div>
                            )}
                            {productData.remoteUrl && (
                              <div className={productData.remoteName ? "" : "lg:col-span-2"}>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                  Eşleştirilen URL
                                </p>
                                {productData.remoteUrl.length > 40 ? (
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <a
                                        href={productData.remoteUrl.startsWith("http") ? productData.remoteUrl : `https://${productData.remoteUrl}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm truncate"
                                      >
                                        <ExternalLink className="h-3 w-3 mr-1 flex-shrink-0" />
                                        <span className="truncate">{productData.remoteUrl.substring(0, 40)}...</span>
                                      </a>
                                    </TooltipTrigger>
                                    <TooltipContent side="bottom" className="z-[100000] max-w-xs break-words bg-gray-900 text-white px-2 py-1 rounded text-xs">
                                      <p>{productData.remoteUrl}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                ) : (
                                  <a
                                    href={productData.remoteUrl.startsWith("http") ? productData.remoteUrl : `https://${productData.remoteUrl}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1 flex-shrink-0" />
                                    {productData.remoteUrl}
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Basic Product Information */}
                    <div className="mb-4">
                      <h5 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                        Ürün Bilgileri
                      </h5>
                      <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Ürün Adı
                            </p>
                            <p className="text-sm font-medium text-gray-900 dark:text-white break-words">
                              {productData.name}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Oluşturulma Tarihi
                            </p>
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                              {formatDate(productData.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Rules Section - Only show for approved products */}
                    {productData.productStatus === 5 && (
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-2">
                            <h5 className="text-base font-medium text-gray-900 dark:text-white">
                              Kurallar
                            </h5>
                            <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                              {productData.rules ? productData.rules.length : 0}
                            </span>
                          </div>

                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleToggleAddRulePanel}
                            className={`h-8 px-3 transition-colors ${showAddRulePanel
                                ? "text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-950/20"
                                : "text-green-600 border-green-200 hover:bg-green-50 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-950/20"
                              }`}
                          >
                            <Plus className={`h-4 w-4 mr-1.5 transition-transform ${showAddRulePanel ? "rotate-45" : ""}`} />
                            {showAddRulePanel ? "Kapat" : "Kural Ekle"}
                          </Button>
                        </div>

                        {productData.rules && productData.rules.length > 0 ? (
                          <div className="space-y-2">
                            {productData.rules.map((rule, index) => (
                              <div
                                key={rule.id}
                                className={`border border-gray-200 dark:border-gray-700 rounded p-3 transition-colors ${newlyAddedRuleId === rule.id
                                  ? "bg-green-50 dark:bg-green-900/20 border-green-300 dark:border-green-600"
                                  : "bg-gray-50 dark:bg-gray-800"
                                  }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center space-x-2">
                                    <span className="bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                                      #{index + 1}
                                    </span>
                                    <span className={`w-2 h-2 rounded-full ${rule.isActive ? "bg-green-500" : "bg-red-500"}`} />
                                    <span className="text-xs text-gray-600 dark:text-gray-400">
                                      {rule.isActive ? "Aktif" : "İnaktif"}
                                    </span>
                                  </div>

                                  {/* Delete Button with Popover */}
                                  <Popover
                                    open={openDeletePopover === rule.id}
                                    onOpenChange={(open) => {
                                      if (open) {
                                        setOpenDeletePopover(rule.id);
                                      } else {
                                        setOpenDeletePopover(null);
                                      }
                                    }}
                                  >
                                    <PopoverTrigger asChild>
                                      <button
                                        disabled={deletingRuleId === rule.id}
                                        className="p-1 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Kuralı sil"
                                      >
                                        {deletingRuleId === rule.id ? (
                                          <Spinner className="h-4 w-4" />
                                        ) : (
                                          <Trash2 className="h-4 w-4" />
                                        )}
                                      </button>
                                    </PopoverTrigger>
                                    <PopoverContent
                                      className="w-64 p-3 z-[100000]"
                                      align="end"
                                      side="top"
                                      sideOffset={5}
                                    >
                                      <div className="space-y-3">
                                        <div>
                                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                                            Kuralı Sil
                                          </h4>
                                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                            Bu kuralı silmek istediğinizden emin misiniz?
                                          </p>
                                        </div>
                                        <div className="flex justify-end gap-2">
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            onClick={() => setOpenDeletePopover(null)}
                                            className="text-xs"
                                          >
                                            İptal
                                          </Button>
                                          <Button
                                            size="sm"
                                            onClick={() => handleDeleteRule(rule.id)}
                                            className="bg-red-600 hover:bg-red-700 text-white text-xs"
                                          >
                                            Sil
                                          </Button>
                                        </div>
                                      </div>
                                    </PopoverContent>
                                  </Popover>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-xs">
                                  <div>
                                    <span className="text-gray-500 dark:text-gray-400">Tip: </span>
                                    <span className="text-gray-900 dark:text-white">{rule.ruleTypeName}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500 dark:text-gray-400">Tarih: </span>
                                    <span className="text-gray-900 dark:text-white">{formatDate(rule.createdAt)}</span>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded p-4 text-center">
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Bu ürüne ait kural bulunmuyor</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* Modal Footer */}
              <div className={`flex items-center justify-end gap-2 p-4 border-t border-gray-200 dark:border-gray-700 ${showAddRulePanel ? "hidden md:flex" : "flex"}`}>
                <Button size="sm" variant="outline" onClick={onModalClose}>
                  Kapat
                </Button>
                {productData && onDelete && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      onDelete(productData.id);
                      onModalClose();
                    }}
                    className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Sil
                  </Button>
                )}
              </div>
            </div>

            {/* Rule Panel */}
            <RulePanel
              isOpen={showAddRulePanel}
              productName={productData?.name || ""}
              ruleFormData={ruleFormData}
              setRuleFormData={setRuleFormData}
              ruleFormError={ruleFormError}
              isAddingRule={isAddingRule}
              onClose={handleCloseAddRulePanel}
              onSubmit={handleAddRule}
              onRuleTypeChange={handleRuleTypeChange}
            />
          </div>
        </div>
      </div>
    </TooltipProvider>
  );

  return createPortal(modalContent, document.body);
};

export default ProductModal;
