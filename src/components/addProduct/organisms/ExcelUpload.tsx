import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon } from "../atoms/Icon";
import { Upload } from "lucide-react";
import { ExcelIcon } from "@/icons";
import { Typography } from "../atoms/Typography";

interface ExcelUploadProps {
    onContinue: () => void;
    buttonColor?: string;
}

export const ExcelUpload: React.FC<ExcelUploadProps> = ({ onContinue }) => {
    return (
        <Card>
            <CardContent className="pt-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                    <Icon icon={Upload} size="2xl" className="text-gray-400 mx-auto mb-4" />
                    <Typography variant="body" className="text-lg mb-4">
                        Excel dosyanızı buraya sürükleyin veya seçin
                    </Typography>
                    <Typography variant="caption" className="mb-6">
                        Desteklenen formatlar: .xlsx, .xls
                    </Typography>
                    <Button variant="outline">Dosya Seç</Button>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                    <a href="#" className="flex items-center">
                        <ExcelIcon style={{ height: '20px', width: 'auto' }} className="mr-2" />
                        Şablon İndir
                    </a>
                </Button>
                <Button onClick={onContinue}>Devam Et</Button>
            </CardFooter>
        </Card>
    );
};
