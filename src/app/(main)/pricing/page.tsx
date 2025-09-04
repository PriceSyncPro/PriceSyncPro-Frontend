import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Fiyatlandırma - PriceSyncPro | E-ticaret Fiyat Takip Planları",
  description: "PriceSyncPro fiyatlandırma planlarını keşfedin. Başlangıç, Profesyonel ve Kurumsal paketlerle işletmenize uygun çözümü bulun. 14 gün ücretsiz deneme fırsatı.",
  keywords: [
    "fiyatlandırma", "pricing", "paket fiyatları", "abonelik planları", "e-ticaret araçları fiyat",
    "fiyat takip maliyeti", "profesyonel plan", "kurumsal çözüm", "ücretsiz deneme"
  ],
  openGraph: {
    title: "Fiyatlandırma - PriceSyncPro",
    description: "İşletmenize uygun fiyat takip planını seçin. 14 gün ücretsiz deneme ile başlayın.",
    type: "website",
  },
  alternates: {
    canonical: "https://pricesyncpro.com/pricing"
  }
};

// Structured Data for Pricing
const pricingStructuredData = {
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "PriceSyncPro",
  "description": "E-ticaret fiyat takip ve analiz platformu",
  "offers": [
    {
      "@type": "Offer",
      "name": "Başlangıç Planı",
      "price": "299",
      "priceCurrency": "TRY",
      "billingIncrement": "Aylık",
      "description": "Küçük işletmeler için ideal başlangıç paketi"
    },
    {
      "@type": "Offer", 
      "name": "Profesyonel Planı",
      "price": "599",
      "priceCurrency": "TRY",
      "billingIncrement": "Aylık",
      "description": "Büyüyen işletmeler için gelişmiş özellikler"
    },
    {
      "@type": "Offer",
      "name": "Kurumsal Planı", 
      "price": "1299",
      "priceCurrency": "TRY",
      "billingIncrement": "Aylık",
      "description": "Büyük işletmeler için tam özellikli çözüm"
    }
  ]
};

const pricingPlans = [
  {
    name: "Başlangıç",
    price: "299",
    period: "aylık",
    description: "Küçük işletmeler için ideal",
    features: [
      "100 ürün takibi",
      "5 rakip analizi",
      "Temel raporlar",
      "Email desteği",
      "Günlük fiyat güncellemeleri",
      "Temel dashboard"
    ],
    popular: false,
    buttonText: "Başla",
    color: "gray"
  },
  {
    name: "Profesyonel",
    price: "599", 
    period: "aylık",
    description: "Büyüyen işletmeler için",
    features: [
      "500 ürün takibi",
      "15 rakip analizi", 
      "Gelişmiş raporlar",
      "Öncelikli destek",
      "Saatlik fiyat güncellemeleri",
      "Otomatik fiyatlandırma",
      "API erişimi",
      "Özel dashboard"
    ],
    popular: true,
    buttonText: "En Popüler",
    color: "black"
  },
  {
    name: "Kurumsal",
    price: "1299",
    period: "aylık", 
    description: "Büyük işletmeler için",
    features: [
      "Sınırsız ürün takibi",
      "Sınırsız rakip analizi",
      "Özel raporlar",
      "7/24 telefon desteği",
      "Gerçek zamanlı güncellemeler",
      "Gelişmiş otomatik fiyatlandırma",
      "Tam API erişimi",
      "Özel entegrasyonlar",
      "Dedicated hesap yöneticisi",
      "Özel eğitim"
    ],
    popular: false,
    buttonText: "İletişime Geç",
    color: "gray"
  }
];

export default function PricingPage() {
  return (
    <>
      <Script
        id="pricing-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(pricingStructuredData),
        }}
      />
      
      <div className="pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Page Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full mb-8 border border-gray-200">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-semibold text-gray-800">14 gün ücretsiz deneme</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tight">
              İşletmenize Uygun
              <br />
              <span className="text-gray-500">Planı Seçin</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
              Kredi kartı gerekmez. İstediğiniz zaman iptal edebilirsiniz.
              <strong className="text-gray-900"> Hemen başlayın</strong> ve potansiyelinizi keşfedin.
            </p>
            
            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
              <button className="px-6 py-2 rounded-lg bg-white text-gray-900 font-semibold text-sm shadow-sm border border-gray-200">
                Aylık
              </button>
              <button className="px-6 py-2 rounded-lg text-gray-600 font-semibold text-sm hover:text-gray-900 transition-colors">
                Yıllık <span className="text-green-600 text-xs ml-1 font-bold">%20 İndirim</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-24">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white border rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  plan.popular 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gray-900 text-white px-4 py-1 rounded-full text-sm font-bold">
                      En Popüler
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6 font-medium">{plan.description}</p>
                  
                  <div className="mb-6">
                    <span className="text-5xl lg:text-6xl font-black text-gray-900">₺{plan.price}</span>
                    <span className="text-gray-600 ml-2 font-semibold">/{plan.period}</span>
                  </div>
                  
                  <Link
                    href="/signup"
                    className={`w-full inline-block py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gray-900 text-white hover:bg-black shadow-xl hover:shadow-2xl transform hover:scale-105'
                        : 'bg-gray-100 border-2 border-gray-200 text-gray-900 hover:border-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-bold text-gray-900 mb-4 text-lg">Özellikler:</h4>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <section className="mb-24 bg-gray-50 rounded-3xl p-8 lg:p-12" aria-labelledby="faq-heading">
            <div className="text-center mb-16">
              <h2 id="faq-heading" className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
                Sıkça Sorulan Sorular
              </h2>
              <p className="text-xl text-gray-600 font-medium">
                Fiyatlandırma ile ilgili merak ettikleriniz
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "Ücretsiz deneme süresi nasıl çalışır?",
                  answer: "14 gün boyunca tüm özellikleri ücretsiz kullanabilirsiniz. Kredi kartı bilgisi gerekmez. Deneme süresi sonunda istediğiniz planı seçebilir veya iptal edebilirsiniz."
                },
                {
                  question: "Plan değişikliği yapabilir miyim?",
                  answer: "Evet, istediğiniz zaman planınızı yükseltebilir veya düşürebilirsiniz. Değişiklik anında geçerli olur ve fatura döngünüz buna göre ayarlanır."
                },
                {
                  question: "İptal politikanız nedir?",
                  answer: "İstediğiniz zaman aboneliğinizi iptal edebilirsiniz. İptal işlemi sonrası mevcut dönem sonuna kadar hizmeti kullanmaya devam edebilirsiniz."
                },
                {
                  question: "Kurumsal planında neler var?",
                  answer: "Kurumsal planda sınırsız ürün takibi, özel entegrasyonlar, dedicated hesap yöneticisi ve 7/24 telefon desteği bulunur. Özel ihtiyaçlarınız için bizimle iletişime geçin."
                },
                {
                  question: "Ödeme yöntemleri nelerdir?",
                  answer: "Kredi kartı, banka kartı ve havale ile ödeme yapabilirsiniz. Tüm ödemeler SSL ile güvence altındadır."
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed font-medium">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gray-900 rounded-3xl p-12 lg:p-16">
            <div className="inline-flex items-center px-6 py-3 bg-white/10 border border-white/20 rounded-full mb-8">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-3 animate-pulse"></span>
              <span className="text-sm font-semibold text-white">Hala karar veremediniz mi?</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Uzmanlarımızla
              <br />
              <span className="text-gray-400">Konuşun</span>
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto font-medium">
              İşletmeniz için en uygun planı birlikte belirleyin.
              <strong className="text-white"> Size özel demo</strong> ve danışmanlık hizmeti sunuyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                href="/contact"
                className="bg-white text-gray-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:scale-105"
              >
                Uzmanla Konuş
              </Link>
              <Link
                href="/signup"
                className="border-2 border-white/30 text-white px-10 py-4 rounded-xl font-bold text-lg hover:border-white hover:bg-white/10 transition-all duration-200"
              >
                Ücretsiz Dene
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
