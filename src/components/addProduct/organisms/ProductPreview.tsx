import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Typography } from "../atoms/Typography";
import { Product } from "../types/types";
import { CheckCircle, Edit, FileCheck, AlertTriangle, Package, Store, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProductPreviewProps {
    selectedMethod: "manual" | "excel" | null;
    selectedProducts: Product[];
    onEdit: () => void;
    onConfirm: () => Promise<void>;
    buttonColor?: string;
    isSubmitting?: boolean;
}

export const ProductPreview: React.FC<ProductPreviewProps> = ({
                                                                  selectedMethod,
                                                                  selectedProducts,
                                                                  onEdit,
                                                                  onConfirm,
                                                                  buttonColor = "bg-amber-500",
                                                                  isSubmitting = false
                                                              }) => {
    return (
        <Card className="border-t-4 border-t-amber-500 shadow-lg">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                            <FileCheck className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                            <CardTitle className="text-xl text-amber-700">Ürün Önizleme</CardTitle>
                            <CardDescription className="mt-1">
                                Eklenen ürün ve satıcı bilgilerini kontrol edin.
                            </CardDescription>
                        </div>
                    </div>
                    <Badge variant="outline" className="px-3 py-1.5 bg-amber-50 text-amber-700 border-amber-200 font-medium">
                        {selectedMethod === "manual"
                            ? `${selectedProducts.length} ürün`
                            : "Excel Dosyası"}
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-5"
                >
                    {selectedMethod === "manual" ? (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                                        <ShoppingBag className="h-4 w-4 text-amber-700" />
                                    </div>
                                    <Typography variant="body" className="font-medium text-amber-800">
                                        Toplam {selectedProducts.length} ürün eklenecek
                                    </Typography>
                                </div>
                                {selectedProducts.length > 0 && (
                                    <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                                        <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                                        <span className="text-sm font-medium text-green-600">Hazır</span>
                                    </div>
                                )}
                            </div>

                            <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                    <tr className="bg-gradient-to-r from-amber-50 to-amber-100">
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">No</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <Package className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                                                Ürün Adı
                                            </div>
                                        </th>
                                        {/* <th className="px-6 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <Store className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                                                Satıcı
                                            </div>
                                        </th> */}
                                        <th className="px-6 py-3.5 text-right text-xs font-semibold text-amber-800 uppercase tracking-wider">Durum</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    {selectedProducts.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center">
                                                <div className="max-w-xs mx-auto">
                                                    <div className="p-4 rounded-full bg-amber-50 mx-auto w-16 h-16 flex items-center justify-center mb-3">
                                                        <AlertTriangle className="h-8 w-8 text-amber-400" />
                                                    </div>
                                                    <p className="text-gray-700 font-medium">Henüz ürün eklenmemiş.</p>
                                                    <p className="text-sm text-gray-500 mt-2">Düzenle butonuna tıklayarak ürün ekleyebilirsiniz.</p>
                                                    <Button
                                                        variant="outline"
                                                        onClick={onEdit}
                                                        className="mt-4 border-amber-200 text-amber-700 hover:bg-amber-50"
                                                    >
                                                        <Edit className="h-4 w-4 mr-2" />
                                                        Ürün Ekle
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        selectedProducts.map((product, index) => (
                                            <tr key={product.id} className="hover:bg-amber-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{index + 1}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                </td>
                                                {/* <td className="px-6 py-4 whitespace-nowrap">
                                                    {product.sellerName ? (
                                                        <div className="text-sm text-gray-600">{product.sellerName}</div>
                                                    ) : (
                                                        <span className="text-xs text-gray-400 italic">Belirtilmemiş</span>
                                                    )}
                                                </td> */}
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                                        <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                                                        Hazır
                                                    </Badge>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-5">
                            <div className="flex items-center justify-between bg-gradient-to-r from-amber-50 to-amber-100 p-4 rounded-lg border border-amber-200 shadow-sm">
                                <div className="flex items-center">
                                    <div className="h-8 w-8 rounded-full bg-amber-200 flex items-center justify-center mr-3">
                                        <FileCheck className="h-4 w-4 text-amber-700" />
                                    </div>
                                    <Typography variant="body" className="font-medium text-amber-800">
                                        Excel dosyasından yüklenen ürünler (3)
                                    </Typography>
                                </div>
                                <div className="flex items-center bg-white px-3 py-1.5 rounded-full shadow-sm">
                                    <CheckCircle className="h-4 w-4 text-green-500 mr-1.5" />
                                    <span className="text-sm font-medium text-green-600">Hazır</span>
                                </div>
                            </div>

                            <div className="border rounded-xl overflow-hidden shadow-sm bg-white">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                    <tr className="bg-gradient-to-r from-amber-50 to-amber-100">
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <Package className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                                                Ürün Adı
                                            </div>
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">
                                            <div className="flex items-center">
                                                <Store className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                                                Satıcı
                                            </div>
                                        </th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Kategori</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Fiyat</th>
                                        <th className="px-6 py-3.5 text-left text-xs font-semibold text-amber-800 uppercase tracking-wider">Stok</th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-100">
                                    <tr className="hover:bg-amber-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Örnek Ürün 1</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">Teknoloji A.Ş.</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Elektronik</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">1.299,99 ₺</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Badge className="bg-green-100 text-green-800 border-0">50 adet</Badge>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-amber-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Örnek Ürün 2</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">Moda Butiği</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Giyim</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">299,99 ₺</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Badge className="bg-green-100 text-green-800 border-0">100 adet</Badge>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-amber-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">Örnek Ürün 3</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-600">Ev Dekor Ltd.</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ev & Yaşam</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">499,99 ₺</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <Badge className="bg-yellow-100 text-yellow-800 border-0">25 adet</Badge>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </motion.div>
            </CardContent>
            <CardFooter className="flex justify-between pt-5 border-t mt-6">
                <Button
                    variant="outline"
                    onClick={onEdit}
                    className="border-amber-200 text-amber-700 hover:bg-amber-50"
                >
                    <Edit className="h-4 w-4 mr-2" />
                    Düzenle
                </Button>
                <Button
                    onClick={onConfirm}
                    disabled={isSubmitting || (selectedMethod === "manual" && selectedProducts.length === 0)}
                    className={`${buttonColor} hover:opacity-90 transition-opacity`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Kaydediliyor...
                        </>
                    ) : (
                        <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Onayla ve Kaydet
                        </>
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};
