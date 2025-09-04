import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "PriceSyncPro - E-ticaret Fiyat Takip ve Analiz Platformu | Profesyonel Çözümler",
  description: "PriceSyncPro ile e-ticaret fiyat takibinde öncü olun. Gelişmiş analitikler, gerçek zamanlı rakip takibi ve otomatik fiyatlandırma ile satışlarınızı %35'e kadar artırın. 14 gün ücretsiz deneyin.",
  keywords: [
    "fiyat takip", "e-ticaret fiyat analizi", "rakip fiyat takibi", "otomatik fiyatlandırma", 
    "fiyat analizi", "e-ticaret dashboard", "fiyat karşılaştırma", "rekabet analizi",
    "fiyat optimizasyonu", "e-ticaret araçları", "pazar analizi", "fiyat stratejisi"
  ],
  openGraph: {
    title: "PriceSyncPro - E-ticaret Fiyat Takip Platformu",
    description: "Gelişmiş fiyat analizi ile e-ticaret satışlarınızı artırın. Gerçek zamanlı rakip takibi ve otomatik fiyatlandırma.",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PriceSyncPro - Fiyat Takip Platformu"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "PriceSyncPro - E-ticaret Fiyat Takip Platformu",
    description: "Gelişmiş fiyat analizi ile e-ticaret satışlarınızı artırın.",
  },
  alternates: {
    canonical: "https://pricesyncpro.com"
  }
};

// Structured Data for SEO
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "PriceSyncPro",
  "description": "E-ticaret işletmeleri için gelişmiş fiyat takip ve analiz platformu",
  "url": "https://pricesyncpro.com",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "TRY",
    "description": "14 gün ücretsiz deneme"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "1250"
  },
  "features": [
    "Gerçek zamanlı fiyat takibi",
    "Gelişmiş analiz araçları",
    "Otomatik fiyatlandırma",
    "Rekabet analizi",
    "Akıllı raporlama"
  ]
};

export default function Homepage() {
  return (
    <>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      {/* Hero Section */}
      <section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full mb-8 border border-gray-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-800">E-ticaret için profesyonel çözüm</span>
            </div>
            
            <h1 className="text-6xl lg:text-8xl font-black text-gray-900 mb-8 leading-[0.85] tracking-tight">
              Fiyat Takibinde
              <br />
              <span className="text-gray-500">Yeni Standart</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Gelişmiş analitik araçları ile rakiplerinizi takip edin, 
              fiyat stratejilerinizi optimize edin ve satışlarınızı <strong className="text-gray-900">%35&apos;e kadar artırın</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                href="/signup"
                className="bg-gray-900 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-black transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                14 Gün Ücretsiz Başla
              </Link>
              <Link
                href="/dashboard"
                className="border-2 border-gray-300 text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:border-gray-900 hover:bg-gray-50 transition-all duration-200"
              >
                Canlı Demo İzle
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-600 mb-16">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Kredi kartı gerekmez</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">2 dakikada kurulum</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">7/24 Türkçe destek</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-4xl font-black text-gray-900 mb-2">10K+</div>
                <div className="text-gray-600 font-semibold">Aktif Kullanıcı</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-4xl font-black text-gray-900 mb-2">5M+</div>
                <div className="text-gray-600 font-semibold">Takip Edilen Ürün</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-4xl font-black text-gray-900 mb-2">%35</div>
                <div className="text-gray-600 font-semibold">Ortalama Gelir Artışı</div>
              </div>
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-4xl font-black text-gray-900 mb-2">99.9%</div>
                <div className="text-gray-600 font-semibold">Platform Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50" aria-labelledby="features-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 id="features-heading" className="text-5xl font-black text-gray-900 mb-6">
              Güçlü Özellikler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
              İşletmenizi büyütmek için ihtiyacınız olan tüm araçlar tek platformda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Gerçek Zamanlı Takip
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Ürün fiyatlarınızı <strong>anlık olarak</strong> takip edin. Rakip fiyat değişimlerinde 
                otomatik uyarılar alın ve hızla harekete geçin.
              </p>
            </article>

            <article className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Gelişmiş Analiz
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                <strong>Gelişmiş</strong> algoritmalarla pazar trendlerini analiz edin. 
                Gelecekteki fiyat hareketlerini öngörün ve stratejik kararlar alın.
              </p>
            </article>

            <article className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Otomatik Fiyatlandırma
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Belirlediğiniz kurallara göre fiyatlarınızı <strong>otomatik</strong> güncelleyin. 
                Karlılığınızı koruyarak rekabetçi kalın.
              </p>
            </article>

            <article className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Rekabet Analizi
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Rakiplerinizin fiyat stratejilerini <strong>derinlemesine</strong> analiz edin. 
                Pazar konumunuzu güçlendirin ve fırsatları yakalayın.
              </p>
            </article>

            <article className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Akıllı Raporlar
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                <strong>Detaylı analiz raporları</strong> ile veriye dayalı kararlar alın. 
                Özelleştirilebilir dashboard ile kritik metrikleri takip edin.
              </p>
            </article>

            <article className="bg-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all duration-300 group">
              <div className="w-14 h-14 bg-gray-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-gray-900 group-hover:scale-110 transition-all duration-300">
                <svg className="w-7 h-7 text-gray-900 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Güvenli Platform
              </h3>
              <p className="text-gray-600 leading-relaxed font-medium">
                Verileriniz <strong>en yüksek güvenlik</strong> standartlarıyla korunur. 
                SSL şifreleme ve çok faktörlü kimlik doğrulama ile güvende kalın.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 id="testimonials-heading" className="text-5xl font-black text-gray-900 mb-6">
              Müşterilerimiz Diyor Ki
            </h2>
            <p className="text-xl text-gray-600 font-medium">
              <strong>10,000+</strong> işletme PriceSyncPro ile büyüyor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Ahmet Kaya",
                title: "E-ticaret Uzmanı",
                company: "TechStore",
                avatar: "AK",
                comment: "PriceSyncPro sayesinde rakip analizi çok daha kolay. Satışlarımız %35 arttı ve fiyat stratejimizi tamamen optimize ettik!",
                rating: 5
              },
              {
                name: "Merve Özkan", 
                title: "Pazarlama Müdürü",
                company: "ModaLife",
                avatar: "MÖ",
                comment: "Gerçek zamanlı fiyat takibi işimizi çok kolaylaştırdı. Artık rakiplerimizin her hareketini takip edebiliyoruz. Kesinlikle tavsiye ederim!",
                rating: 5
              },
              {
                name: "Can Demir",
                title: "İşletme Sahibi",
                company: "ElektroMax",
                avatar: "CD",
                comment: "Otomatik fiyatlandırma özelliği sayesinde rekabette hep bir adım önde kalıyoruz. ROI'miz %200 arttı!",
                rating: 5
              }
            ].map((testimonial, index) => (
              <blockquote key={index} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <cite className="text-gray-900 font-bold text-lg not-italic">{testimonial.name}</cite>
                    <p className="text-gray-600 font-medium">{testimonial.title}</p>
                    <p className="text-gray-500 text-sm">{testimonial.company}</p>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6 font-medium">
                  &ldquo;{testimonial.comment}&rdquo;
                </p>
                <div className="flex text-yellow-400" aria-label="5 yıldız değerlendirme">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-full mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
            <span className="text-sm font-semibold text-white">14 Gün Ücretsiz Deneme</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-black text-white mb-8">
            Hemen Başlayın ve
            <br />
            <span className="text-gray-400">Farkı Görün</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
            PriceSyncPro ile fiyat yönetiminde bir adım öne geçin. 
            <strong className="text-white">Kredi kartı gerekmez</strong>, anında başlayın ve potansiyelinizi keşfedin.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <Link
              href="/signup"
              className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              🚀 Ücretsiz Başla
            </Link>
            <Link
              href="/dashboard"
              className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:border-white hover:bg-white/10 transition-all duration-200"
            >
              📞 Demo Talep Et
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm text-gray-400">
            {[
              "✓ Kredi kartı gerekmez",
              "✓ 2 dakikada kurulum", 
              "✓ 7/24 Türkçe destek"
            ].map((feature, index) => (
              <div key={index} className="font-semibold">
                {feature}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
