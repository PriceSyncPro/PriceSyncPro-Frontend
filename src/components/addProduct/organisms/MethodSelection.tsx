import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon, FileSpreadsheet, HandMetal, ArrowRight, Download, Clock } from "lucide-react";
import { Typography } from "../atoms/Typography";
import { motion } from "framer-motion";

type UploadMethod = "manual" | "excel";

interface MethodSelectionProps {
    onSelectMethod: (method: UploadMethod) => void;
}

export const MethodSelection: React.FC<MethodSelectionProps> = ({ onSelectMethod }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-10 items-center max-w-5xl mx-auto py-8"
        >
            <div className="text-center space-y-3">
                <Typography variant="title" className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Ürünleri Yükleme Yöntemi
                </Typography>
                <Typography variant="body" className="text-gray-500 max-w-xl mx-auto">
                    Ürünlerinizi sisteme eklemek için manuel yükleme yöntemini kullanabilirsiniz. Bu yöntem hızlı ve kolay bir şekilde ürünlerinizi yüklemenizi sağlar.
                </Typography>
            </div>
            <section className="grid gap-8 grid-cols-1 w-full md:grid-cols-2 md:w-full">
                <MethodCard
                    title="Manuel Yükleme"
                    description="Ürünlerinizi tek tek eklemek için ideal. Basit ve hızlı bir şekilde ürün bilgilerini girebilirsiniz."
                    icon={<HandMetal className="h-12 w-12 text-blue-500" />}
                    color="blue"
                    features={[
                        "Tek tek ürün ekleme",
                        "Detaylı bilgi girişi",
                        "Anında önizleme",
                        "Kolay düzenleme"
                    ]}
                    onClick={() => onSelectMethod("manual")}
                />
                <DisabledMethodCard
                    title="Excel ile Yükleme"
                    description="Çok sayıda ürünü hızlıca yüklemek için mükemmel. Excel dosyanızı yükleyerek tüm ürünlerinizi tek seferde ekleyin."
                    icon={<FileSpreadsheet className="h-12 w-12 text-gray-400" />}
                    features={[
                        "Toplu ürün yükleme",
                        "Zaman tasarrufu",
                        "Veri doğrulama",
                        "Hızlı içe aktarım"
                    ]}
                    comingSoonText="Yakında Aktif Olacak"
                />
            </section>
        </motion.div>
    );
};

interface MethodCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    color: "blue" | "green";
    features: string[];
    tooltip?: string;
    onClick: () => void;
}

const MethodCard: React.FC<MethodCardProps> = ({
                                                   title,
                                                   description,
                                                   icon,
                                                   color,
                                                   features,
                                                   tooltip,
                                                   onClick
                                               }) => {
    const colorClasses = {
        blue: {
            border: "border-blue-200 hover:border-blue-400",
            gradient: "from-blue-50 to-blue-100",
            button: "bg-blue-500 hover:bg-blue-600",
            icon: "bg-blue-100 text-blue-600",
            feature: "bg-blue-50 text-blue-700"
        },
        green: {
            border: "border-green-200 hover:border-green-400",
            gradient: "from-green-50 to-green-100",
            button: "bg-green-500 hover:bg-green-600",
            icon: "bg-green-100 text-green-600",
            feature: "bg-green-50 text-green-700"
        }
    };

    return (
        <motion.div
            whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            transition={{ duration: 0.2 }}
        >
            <Card
                className={`overflow-hidden border-2 ${colorClasses[color].border} transition-all duration-300 h-full flex flex-col`}
                onClick={onClick}
            >
                {tooltip && (
                    <div className="absolute top-3 right-3 z-10">
                        <TooltipProvider delayDuration={0}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm shadow-sm"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <InfoIcon className="h-4 w-4 text-gray-600" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent className="text-sm p-4 max-w-xs">
                                    <p>{tooltip}</p>
                                    {color === "green" && (
                                        <Button
                                            variant="link"
                                            size="sm"
                                            className="mt-2 p-0 h-auto text-green-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Şablon indirme işlevi buraya eklenebilir
                                                alert("Excel şablonu indiriliyor...");
                                            }}
                                        >
                                            <Download className="h-3 w-3 mr-1" />
                                            Excel şablonunu indir
                                        </Button>
                                    )}
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                )}
                <div className={`h-3 w-full bg-gradient-to-r ${colorClasses[color].gradient}`}></div>
                <CardHeader className="pt-8 pb-4">
                    <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-xl ${colorClasses[color].icon}`}>
                            {icon}
                        </div>
                        <CardTitle className="text-xl ml-4 text-gray-800">{title}</CardTitle>
                    </div>
                    <CardDescription className="text-base text-gray-600">{description}</CardDescription>
                </CardHeader>
                <div className="px-6 flex-grow">
                    <ul className="space-y-2">
                        {features.map((feature, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="flex items-center"
                            >
                                <span className={`inline-block w-2 h-2 rounded-full ${colorClasses[color].feature} mr-2`}></span>
                                <span className="text-sm text-gray-600">{feature}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>
                <CardFooter className="pt-6 pb-6">
                    <Button
                        variant="default"
                        className={`w-full text-white ${colorClasses[color].button} group relative overflow-hidden`}
                        onClick={onClick}
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            {color === "blue" ? "Manuel Yükle" : "Excel ile Yükle"}
                            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

interface DisabledMethodCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    comingSoonText: string;
}

const DisabledMethodCard: React.FC<DisabledMethodCardProps> = ({
                                                                   title,
                                                                   description,
                                                                   icon,
                                                                   features,
                                                                   comingSoonText
                                                               }) => {
    return (
        <div className="relative">
            {/* Devre dışı kartın üzerindeki "Yakında" etiketi */}
            <div className="absolute -top-2 -right-2 z-20">
                <div className="bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {comingSoonText}
                </div>
            </div>

            {/* Devre dışı kart */}
            <Card className="overflow-hidden border-2 border-gray-200 h-full flex flex-col opacity-70 relative">
                <div className="absolute inset-0 bg-gray-100/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
                    <div className="p-4 rounded-lg bg-white/80 shadow-lg border border-gray-200 text-center">
                        <Clock className="h-8 w-8 text-gray-500 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-700">Bu özellik yakında aktif olacak</p>
                    </div>
                </div>
                <div className="h-3 w-full bg-gradient-to-r from-gray-50 to-gray-100"></div>
                <CardHeader className="pt-8 pb-4">
                    <div className="flex items-center mb-4">
                        <div className="p-3 rounded-xl bg-gray-100">
                            {icon}
                        </div>
                        <CardTitle className="text-xl ml-4 text-gray-600">{title}</CardTitle>
                    </div>
                    <CardDescription className="text-base text-gray-500">{description}</CardDescription>
                </CardHeader>
                <div className="px-6 flex-grow">
                    <ul className="space-y-2">
                        {features.map((feature, index) => (
                            <li
                                key={index}
                                className="flex items-center"
                            >
                                <span className="inline-block w-2 h-2 rounded-full bg-gray-200 mr-2"></span>
                                <span className="text-sm text-gray-500">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <CardFooter className="pt-6 pb-6">
                    <Button
                        variant="outline"
                        className="w-full text-gray-500 border-gray-300 cursor-not-allowed"
                        disabled
                    >
                        <span className="flex items-center justify-center">
                            Excel ile Yükle
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
};