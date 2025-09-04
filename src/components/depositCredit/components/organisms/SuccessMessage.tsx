import React from "react";
import { motion } from "framer-motion";
import { Button } from "../atoms/Button";
import { Typography } from "../atoms/Typography";
import {
    Gift,
    PartyPopper,
    Sparkles,
    Package,
    CreditCard,
    ArrowRight,
    RefreshCw,
    Wallet
} from "lucide-react";

interface SuccessMessageProps {
    couponValue: string;
    transactionId: string;
    date: string;
    method?: 'Kupon' | 'Kredi Kartı';
    onNewTransaction?: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({
                                                                  couponValue,
                                                                  transactionId,
                                                                  date,
                                                                  method = 'Kupon',
                                                                  onNewTransaction
                                                              }) => {
    const isKupon = method === 'Kupon';

    // Metoda göre renk teması belirle
    const themeColors = isKupon
        ? {
            gradient: "from-emerald-500 to-teal-500",
            text: "from-emerald-600 to-teal-500",
            bg: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
            border: "border-emerald-200 dark:border-emerald-800/30",
            highlight: "text-emerald-600 dark:text-emerald-400",
            button: "from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        }
        : {
            gradient: "from-purple-500 to-blue-500",
            text: "from-purple-600 to-blue-500",
            bg: "from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20",
            border: "border-purple-200 dark:border-purple-800/30",
            highlight: "text-blue-600 dark:text-blue-400",
            button: "from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        };

    return (
        <div className="relative py-10 px-4 mx-auto max-w-2xl">
            {/* Dekoratif hediye kutuları ve süslemeler */}
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
                {isKupon ? <Gift size={40} /> : <Wallet size={40} />}
            </motion.div>
            <motion.div
                className="absolute top-1/4 -left-3 text-indigo-500 transform -rotate-12"
                animate={{
                    rotate: [-12, 5, -12],
                    y: [0, -5, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: 0.5
                }}
            >
                {isKupon ? <Package size={32} /> : <CreditCard size={32} />}
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
                {isKupon ? <Gift size={42} /> : <CreditCard size={42} />}
            </motion.div>
            <motion.div
                className="absolute bottom-20 -right-5 text-blue-500 transform -rotate-12"
                animate={{
                    rotate: [-12, 5, -12],
                    y: [0, -5, 0],
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

            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="relative bg-white dark:bg-slate-800 rounded-xl shadow-xl border-0 p-8"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-t-xl"></div>

                <div className="flex justify-center mb-8">
                    <div className="relative">
                        <div className={`bg-gradient-to-br ${themeColors.gradient} w-24 h-24 rounded-full flex items-center justify-center shadow-lg`}>
                            {isKupon ?
                                <Gift className="h-12 w-12 text-white" /> :
                                <CreditCard className="h-12 w-12 text-white" />
                            }
                        </div>
                        <motion.div
                            className="absolute -top-3 -right-3 text-yellow-500"
                            animate={{
                                rotate: [0, 360],
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                rotate: { duration: 15, repeat: Infinity, ease: "linear" },
                                scale: { duration: 3, repeat: Infinity, repeatType: "reverse" }
                            }}
                        >
                            <Sparkles className="w-8 h-8" />
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-2 -left-2 text-pink-500"
                            animate={{
                                rotate: [0, -360],
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                                scale: { duration: 4, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
                            }}
                        >
                            <PartyPopper className="w-8 h-8" />
                        </motion.div>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center"
                >
                    <Typography
                        variant="title"
                        className={`mb-2 text-3xl font-bold bg-gradient-to-r ${themeColors.text} bg-clip-text text-transparent`}
                    >
                        {isKupon ? 'Kupon Başarıyla Kullanıldı!' : 'Ödeme Başarıyla Tamamlandı!'}
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <Typography variant="body" className="mb-8 max-w-md mx-auto text-gray-600 dark:text-gray-300">
                        {isKupon ? (
                            <>{couponValue} ₺ değerindeki kupon başarıyla kullanıldı.</>
                        ) : (
                            <>{couponValue} ₺ tutarındaki ödeme başarıyla gerçekleştirildi.</>
                        )}
                        {" "}Kredileriniz hesabınıza yüklendi.
                    </Typography>
                </motion.div>

                <motion.div
                    className={`p-6 rounded-xl max-w-md mx-auto mb-8 bg-gradient-to-r ${themeColors.bg} border-0 shadow-sm`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600 dark:text-gray-400">İşlem Numarası</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{transactionId}</span>
                    </div>

                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600 dark:text-gray-400">Ödeme Yöntemi</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200 flex items-center">
              {isKupon ? (
                  <><Gift className="w-4 h-4 mr-1" /> Kupon</>
              ) : (
                  <><CreditCard className="w-4 h-4 mr-1" /> Kredi Kartı</>
              )}
            </span>
                    </div>

                    <div className="flex justify-between mb-4">
                        <span className="text-gray-600 dark:text-gray-400">Tarih</span>
                        <span className="font-medium text-gray-800 dark:text-gray-200">{date}</span>
                    </div>

                    <div className={`flex justify-between pt-3 border-t ${themeColors.border}`}>
                        <span className="text-gray-600 dark:text-gray-400">Yüklenen Kredi</span>
                        <span className={`font-bold text-lg ${themeColors.highlight}`}>{couponValue} ₺</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Button
                        onClick={() => window.location.href = "/"}
                        className={`bg-gradient-to-r ${themeColors.button} text-white px-8 py-3 text-base sm:text-lg font-medium rounded-xl shadow-md transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center`}
                    >
                        Panele Dön
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                    {onNewTransaction && (
                        <Button
                            onClick={onNewTransaction}
                            className="bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 px-8 py-3 text-base sm:text-lg font-medium rounded-xl shadow-sm transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            <RefreshCw className="mr-2 h-5 w-5" />
                            Yeni İşlem
                        </Button>
                    )}
                </motion.div>
            </motion.div>

            {/* Alt bölgedeki süslemeler */}
            <div className="absolute -bottom-5 left-1/4 text-emerald-500 transform rotate-12 opacity-80">
                {isKupon ? <Gift size={26} /> : <Wallet size={26} />}
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
        </div>
    );
};
