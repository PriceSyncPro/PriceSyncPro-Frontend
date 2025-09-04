"use client";
import React, { useState, useEffect } from "react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { UserMarketplace, UserMarketplaceCreateData } from "@/utils/types/userMarketplaces";
import { Marketplace } from "@/utils/types/marketplaces";
import { MarketplacesService, UserMarketplacesService } from "@/utils/api/services";

interface UserSellerInfoCardProps {
  marketplaces: UserMarketplace[];
  loading: boolean;
}

export default function UserSellerInfoCard({ marketplaces, loading }: UserSellerInfoCardProps) {
  const { isOpen, openModal, closeModal } = useModal();
  const [availableMarketplaces, setAvailableMarketplaces] = useState<Marketplace[]>([]);
  const [marketplaceEntries, setMarketplaceEntries] = useState<Array<{id: string, marketplaceId: string, sellerName: string}>>([
    { id: Date.now().toString(), marketplaceId: "", sellerName: "" }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchAvailableMarketplaces();
    }
  }, [isOpen]);

  const fetchAvailableMarketplaces = async () => {
    try {
      const data = await MarketplacesService.getAll();
      setAvailableMarketplaces(data);
    } catch (error) {
      console.error('Failed to fetch available marketplaces:', error);
    }
  };

  const addNewEntry = () => {
    if (marketplaceEntries.length < 3) {
      setMarketplaceEntries([
        ...marketplaceEntries,
        { id: Date.now().toString(), marketplaceId: "", sellerName: "" }
      ]);
    }
  };

  const removeEntry = (id: string) => {
    if (marketplaceEntries.length > 1) {
      setMarketplaceEntries(marketplaceEntries.filter(entry => entry.id !== id));
    }
  };

  const updateEntry = (id: string, field: 'marketplaceId' | 'sellerName', value: string) => {
    setMarketplaceEntries(marketplaceEntries.map(entry => 
      entry.id === id ? { ...entry, [field]: value } : entry
    ));
  };

  const handleSave = async () => {
    const validEntries = marketplaceEntries.filter(entry => 
      entry.marketplaceId && entry.sellerName.trim()
    );

    if (validEntries.length === 0) {
      alert('Lütfen en az bir marketplace seçin ve satıcı adını girin');
      return;
    }

    setIsSubmitting(true);
    try {
      for (const entry of validEntries) {
        const createData: UserMarketplaceCreateData = {
          marketPlaceId: entry.marketplaceId,
          name: entry.sellerName.trim()
        };
        await UserMarketplacesService.create(createData);
      }
      
      setMarketplaceEntries([{ id: Date.now().toString(), marketplaceId: "", sellerName: "" }]);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error('Failed to create marketplace connection:', error);
      alert('Marketplace bağlantısı oluşturulurken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border border-gray-200 rounded-2xl">
        {/* Header */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Satıcı Platformları
            </h3>
            <button
              onClick={openModal}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              + Ekle
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
            </div>
          ) : marketplaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketplaces.map((marketplace) => (
                <div key={marketplace.id} className="p-4 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm truncate">
                        {marketplace.name}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {marketplace.marketPlaceName}
                      </p>
                    </div>
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium flex-shrink-0 ${
                      marketplace.isActive 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {marketplace.isActive ? 'Aktif' : 'Pasif'}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(marketplace.createAt).toLocaleDateString('tr-TR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
                Henüz marketplace eklemediniz
              </p>
              <button
                onClick={openModal}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
              >
                İlk platformunuzu ekleyin
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full">
          {/* Modal Header */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                  Marketplace Ekle
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  Yeni satış platformu bağlantısı oluşturun
                </p>
              </div>
            </div>
          </div>

          {/* Modal Content */}
          <div className="px-4 sm:px-6 py-4 sm:py-5 max-h-[60vh] overflow-y-auto">
            <form className="space-y-4 sm:space-y-5">
              {marketplaceEntries.map((entry, index) => (
                <div key={entry.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3 sm:p-4 border border-gray-200 dark:border-gray-600">
                  {marketplaceEntries.length > 1 && (
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                          {index + 1}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                          Platform {index + 1}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeEntry(entry.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-lg transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}

                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <Label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 block">
                        Platform Seçin
                      </Label>
                      <select
                        value={entry.marketplaceId}
                        onChange={(e) => updateEntry(entry.id, 'marketplaceId', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all font-medium"
                      >
                        <option value="">Platform seçiniz...</option>
                        {availableMarketplaces.map((marketplace) => (
                          <option key={marketplace.id} value={marketplace.id}>
                            {marketplace.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2 block">
                        Mağaza Adı
                      </Label>
                      <Input 
                        type="text" 
                        placeholder="Mağaza adınızı girin"
                        value={entry.sellerName}
                        onChange={(e) => updateEntry(entry.id, 'sellerName', e.target.value)}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all font-medium"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {marketplaceEntries.length < 3 && (
                <button
                  type="button"
                  onClick={addNewEntry}
                  className="w-full p-3 sm:p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-gray-100 dark:bg-gray-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 flex items-center justify-center transition-colors">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base font-semibold">Başka Platform Ekle</span>
                </button>
              )}
            </form>
          </div>

          {/* Modal Footer */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-xl border-t border-gray-200 dark:border-gray-600">
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={closeModal} 
                disabled={isSubmitting}
                className="w-full sm:w-auto px-4 sm:px-6 py-2.5 font-semibold text-sm"
              >
                İptal
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave} 
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 font-semibold text-sm"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Ekleniyor...
                  </span>
                ) : 'Kaydet'}
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
