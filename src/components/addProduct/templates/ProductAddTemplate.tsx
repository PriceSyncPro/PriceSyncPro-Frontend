import React from "react";
import { StepIndicator } from "../molecules/StepIndicator";
import { MethodSelection } from "../organisms/MethodSelection";
import { StepHeader } from "../organisms/StepHeader";
import { ManualProductEntry } from "../organisms/ManualProductEntry";
import { ExcelUpload } from "../organisms/ExcelUpload";
import { ProductPreview } from "../organisms/ProductPreview";
import { CompletionMessage } from "../organisms/CompletionMessage";
import ComponentCard from "@/components/common/ComponentCard";
import { Step } from "../types/types";
import { Product } from "../types/types";
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";


interface ProductAddTemplateProps {
    currentStep: number;
    steps: Step[];
    selectedMethod: "manual" | "excel" | null;
    productName: string;
    setProductName: (name: string) => void;
    selectedProducts: Product[];
    handleSelectMethod: (method: "manual" | "excel") => void;
    handleAddProduct: () => void;
    handleRemoveProduct: (productId: number) => void;
    setCurrentStep: (step: number) => void;
    handleReset: () => void;
    isSubmitting?: boolean;
    handleComplete: () => Promise<void>;
}

export const ProductAddTemplate: React.FC<ProductAddTemplateProps> = ({
                                                                          currentStep,
                                                                          steps,
                                                                          selectedMethod,
                                                                          productName,
                                                                          setProductName,
                                                                          selectedProducts,
                                                                          handleSelectMethod,
                                                                          handleAddProduct,
                                                                          handleRemoveProduct,
                                                                          setCurrentStep,
                                                                          handleReset,
                                                                          isSubmitting = false,
                                                                          handleComplete
                                                                      } :ProductAddTemplateProps) => {
    const router = useRouter();

    // Adım geçişleri için animasyon varyantları
    const variants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    // Adım başlıklarını ve renklerini belirle
    const getStepColor = (stepId: number) => {
        const colors = ["bg-blue-500", "bg-purple-500", "bg-amber-500", "bg-green-500"];
        return colors[stepId] || colors[0];
    };

    // Adım 3'e geçiş için işlev - async olarak işaretlendi
    const goToFinalStep = async (): Promise<void> => {
        try {
            await handleComplete();
        } catch (error) {
            console.error("Error completing product addition:", error);
        }
    };

    return (
        <ComponentCard
            title="Ürün Ekle"
            className="border shadow-lg rounded-xl overflow-hidden"
        >
            {/* Adım göstergesi - renkli ve animasyonlu */}
            <div className="mb-8 px-4">
                <StepIndicator
                    steps={steps}
                    currentStep={currentStep}
                    activeColor={getStepColor(currentStep)}
                />
            </div>

            <AnimatePresence mode="wait">
                {/* Adım 0: Yükleme Yöntemi Seçimi */}
                {currentStep === 0 && (
                    <motion.div
                        key="step0"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.3 }}
                        className="py-4"
                    >
                        <MethodSelection
                            onSelectMethod={handleSelectMethod}
                        />
                    </motion.div>
                )}

                {/* Adım 1: Ürün Bilgileri */}
                {currentStep === 1 && (
                    <motion.div
                        key="step1"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-6 w-full py-4"
                    >
                        <StepHeader
                            title={selectedMethod === "manual" ? "Ürün Bilgilerini Girin" : "Excel Dosyasını Yükleyin"}
                            subtitle={selectedMethod === "manual"
                                ? "Eklemek istediğiniz ürünlerin bilgilerini girin"
                                : "Ürün bilgilerini içeren Excel dosyasını yükleyin"}
                            icon={selectedMethod === "manual" ? "edit" : "file-spreadsheet"}
                            color={getStepColor(1)}
                            onBack={() => setCurrentStep(0)}
                        />

                        {selectedMethod === "manual" ? (
                            <ManualProductEntry
                                productName={productName}
                                setProductName={setProductName}
                                selectedProducts={selectedProducts}
                                handleAddProduct={handleAddProduct}
                                handleRemoveProduct={handleRemoveProduct}
                                onContinue={() => setCurrentStep(2)}
                                buttonColor={getStepColor(1)}
                            />
                        ) : (
                            <ExcelUpload
                                onContinue={() => setCurrentStep(2)}
                                buttonColor={getStepColor(1)}
                            />
                        )}
                    </motion.div>
                )}

                {/* Adım 2: Önizleme */}
                {currentStep === 2 && (
                    <motion.div
                        key="step2"
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        variants={variants}
                        transition={{ duration: 0.3 }}
                        className="flex flex-col gap-6 w-full py-4"
                    >
                        <StepHeader
                            title="Ürün Bilgilerini Önizleyin"
                            subtitle="Eklediğiniz ürünleri kontrol edin ve onaylayın"
                            icon="eye"
                            color={getStepColor(2)}
                            onBack={() => setCurrentStep(1)}
                        />

                        <ProductPreview
                            selectedMethod={selectedMethod}
                            selectedProducts={selectedProducts}
                            onEdit={() => setCurrentStep(1)}
                            onConfirm={goToFinalStep}
                            buttonColor={getStepColor(2)}
                            isSubmitting={isSubmitting}
                        />
                    </motion.div>
                )}

                {/* Adım 3: Tamamlandı */}
                {currentStep === 3 && (
                    <motion.div
                        key="step3"
                        initial="hidden"
                        animate="visible"
                        variants={variants}
                        transition={{ duration: 0.3 }}
                        className="py-4"
                    >
                        <CompletionMessage
                            selectedMethod={selectedMethod}
                            productCount={selectedProducts.length}
                            onAddNew={handleReset}
                            onGoToList={() => router.push('/dashboard/products')}
                            color={getStepColor(3)}
                            isProcessing={isSubmitting}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* İlerleme göstergesi */}
            <div className="mt-8 flex justify-between items-center text-sm text-gray-500 border-t pt-4">
                <div>
                    {currentStep > 0 && currentStep < 3 && (
                        <button
                            onClick={() => setCurrentStep(currentStep - 1)}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            disabled={isSubmitting}
                        >
                            <ArrowLeft className="h-4 w-4 mr-1" />
                            Geri
                        </button>
                    )}
                </div>

                <div className="flex items-center">
                    <span className={`font-medium ${getStepColor(currentStep).replace('bg-', 'text-')}`}>
                        Adım {currentStep + 1}/{steps.length}
                    </span>
                    {currentStep === 3 && (
                        <CheckCircle className="h-4 w-4 ml-2 text-green-500" />
                    )}
                </div>

                <div>
                    {currentStep < 2 && currentStep > 0 && (
                        <button
                            onClick={() => setCurrentStep(currentStep + 1)}
                            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                            disabled={isSubmitting}
                        >
                            İleri
                            <ArrowRight className="h-4 w-4 ml-1" />
                        </button>
                    )}
                </div>
            </div>
        </ComponentCard>
    );
};