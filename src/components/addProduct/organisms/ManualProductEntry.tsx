import React, { ChangeEvent } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductItem } from "../molecules/ProductItem";
import { Typography } from "../atoms/Typography";
import { Product } from "../types/types";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Package, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ManualProductEntryProps {
    productName: string;
    setProductName: (name: string) => void;
    selectedProducts: Product[];
    handleAddProduct: () => void;
    handleRemoveProduct: (id: number) => void;
    onContinue: () => void;
    buttonColor?: string;
}

export const ManualProductEntry: React.FC<ManualProductEntryProps> = ({
                                                                          productName,
                                                                          setProductName,
                                                                          selectedProducts,
                                                                          handleAddProduct,
                                                                          handleRemoveProduct,
                                                                          onContinue,
                                                                          buttonColor = "bg-blue-500"
                                                                      }) => {


    const handleProductNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setProductName(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && productName.trim() !== '') {
            handleAddProduct();
        }
    };

    const handleAddWithSeller = () => {
        if (productName.trim() !== '') {
            handleAddProduct();
        }
    };

    return (
        <Card className="border-t-4 border-t-blue-500 shadow-md">
            <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="text-xl text-blue-700">Ürün Ekle</CardTitle>
                        <CardDescription className="mt-1">
                            Eklemek istediğiniz ürünlerin adlarını ve satıcılarını yazın.
                        </CardDescription>
                    </div>
                    <Badge variant="outline" className="px-3 py-1">
                        {selectedProducts.length} ürün
                    </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-4">
                        <div className="relative">
                            <div className="mb-2 text-sm font-medium text-gray-700">
                                Ürün Adı
                            </div>
                            <input
                                type="text"
                                value={productName}
                                onChange={handleProductNameChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Ürün adını yazın..."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                        {/* <div className="relative">
                            <div className="mb-2 text-sm font-medium text-gray-700">
                                Satıcı
                            </div>
                            <input
                                type="text"
                                value={sellerName}
                                onChange={handleSellerNameChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Satıcı adını yazın (opsiyonel)..."
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div> */}
                    </div>
                    <div className="flex justify-end">
                        <Button
                            onClick={handleAddWithSeller}
                            disabled={!productName.trim()}
                            className="h-9 px-4"
                        >
                            <Plus className="h-4 w-4 mr-1"/>
                            Ürün Ekle
                        </Button>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                            <Typography variant="body" className="font-medium text-gray-700 flex items-center">
                                <Package className="h-4 w-4 mr-2 text-blue-500"/>
                                Eklenen Ürünler
                            </Typography>
                        </div>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                            <AnimatePresence initial={false}>
                                {selectedProducts.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-center py-8 text-gray-500 border border-dashed rounded-md bg-white"
                                    >
                                        <Package className="h-12 w-12 mx-auto text-gray-300 mb-2" />
                                        <p>Henüz ürün eklenmedi.</p>
                                        <p className="text-sm mt-1">Yukarıdan ürün ve satıcı bilgilerini girerek ekleyebilirsiniz.</p>
                                    </motion.div>
                                ) : (
                                    selectedProducts.map(product => (
                                        <motion.div
                                            key={product.id}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ProductItem
                                                product={product}
                                                onRemove={() => handleRemoveProduct(product.id)}
                                            />
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4 border-t mt-4">
                <Typography variant="small" className="text-gray-500">
                    {selectedProducts.length > 0
                        ? `${selectedProducts.length} ürün eklediniz`
                        : "Devam etmek için en az bir ürün ekleyin"}
                </Typography>
                <Button
                    onClick={onContinue}
                    disabled={selectedProducts.length === 0}
                    className={`${buttonColor} hover:${buttonColor.replace('bg-', 'bg-')}-600`}
                >
                    Devam Et
                    <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
            </CardFooter>
        </Card>
    );
};
