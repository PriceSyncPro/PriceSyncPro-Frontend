import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ListChecks, Plus, ArrowRight, Loader2 } from "lucide-react";
import { Typography } from "../atoms/Typography";
import { motion } from "framer-motion";

interface CompletionMessageProps {
    selectedMethod: "manual" | "excel" | null;
    productCount: number;
    onAddNew: () => void;
    onGoToList: () => void;
    color?: string;
    isProcessing?: boolean;
}

export const CompletionMessage: React.FC<CompletionMessageProps> = ({
                                                                        selectedMethod,
                                                                        productCount,
                                                                        onAddNew,
                                                                        onGoToList,
                                                                        color = "bg-green-500",
                                                                        isProcessing = false
                                                                    }) => {
    // Confetti efekti için ref
    const containerRef = React.useRef<HTMLDivElement>(null);

    return (
        <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
            className="flex flex-col items-center text-center py-10 px-6 max-w-xl mx-auto"
        >
            <div className="relative mb-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center"
                >
                    {isProcessing ? (
                        <Loader2 className="h-12 w-12 text-green-500 animate-spin" />
                    ) : (
                        <CheckCircle className="h-12 w-12 text-green-500" />
                    )}
                </motion.div>

                {!isProcessing && (
                    <>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.3 }}
                            className="absolute top-0 right-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center"
                        >
                            <Plus className="h-5 w-5 text-white" />
                        </motion.div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="absolute bottom-0 left-0 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
                        >
                            <ListChecks className="h-5 w-5 text-white" />
                        </motion.div>
                    </>
                )}
            </div>

            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
            >
                <Typography
                    variant="title"
                    className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3"
                >
                    {isProcessing ? "Ürünler İşleniyor..." : "İşlem Başarılı!"}
                </Typography>

                <Typography variant="body" className="text-gray-600 max-w-md mx-auto mb-6">
                    {isProcessing ? (
                        "Ürünleriniz sisteme ekleniyor ve eşleştiriliyor. Bu işlem biraz zaman alabilir."
                    ) : selectedMethod === "manual" ? (
                        <>
                            <span className="font-semibold text-green-600">{productCount}</span> adet ürün başarıyla eklendi ve eşleştirilmek üzere kuyruğa alındı. Ürünleriniz kısa süre içinde kullanıma hazır olacak.
                        </>
                    ) : (
                        <>
                            Excel dosyasındaki ürünler sisteme başarıyla aktarıldı. Tüm veriler işlendi ve ürünleriniz artık sisteme eklenmiş durumda.
                        </>
                    )}
                </Typography>

                {!isProcessing && (
                    <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-8 text-left">
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                            <div className="ml-3">
                                <Typography variant="small" className="font-medium text-green-800">
                                    İşlem Özeti
                                </Typography>
                                <ul className="mt-2 text-sm text-green-700 space-y-1">
                                    <li>• Toplam Ürün: {productCount}</li>
                                    <li>• Yükleme Yöntemi: {selectedMethod === "manual" ? "Manuel Giriş" : "Excel Dosyası"}</li>
                                    <li>• Durum: Başarıyla Tamamlandı</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {!isProcessing && (
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
                >
                    <Button
                        variant="outline"
                        onClick={onAddNew}
                        className="flex-1 border-green-200 text-green-700 hover:bg-green-50 hover:text-green-800 group"
                    >
                        <Plus className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                        Yeni Ürün Ekle
                    </Button>
                    <Button
                        onClick={onGoToList}
                        className={`flex-1 ${color} hover:bg-green-600 group`}
                    >
                        Ürün Listesine Git
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </motion.div>
            )}
        </motion.div>
    );
};
