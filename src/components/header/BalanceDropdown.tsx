import { useAuth } from "@/utils/contexts/AuthContext";
import Link from "next/link";
import React, {useState, useEffect} from "react";

export default function BalanceDropdown(){
    const [isOpen, setIsOpen] = useState(false);
    const [, setNotifying] = useState(true);
    const [isMobile, setIsMobile] = useState(false);
    const [customAmount, setCustomAmount] = useState('');
    const {user}= useAuth();
    
    // Jeton fiyatı (1 jeton = 0.5 TL olarak örnek)
    const TOKEN_PRICE = 0.5;
    
    // TL'den jeton hesaplama
    const calculateTokens = (tlAmount: number) => {
        return Math.floor(tlAmount / TOKEN_PRICE);
    };
    
    // Ekran boyutunu kontrol etmek için
    useEffect(() => {
        const checkIfMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIfMobile();
        window.addEventListener('resize', checkIfMobile);
        return () => {
            window.removeEventListener('resize', checkIfMobile);
        };
    }, []);
    
    function toggleDropdown() {
        setIsOpen(!isOpen);
    }
    
    function closeDropdown() {
        setIsOpen(false);
    }
    
    const handleClick = () => {
        toggleDropdown();
        setNotifying(false);
    };

    const handleQuickPurchase = (tlAmount: number) => {
        const tokens = calculateTokens(tlAmount);
        console.log(`${tlAmount}₺ karşılığında ${tokens} jeton satın alınacak`);
        // Burada API çağrısı yapılacak
    };

    const handleCustomPurchase = () => {
        if (customAmount && parseFloat(customAmount) > 0) {
            const tokens = calculateTokens(parseFloat(customAmount));
            console.log(`${customAmount}₺ karşılığında ${tokens} jeton satın alınacak`);
            // Burada API çağrısı yapılacak
            setCustomAmount('');
        }
    };

    // Mobil için modal arka planı
    const MobileModalBackdrop = () => {
        if (!isMobile || !isOpen) return null;
        return (
            <div
                className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40 flex items-center justify-center"
                onClick={closeDropdown}
            />
        );
    };

    return (
        <div className="relative">
            <button
                className="relative dropdown-toggle flex items-center justify-center text-gray-700 transition-all bg-gradient-to-r from-amber-50 to-orange-50 border border-gray-200 rounded-full hover:from-amber-100 hover:to-orange-100 h-11 px-4 hover:border-orange-200 hover:shadow-md dark:from-gray-800 dark:to-gray-700 dark:border-gray-700 dark:text-gray-300 dark:hover:from-gray-700 dark:hover:to-orange-900 group"
                onClick={handleClick}
            >
                <span className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-7 h-7 bg-gradient-to-r from-amber-100 to-orange-100 text-orange-600 rounded-full dark:from-amber-900 dark:to-orange-900 dark:text-orange-300 group-hover:scale-110 transition-transform duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                            <path d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z" />
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.112 2.178.502.4 1.102.647 1.72.756v2.816a2.251 2.251 0 01-.921-.421c-.427-.32-.579-.686-.579-.991a.75.75 0 00-1.5 0c0 .964.4 1.856 1.112 2.422.502.4 1.102.647 1.72.756V18a.75.75 0 001.5 0v-.816a3.836 3.836 0 001.72-.756c.712-.566 1.112-1.35 1.112-2.178 0-.829-.4-1.612-1.112-2.178a3.836 3.836 0 00-1.72-.756V9.5c.568.059 1.068.24 1.414.502.427.32.579.686.579.991a.75.75 0 001.5 0c0-.964-.4-1.856-1.112-2.422A3.836 3.836 0 0012.75 6.816V6z" clipRule="evenodd" />
                        </svg>
                    </span>
                    <span className="font-medium">Jeton: <span className="text-orange-600 dark:text-orange-400 font-bold group-hover:animate-pulse">{user?.balance || 0}</span></span>
                </span>
            </button>
            
            <MobileModalBackdrop/>
            
            {isOpen && (
                <div
                    className={`
                        ${isMobile
                        ? 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-[400px]'
                        : 'absolute -right-[240px] lg:right-0 mt-[17px]'
                    }
                        flex h-[600px] w-[350px] flex-col rounded-2xl border-0 bg-white p-6 shadow-lg dark:bg-gray-800 sm:w-[361px]
                    `}
                >
                    <div className="flex items-center justify-between pb-4 mb-6 border-b border-gray-100 dark:border-gray-700">
                        <h5 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                            Jeton İşlemleri
                        </h5>
                        <button
                            onClick={toggleDropdown}
                            className="text-gray-400 transition hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                    
                    {/* Jeton Bakiyesi */}
                    <div className="mb-8 text-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Mevcut Bakiye</span>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <span className="text-4xl font-light text-gray-800 dark:text-white">{user?.balance || 0}</span>
                            <span className="text-lg text-orange-600 dark:text-orange-400 font-medium">Jeton</span>
                        </div>
                        <span className="text-xs text-gray-400 dark:text-gray-500">1 Jeton = {TOKEN_PRICE}₺</span>
                    </div>
                    
                    {/* Jeton Satın Alma Seçenekleri */}
                    <div className="mb-6">
                        <h6 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Hızlı Jeton Satın Al
                        </h6>
                        <div className="grid grid-cols-3 gap-3">
                            <button
                                onClick={() => handleQuickPurchase(50)}
                                className="p-3 text-sm font-medium text-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 rounded-lg hover:from-amber-100 hover:to-orange-100 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300 dark:hover:from-gray-600 dark:hover:to-orange-900 dark:border-gray-600 transition-all duration-200 hover:shadow-md"
                            >
                                <div className="text-center">
                                    <div className="font-bold text-orange-600 dark:text-orange-400">{calculateTokens(50)}</div>
                                    <div className="text-xs text-gray-500">50₺</div>
                                </div>
                            </button>
                            <button
                                onClick={() => handleQuickPurchase(100)}
                                className="p-3 text-sm font-medium text-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 rounded-lg hover:from-amber-100 hover:to-orange-100 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300 dark:hover:from-gray-600 dark:hover:to-orange-900 dark:border-gray-600 transition-all duration-200 hover:shadow-md"
                            >
                                <div className="text-center">
                                    <div className="font-bold text-orange-600 dark:text-orange-400">{calculateTokens(100)}</div>
                                    <div className="text-xs text-gray-500">100₺</div>
                                </div>
                            </button>
                            <button
                                onClick={() => handleQuickPurchase(200)}
                                className="p-3 text-sm font-medium text-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-100 rounded-lg hover:from-amber-100 hover:to-orange-100 dark:from-gray-700 dark:to-gray-600 dark:text-gray-300 dark:hover:from-gray-600 dark:hover:to-orange-900 dark:border-gray-600 transition-all duration-200 hover:shadow-md"
                            >
                                <div className="text-center">
                                    <div className="font-bold text-orange-600 dark:text-orange-400">{calculateTokens(200)}</div>
                                    <div className="text-xs text-gray-500">200₺</div>
                                </div>
                            </button>
                        </div>
                    </div>
                    
                    {/* Özel Tutar */}
                    <div className="mb-8">
                        <h6 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Özel Tutar
                        </h6>
                        <div className="space-y-3">
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="number"
                                        value={customAmount}
                                        onChange={(e) => setCustomAmount(e.target.value)}
                                        placeholder="Tutar giriniz"
                                        className="w-full p-3 pr-8 text-sm border-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-gray-50 text-gray-800 placeholder-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-500"
                                    />
                                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">₺</span>
                                </div>
                                <button
                                    onClick={handleCustomPurchase}
                                    className="px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg hover:from-orange-600 hover:to-amber-600 dark:from-orange-600 dark:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 whitespace-nowrap transition-all duration-200 hover:shadow-md"
                                >
                                    Satın Al
                                </button>
                            </div>
                            {customAmount && parseFloat(customAmount) > 0 && (
                                <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                    <span className="text-sm text-orange-600 dark:text-orange-400">
                                        {calculateTokens(parseFloat(customAmount))} jeton alacaksınız
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Jeton Geçmişi */}
                    <div className="mb-3">
                        <h6 className="mb-3 text-sm font-medium text-gray-500 dark:text-gray-400">
                            Jeton Geçmişi
                        </h6>
                    </div>
                    <div className="overflow-y-auto flex-grow mb-6">
                        <ul className="flex flex-col space-y-2">
                            <li>
                                <div className="flex items-center gap-3 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 4V20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                            Jeton Satın Alma
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            100₺ ödeme - 5 Mayıs 2023, 14:30
                                        </p>
                                    </div>
                                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                        +200 Jeton
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-3 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 20V4M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                            Jeton Kullanımı
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            AI Analiz - 3 Mayıs 2023, 09:15
                                        </p>
                                    </div>
                                    <div className="text-sm font-medium text-red-600 dark:text-red-400">
                                        -50 Jeton
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-3 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 4V20M12 4L6 10M12 4L18 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                            Jeton Satın Alma
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            50₺ ödeme - 1 Mayıs 2023, 11:45
                                        </p>
                                    </div>
                                    <div className="text-sm font-medium text-green-600 dark:text-green-400">
                                        +100 Jeton
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div className="flex items-center gap-3 rounded-lg p-3 bg-gray-50 dark:bg-gray-700">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 20V4M12 20L18 14M12 20L6 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-gray-800 dark:text-white truncate">
                                            Jeton Kullanımı
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Rapor Oluşturma - 28 Nisan 2023, 16:20
                                        </p>
                                    </div>
                                    <div className="text-sm font-medium text-red-600 dark:text-red-400">
                                        -30 Jeton
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    
                    <div className="flex gap-3 mt-auto">
                        <Link
                            href="/dashboard/deposit-credit"
                            className="flex-1 block px-4 py-3 text-sm font-medium text-center text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg hover:from-orange-600 hover:to-amber-600 dark:from-orange-600 dark:to-amber-600 dark:hover:from-orange-700 dark:hover:to-amber-700 transition-all duration-200 hover:shadow-md"
                        >
                            Jeton Satın Al
                        </Link>
                        <Link
                            href="/jeton-gecmisi"
                            className="flex-1 block px-4 py-3 text-sm font-medium text-center text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            Tüm Geçmiş
                        </Link>
                    </div>
                </div>
            )}
        </div>
    )
}
