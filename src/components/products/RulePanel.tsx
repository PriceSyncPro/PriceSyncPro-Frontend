"use client";
import React, { useEffect } from "react";
import {
  Plus,
  ArrowLeft,
  AlertCircle,
  Clock
} from "lucide-react";
import Button from "../ui/button/Button";
import { Spinner } from "../ui/spinner";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Modal } from "../ui/modal";

interface RuleFormData {
  ruleType: number;
  minValue: string;
  maxValue: string;
  reportFrequency: string;
  customFrequency: string;
  isActive: boolean;
}

interface RulePanelProps {
  isOpen: boolean;
  productName: string;
  ruleFormData: RuleFormData;
  setRuleFormData: React.Dispatch<React.SetStateAction<RuleFormData>>;
  ruleFormError: string | null;
  isAddingRule: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onRuleTypeChange: (ruleType: number) => void;
}

const RulePanel: React.FC<RulePanelProps> = ({
  isOpen,
  productName,
  ruleFormData,
  setRuleFormData,
  ruleFormError,
  isAddingRule,
  onClose,
  onSubmit,
  onRuleTypeChange
}) => {
  const frequencyOptions = [
    { value: "3", label: "3 Saat" },
    { value: "6", label: "6 Saat" },
    { value: "9", label: "9 Saat" },
    { value: "12", label: "12 Saat" },
    { value: "24", label: "24 Saat" },
    { value: "custom", label: "Özel" }
  ];

  useEffect(() => {
    // Set default frequency if not set
    if (!ruleFormData.reportFrequency) {
      setRuleFormData(prev => ({ ...prev, reportFrequency: "12" }));
    }
  }, []);

  const handleFrequencyChange = (value: string) => {
    setRuleFormData(prev => ({
      ...prev,
      reportFrequency: value,
      customFrequency: value === "custom" ? prev.customFrequency : ""
    }));
  };

  const handleSubmit = () => {
    const mockEvent = {
      preventDefault: () => {},
      target: {},
      currentTarget: {}
    } as React.FormEvent;
    onSubmit(mockEvent);
  };

  // Mobile Modal Component
  const MobileModal = () => (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={false} className="max-w-full h-full">
      <div className="flex flex-col h-full bg-white dark:bg-gray-900">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Kural Ekle
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-64 mt-1">
              {productName}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isAddingRule}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
            type="button"
            aria-label="Paneli kapat"
          >
            <Plus className="h-4 w-4 text-gray-400 rotate-45" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <RuleFormContent />
        </div>

        {/* Footer */}
        <div className="mt-auto flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isAddingRule}
              className="w-full"
              size="sm"
            >
              İptal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isAddingRule}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              {isAddingRule ? (
                <div className="flex items-center space-x-1">
                  <Spinner className="h-3 w-3" />
                  <span>Ekleniyor...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Plus className="h-3 w-3" />
                  <span>Kuralı Ekle</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );

  // Desktop Panel Component
  const DesktopPanel = () => {
    if (!isOpen) return null;

    return (
      <div className="w-full md:w-96 flex-shrink-0 bg-white dark:bg-gray-900 h-full flex flex-col md:border-l border-t md:border-t-0 border-gray-200 dark:border-gray-700">
        {/* Panel Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div>
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Kural Ekle
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-48 mt-1">
              {productName}
            </p>
          </div>
          <button
            onClick={onClose}
            disabled={isAddingRule}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors disabled:opacity-50"
            type="button"
            aria-label="Paneli kapat"
          >
            <ArrowLeft className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        {/* Panel Content */}
        <div className="flex-1 overflow-y-auto p-4 min-h-0">
          <RuleFormContent />
        </div>

        {/* Panel Footer */}
        <div className="mt-auto flex-shrink-0 p-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isAddingRule}
              className="flex-1"
              size="sm"
            >
              İptal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isAddingRule}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
              size="sm"
            >
              {isAddingRule ? (
                <div className="flex items-center space-x-1">
                  <Spinner className="h-3 w-3" />
                  <span>Ekleniyor...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-1">
                  <Plus className="h-3 w-3" />
                  <span>Kuralı Ekle</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  // Shared Form Content Component
  const RuleFormContent = () => (
    <div className="space-y-4">
      {ruleFormError && (
        <div className="p-3 border border-red-200 dark:border-red-500 rounded text-red-700 dark:text-red-300 bg-red-50 dark:bg-red-900/20">
          <p className="text-sm">{ruleFormError}</p>
        </div>
      )}

      {/* Rule Type Info */}
      <div className="border border-green-200 dark:border-green-700 rounded p-3 bg-green-50 dark:bg-green-900/20">
        <h3 className="font-medium text-green-800 dark:text-green-200 mb-1">
          Fiyat Takip Kuralı
        </h3>
        <p className="text-sm text-green-700 dark:text-green-300">
          Ürün fiyat değişikliklerini takip ederek düzenli raporlar alın
        </p>
      </div>

      {/* Report Frequency Settings */}
      <div>
        <Label className="text-sm font-medium text-gray-900 dark:text-white mb-2 block">
          Rapor Sıklığı
        </Label>
        <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2">
              {frequencyOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleFrequencyChange(option.value)}
                  className={`p-2 text-sm rounded border transition-colors ${ruleFormData.reportFrequency === option.value
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'
                    }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            {ruleFormData.reportFrequency === "custom" && (
              <div>
                <Label htmlFor="custom-frequency" className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
                  Özel Saat Değeri
                </Label>
                <Input
                  id="custom-frequency"
                  type="number"
                  min="1"
                  max="168"
                  placeholder="Saat olarak girin (1-168)"
                  value={ruleFormData.customFrequency}
                  onChange={(e) => setRuleFormData(prev => ({
                    ...prev,
                    customFrequency: e.target.value
                  }))}
                  className="w-full"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  1 ile 168 saat arasında bir değer girin
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rule Status */}
      <div className="border border-gray-200 dark:border-gray-700 rounded p-3">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium text-gray-900 dark:text-white">
              Kural Durumu
            </Label>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Aktif/pasif durum
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is-active"
              checked={ruleFormData.isActive}
              onChange={(e) => setRuleFormData(prev => ({
                ...prev,
                isActive: e.target.checked
              }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
            <Label htmlFor="is-active" className={`text-sm cursor-pointer ${ruleFormData.isActive
              ? 'text-green-600 dark:text-green-400'
              : 'text-gray-500 dark:text-gray-400'
              }`}>
              {ruleFormData.isActive ? 'Aktif' : 'Pasif'}
            </Label>
          </div>
        </div>
      </div>
    </div>
  );

  // Render mobile modal on mobile devices, desktop panel on desktop
  return (
    <>
      {/* Mobile View */}
      <div className="md:hidden">
        <MobileModal />
      </div>

      {/* Desktop View */}
      <div className="hidden md:block">
        <DesktopPanel />
      </div>
    </>
  );
};

export default RulePanel;
