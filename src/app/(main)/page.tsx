import type { Metadata } from "next";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Critical CSS inline olarak eklenebilir
const criticalStyles = `
  .hero-gradient {
    background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
  }
  .animate-fade-in {
    animation: fadeIn 0.6s ease-out; 
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const metadata: Metadata = {
  title: "PriceSyncPro - E-ticaret Fiyat Takip ve Analiz Platformu",
  description: "Gelişmiş analitikler, gerçek zamanlı rakip takibi ve otomatik fiyatlandırma ile satışlarınızı %35'e kadar artırın. 14 gün ücretsiz deneyin.",
  keywords: "fiyat takip, e-ticaret fiyat analizi, rakip fiyat takibi, otomatik fiyatlandırma",
  openGraph: {
    title: "PriceSyncPro - E-ticaret Fiyat Takip Platformu",
    description: "Gelişmiş fiyat analizi ile e-ticaret satışlarınızı artırın.",
    type: "website",
  },
  alternates: {
    canonical: "https://pricesyncpro.com"
  }
};

// Lazy load non-critical components
const TestimonialsSection = dynamic(() => import('@/components/homepage/TestimonialsSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />,
});

const FeaturesSection = dynamic(() => import('@/components/homepage/FeaturesSection'), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse" />
});

// Optimized icons with minimal SVG
const icons = {
  check: (
    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  ),
  pulse: <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
};

// Structured data - minified
const structuredData = `{"@context":"https://schema.org","@type":"SoftwareApplication","name":"PriceSyncPro","description":"E-ticaret fiyat takip platformu","applicationCategory":"BusinessApplication","offers":{"@type":"Offer","price":"0","priceCurrency":"TRY"}}`;

export default function Homepage() {
  return (
    <>
      {/* Critical CSS inline */}
      <style dangerouslySetInnerHTML={{ __html: criticalStyles }} />
      
      {/* Structured data - defer loading */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
        defer
      />

      {/* Hero Section - Critical content */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 hero-gradient">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center animate-fade-in">
            
            {/* Status badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full mb-6 shadow-sm">
              {icons.pulse}
              <span className="text-sm font-medium text-gray-800 ml-2">
                E-ticaret için profesyonel çözüm
              </span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
              Fiyat Takibinde
              <br />
              <span className="text-gray-600">Yeni Standart</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
              Gelişmiş analitik araçları ile rakiplerinizi takip edin, 
              fiyat stratejilerinizi optimize edin ve satışlarınızı 
              <strong className="text-gray-900"> %35&apos;e kadar artırın</strong>.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link
                href="/signup"
                className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                prefetch={false}
              >
                14 Gün Ücretsiz Başla
              </Link>
              <Link
                href="/dashboard"
                className="border-2 border-gray-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
                prefetch={false}
              >
                Canlı Demo İzle
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-gray-600 mb-12">
              {[
                "Kredi kartı gerekmez",
                "2 dakikada kurulum", 
                "7/24 Türkçe destek"
              ].map((text, i) => (
                <div key={i} className="flex items-center">
                  {icons.check}
                  <span className="font-medium ml-2">{text}</span>
                </div>
              ))}
            </div>

            {/* Stats - Above the fold */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { number: "10K+", label: "Aktif Kullanıcı" },
                { number: "5M+", label: "Takip Edilen Ürün" },
                { number: "%35", label: "Gelir Artışı" },
                { number: "99.9%", label: "Platform Uptime" }
              ].map((stat, i) => (
                <div key={i} className="bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm">
                  <div className="text-2xl md:text-3xl font-black text-gray-900 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium text-sm">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features - Lazy loaded */}
      <FeaturesSection />

      {/* Testimonials - Lazy loaded */}
      <TestimonialsSection />

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-6">
            {icons.pulse}
            <span className="text-sm font-medium text-white ml-2">
              14 Gün Ücretsiz Deneme
            </span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            Hemen Başlayın ve
            <br />
            <span className="text-gray-400">Farkı Görün</span>
          </h2>
          
          <p className="text-lg text-gray-300 mb-8 max-w-xl mx-auto">
            PriceSyncPro ile fiyat yönetiminde bir adım öne geçin. 
            <strong className="text-white">Kredi kartı gerekmez</strong>, 
            anında başlayın.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/signup"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 shadow-lg"
              prefetch={false}
            >
              🚀 Ücretsiz Başla
            </Link>
            <Link
              href="/dashboard"
              className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-200"
              prefetch={false}
            >
              📞 Demo Talep Et
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-8 text-sm text-gray-400">
            {[
              "✓ Kredi kartı gerekmez",
              "✓ 2 dakikada kurulum", 
              "✓ 7/24 Türkçe destek"
            ].map((feature, i) => (
              <span key={i} className="font-medium">{feature}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}