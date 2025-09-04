import { Outfit } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";
import {AuthProvider} from "@/utils/contexts/AuthContext";
import type { Metadata } from "next";

const outfit = Outfit({
  variable: "--font-outfit-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | PriceSyncPro",
    default: "PriceSyncPro - Fiyat Takip ve Analiz Platformu"
  },
  description: "PriceSyncPro ile ürün fiyatlarınızı takip edin, analiz edin ve rekabet avantajı elde edin. Gelişmiş dashboard ve raporlama araçları ile fiyat yönetimini kolaylaştırın.",
  keywords: ["fiyat takip", "ürün analizi", "e-ticaret", "fiyat karşılaştırma", "dashboard", "analiz"],
  authors: [{ name: "PriceSyncPro Team" }],
  creator: "PriceSyncPro",
  publisher: "PriceSyncPro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://pricesyncpro.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "PriceSyncPro - Fiyat Takip ve Analiz Platformu",
    description: "PriceSyncPro ile ürün fiyatlarınızı takip edin, analiz edin ve rekabet avantajı elde edin.",
    url: 'https://pricesyncpro.com',
    siteName: 'PriceSyncPro',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "PriceSyncPro - Fiyat Takip ve Analiz Platformu",
    description: "PriceSyncPro ile ürün fiyatlarınızı takip edin, analiz edin ve rekabet avantajı elde edin.",
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="tr">
      <body className={`${outfit.variable}`}>
        <AuthProvider>
          <ThemeProvider>
            <SidebarProvider>
              {children}
            </SidebarProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
