"use client";
import React, { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import { ProductAddTemplate } from "../templates/ProductAddTemplate";
import { Product } from "../types/types";
import { Step } from "../types/types";
import { motion } from "framer-motion";
import { FileSpreadsheet, Edit, CheckCircle, ArrowRight } from "lucide-react";
import { ProductService } from "@/utils/api/services/productService";
import {toast} from "sonner";

export default function AddProduct(): React.ReactElement {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [selectedMethod, setSelectedMethod] = useState<"manual" | "excel" | null>(null);
    const [productName, setProductName] = useState<string>("");
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Adımları tanımlayalım - renkli ve ikonlu
    const steps: Step[] = [
        {
            id: 0,
            title: "Yükleme Yöntemi",
            icon: <ArrowRight className="h-5 w-5" />,
            color: "bg-blue-500"
        },
        {
            id: 1,
            title: "Ürün Bilgileri",
            icon: <Edit className="h-5 w-5" />,
            color: "bg-purple-500"
        },
        {
            id: 2,
            title: "Önizleme",
            icon: <FileSpreadsheet className="h-5 w-5" />,
            color: "bg-amber-500"
        },
        {
            id: 3,
            title: "Tamamlandı",
            icon: <CheckCircle className="h-5 w-5" />,
            color: "bg-green-500"
        }
    ];

    // Yükleme yöntemini seçme işlevi
    const handleSelectMethod = (method: "manual" | "excel"): void => {
        setSelectedMethod(method);
        // Animasyon için timeout
        setTimeout(() => {
            setCurrentStep(1); // Bir sonraki adıma geç
        }, 300);
    };

    // Ürün ekleme
    const handleAddProduct = (): void => {
        if (productName.trim() === "") return;
        // Basit bir ürün oluştur (gerçek uygulamada API'den gelecek)
        const newProduct: Product = {
            id: Date.now(), // Geçici ID
            name: productName
        };
        // Animasyonlu ekleme
        setSelectedProducts(prev => [...prev, newProduct]);
        setProductName(""); // Input'u temizle
    };

    // Ürün kaldırma
    const handleRemoveProduct = (productId: number): void => {
        setSelectedProducts(selectedProducts.filter(p => p.id !== productId));
    };

    // Sıfırlama işlevi
    const handleReset = (): void => {
        setCurrentStep(0);
        setSelectedProducts([]);
        setProductName("");
        setSelectedMethod(null);
    };

    // Son adıma geçildiğinde ürünleri API'ye gönder ve konfeti efekti
    // Ürün ekleme işlemini tamamla
    // Ürün ekleme işlemini tamamla
    const handleComplete = async (): Promise<void> => {
        // Ürün kontrolü
        if (selectedMethod === "manual" && selectedProducts.length === 0) {
            toast.warning('Lütfen en az bir ürün ekleyin.');
            return;
        }
        // Yükleme durumunu başlat
        setIsSubmitting(true);
        // Ürün verilerini hazırla
        const productData = {
            products: selectedProducts.map((product: Product) => ({
                name: product.name
            })),
        };
        try {
            console.log(productData)
            // API çağrısını yap
            let success: boolean = false;
            if (selectedMethod === "manual") {
                // Manuel ekleme için API çağrısı
                const response = await ProductService.create(productData);
                success = Boolean(response && response.isSuccessful);
            } else {
                // Excel yükleme için farklı bir API çağrısı (örnek)
                // const response = await ProductService.uploadExcel(excelFile);
                // success = Boolean(response && response.isSuccessful);
                // Şimdilik Excel yüklemesini başarılı sayalım
                success = true;
            }
            // Sonuca göre işlem yap
            if (success) {
                // Başarılı olursa son adıma geç
                setCurrentStep(3);
                // Konfeti efekti
                // Başarı mesajı
                const productCount: number | string = selectedMethod === "manual"
                    ? selectedProducts.length
                    : "Excel'den yüklenen";
                toast.success(`${productCount} ürün başarıyla eklendi.`);
            } else {
                // Hata mesajı
                toast.error("Ürünler eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
            }
        } catch (error: unknown) {
            // Hata durumunda
            console.error("Ürün ekleme işlemi başarısız:", error);
            // Hata mesajını daha detaylı göster
            if (error instanceof Error) {
                toast.error(`Hata: ${error.message}`);
            } else {
                toast.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            }
        } finally {
            // Her durumda yükleme durumunu sonlandır
            setIsSubmitting(false);
        }
    };
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-gradient-to-br from-white to-blue-50"
        >
            <PageBreadcrumb pageTitle="Ürün Ekle" />
            <motion.div
                className="space-y-4 mx-auto p-6"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
            >
                <ProductAddTemplate
                    currentStep={currentStep}
                    steps={steps}
                    selectedMethod={selectedMethod}
                    productName={productName}
                    setProductName={setProductName}
                    selectedProducts={selectedProducts}
                    handleSelectMethod={handleSelectMethod}
                    handleAddProduct={handleAddProduct}
                    handleRemoveProduct={handleRemoveProduct}
                    setCurrentStep={setCurrentStep}
                    handleReset={handleReset}
                    isSubmitting={isSubmitting}
                    handleComplete={handleComplete}
                />
            </motion.div>
        </motion.div>
    );
}
