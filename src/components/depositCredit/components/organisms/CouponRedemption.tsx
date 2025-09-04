// src/components/organisms/CouponRedemption.tsx
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gift, CheckCircle, XCircle, PartyPopper, Sparkles, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface CouponRedemptionProps {
    couponCode: string;
    setCouponCode: (code: string) => void;
    redeemCoupon: () => Promise<void>;
    couponStatus: 'valid' | 'invalid' | null;
    isProcessing: boolean;
    error: string | null;
}

export const CouponRedemption: React.FC<CouponRedemptionProps> = ({
                                                                      couponCode,
                                                                      setCouponCode,
                                                                      redeemCoupon,
                                                                      couponStatus,
                                                                      isProcessing,
                                                                      error,
                                                                  }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative px-4 py-10 mx-auto max-w-4xl"
        >
            {/* Dekoratif hediye kutuları ve süs öğeleri */}
            <motion.div
                className="absolute -top-6 -left-6 text-pink-500 transform rotate-12"
                animate={{
                    rotate: [12, -5, 12],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            >
                <Gift size={40} />
            </motion.div>

            <motion.div
                className="absolute top-1/4 -left-3 text-indigo-500 transform -rotate-12"
                animate={{
                    rotate: [-12, 5, -12],
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                }}
            >
                <Package size={32} />
            </motion.div>

            <motion.div
                className="absolute top-3/4 -left-4 text-amber-500 transform rotate-45"
                animate={{
                    rotate: [45, 30, 45],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.2
                }}
            >
                <Gift size={36} />
            </motion.div>

            <motion.div
                className="absolute -top-4 right-10 text-emerald-500 transform -rotate-12"
                animate={{
                    rotate: [-12, 0, -12],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 7,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.7
                }}
            >
                <PartyPopper size={30} />
            </motion.div>

            <motion.div
                className="absolute top-1/3 -right-4 text-purple-500 transform rotate-12"
                animate={{
                    rotate: [12, 0, 12],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.3
                }}
            >
                <Gift size={42} />
            </motion.div>

            <motion.div
                className="absolute bottom-10 -right-5 text-blue-500 transform -rotate-12"
                animate={{
                    rotate: [-12, 5, -12],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.8
                }}
            >
                <Sparkles size={34} />
            </motion.div>

            <Card className="bg-white dark:bg-slate-800 shadow-xl border-0 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500"></div>

                <CardContent className="p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center shadow-lg">
                            <Gift className="w-10 h-10 text-white" />
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Kupon Kodunu Kullan</h2>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
                        Sahip olduğun kupon kodunu girerek anında hesabına kredi yükle
                    </p>

                    <div className="space-y-6 max-w-md mx-auto">
                        <div className="relative">
                            <Input
                                value={couponCode}
                                onChange={(e) => setCouponCode(e.target.value)}
                                placeholder="HEDIYE2023"
                                disabled={isProcessing}
                                className="w-full h-14 px-6 text-lg text-center font-medium tracking-wider uppercase border-2 border-gray-200 dark:border-gray-700 focus:border-purple-500 focus:ring-purple-500 rounded-xl bg-gray-50 dark:bg-gray-800"
                            />

                            <motion.div
                                className="absolute -top-3 -right-3 text-purple-500"
                                animate={{
                                    rotate: [0, 10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }}
                            >
                                <Sparkles className="w-6 h-6" />
                            </motion.div>
                        </div>

                        <Button
                            onClick={redeemCoupon}
                            disabled={!couponCode || isProcessing}
                            className="w-full h-14 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-md"
                        >
                            {isProcessing ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span>İşleniyor...</span>
                                </div>
                            ) : (
                                <span>Kuponu Kullan</span>
                            )}
                        </Button>

                        {couponStatus === 'valid' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: [0.95, 1.02, 1]
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <Alert className="border-0 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 text-emerald-800 dark:text-emerald-300 rounded-xl shadow-sm">
                                    <div className="flex items-center gap-2 py-1">
                                        <CheckCircle className="h-6 w-6 text-emerald-500 dark:text-emerald-400" />
                                        <AlertDescription className="font-medium text-base">
                                            Harika! Kupon başarıyla kullanıldı!
                                        </AlertDescription>
                                    </div>
                                </Alert>
                            </motion.div>
                        )}

                        {couponStatus === 'invalid' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    scale: [0.95, 1.02, 1]
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <Alert className="border-0 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 text-red-800 dark:text-red-300 rounded-xl shadow-sm">
                                    <div className="flex items-center gap-2 py-1">
                                        <XCircle className="h-6 w-6 text-red-500" />
                                        <AlertDescription className="font-medium text-base">
                                            {error || "Geçersiz kupon kodu. Lütfen kontrol edip tekrar deneyin."}
                                        </AlertDescription>
                                    </div>
                                </Alert>
                            </motion.div>
                        )}

                        <div className="text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500 italic">
                                Kupon kodunu büyük harflerle girmen yeterli
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Alt bölgedeki süslemeler */}
            <div className="absolute -bottom-5 left-1/4 text-emerald-500 transform rotate-12 opacity-80">
                <Gift size={26} />
            </div>

            <motion.div
                className="absolute -bottom-3 right-1/4 text-yellow-500 transform -rotate-12"
                animate={{
                    rotate: [-12, 5, -12],
                    y: [0, -5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            >
                <PartyPopper size={24} />
            </motion.div>
        </motion.div>
    );
};