"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetContent, SheetHeader, SheetOverlay, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

// Jeton fiyatı (1 jeton = 0.5 TL)
const TOKEN_PRICE = 0.5;

// TL'den jeton hesaplama
const calculateTokens = (tlAmount: number) => {
  return Math.floor(tlAmount / TOKEN_PRICE);
};

// Jeton içerik componenti (hem popover hem sheet için)
const BalanceContent = ({
  user,
  customAmount,
  setCustomAmount,
  handleQuickPurchase,
  handleCustomPurchase,
  isSheet = false
}: {
  user: any;
  customAmount: string;
  setCustomAmount: (value: string) => void;
  handleQuickPurchase: (amount: number) => void;
  handleCustomPurchase: () => void;
  isSheet?: boolean;
}) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        {/* Jeton Bakiyesi */}
        <div className={`text-center ${isSheet ? 'mb-6 pt-2' : 'mb-8'}`}>
          <span className="text-sm text-muted-foreground block mb-1">
            Mevcut Bakiye
          </span>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-4xl font-light">{user?.balance || 0}</span>
            <span className="text-lg text-orange-600 dark:text-orange-400 font-medium">
              Jeton
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            1 Jeton = {TOKEN_PRICE}₺
          </span>
        </div>

        {/* Hızlı Satın Alma */}
        <div className="mb-6">
          <h6 className="mb-3 text-sm font-medium text-muted-foreground">
            Hızlı Jeton Satın Al
          </h6>
          <div className="grid grid-cols-3 gap-3">
            {[50, 100, 200].map((amount) => (
              <Button
                key={amount}
                variant="outline"
                onClick={() => handleQuickPurchase(amount)}
                className="h-auto p-3 flex flex-col items-center gap-1 hover:border-orange-500 hover:bg-orange-50 dark:hover:bg-orange-950 transition-all"
              >
                <div className="font-bold text-orange-600 dark:text-orange-400">
                  {calculateTokens(amount)}
                </div>
                <div className="text-xs text-muted-foreground">{amount}₺</div>
              </Button>
            ))}
          </div>
        </div>

        {/* Özel Tutar */}
        <div className={isSheet ? 'mb-6' : 'mb-8'}>
          <h6 className="mb-3 text-sm font-medium text-muted-foreground">
            Özel Tutar
          </h6>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="relative flex-1">
                <Input
                  type="number"
                  value={customAmount}
                  onChange={(e) => setCustomAmount(e.target.value)}
                  placeholder="Tutar giriniz"
                  className="pr-8"
                  min="0"
                  step="10"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground pointer-events-none">
                  ₺
                </span>
              </div>
              <Button
                onClick={handleCustomPurchase}
                disabled={!customAmount || parseFloat(customAmount) <= 0}
                className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 disabled:opacity-50"
              >
                Satın Al
              </Button>
            </div>
            {customAmount && parseFloat(customAmount) > 0 && (
              <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg animate-in fade-in-50 duration-200">
                <span className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                  {calculateTokens(parseFloat(customAmount))} jeton alacaksınız
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`flex gap-3 ${isSheet ? 'pt-4 border-t mt-auto' : 'pt-4 border-t'}`}>
        <Button
          asChild
          className="flex-1 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
        >
          <Link href="/dashboard/deposit-credit">Jeton Satın Al</Link>
        </Button>
        <Button asChild variant="secondary" className="flex-1">
          <Link href="/dashboard/transactions">Tüm Geçmiş</Link>
        </Button>
      </div>
    </div>
  );
};

export default function BalanceDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const { user } = useAuth();

  // Ekran boyutunu kontrol et
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const handleQuickPurchase = (tlAmount: number) => {
    const tokens = calculateTokens(tlAmount);
    console.log(`${tlAmount}₺ karşılığında ${tokens} jeton satın alınacak`);
    // TODO: API çağrısı yapılacak
  };

  const handleCustomPurchase = () => {
    if (customAmount && parseFloat(customAmount) > 0) {
      const tokens = calculateTokens(parseFloat(customAmount));
      console.log(`${customAmount}₺ karşılığında ${tokens} jeton satın alınacak`);
      // TODO: API çağrısı yapılacak
      setCustomAmount("");
      setIsOpen(false);
    }
  };

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Trigger Button Component
  const TriggerButton = (
    <Button
      variant="outline"
      className="relative flex items-center justify-center transition-all bg-gradient-to-r from-amber-50 to-orange-50 border-gray-200 hover:from-amber-100 hover:to-orange-100 h-11 px-4 hover:border-orange-200 hover:shadow-md dark:from-gray-800 dark:to-gray-700 dark:border-gray-700 dark:hover:from-gray-700 dark:hover:to-orange-900 group"
    >
      <span className="flex items-center gap-2">
        <span className="flex items-center justify-center w-7 h-7 bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 rounded-full dark:from-amber-900 dark:to-orange-900 dark:text-orange-300 group-hover:scale-110 transition-transform duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4"
          >
            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.112 2.178.502.4 1.102.647 1.72.756v2.816a2.251 2.251 0 01-.921-.421c-.427-.32-.579-.686-.579-.991a.75.75 0 00-1.5 0c0 .964.4 1.856 1.112 2.422.502.4 1.102.647 1.72.756V18a.75.75 0 001.5 0v-.816a3.836 3.836 0 001.72-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.112-2.178a3.836 3.836 0 00-1.72-.756V9.5c.568.059 1.068.24 1.414.502.427.32.579.686.579.991a.75.75 0 001.5 0c0-.964-.4-1.856-1.112-2.422A3.836 3.836 0 0012.75 6.816V6z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <span className="font-medium">
          Jeton:{" "}
          <span className="text-orange-600 dark:text-orange-400 font-bold group-hover:animate-pulse">
            {user?.balance || 0}
          </span>
        </span>
      </span>
    </Button>
  );

  // Mobile: Sheet kullan
  // Mobile: Sheet kullan
  if (isMobile) {
    return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>{TriggerButton}</SheetTrigger>
        <SheetOverlay className="z-[2]" />
        <SheetContent
          side="bottom"
          className="h-[85vh] rounded-t-2xl p-0 z-[100000]" // z-[100] eklendi
        >
          <div className="flex flex-col h-full p-6">
            <SheetHeader className="pb-4 border-b mb-4">
              <SheetTitle className="text-left">Jeton İşlemleri</SheetTitle>
            </SheetHeader>
            <BalanceContent
              user={user}
              customAmount={customAmount}
              setCustomAmount={setCustomAmount}
              handleQuickPurchase={handleQuickPurchase}
              handleCustomPurchase={handleCustomPurchase}
              isSheet={true}
            />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Popover kullan
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{TriggerButton}</PopoverTrigger>
      <PopoverContent
        className="w-[361px] p-6"
        align="end"
        sideOffset={8}
      >
        <div className="flex items-center justify-between pb-4 mb-4 border-b">
          <h5 className="text-lg font-medium">Jeton İşlemleri</h5>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDropdown}
            className="h-8 w-8 hover:bg-secondary"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <BalanceContent
          user={user}
          customAmount={customAmount}
          setCustomAmount={setCustomAmount}
          handleQuickPurchase={handleQuickPurchase}
          handleCustomPurchase={handleCustomPurchase}
          isSheet={false}
        />
      </PopoverContent>
    </Popover>
  );
}
