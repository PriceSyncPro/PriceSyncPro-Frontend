import type { Metadata } from "next";

// ContactForm'u lazy load edin
import dynamic from 'next/dynamic';

const ContactForm = dynamic(() => import('@/components/contact/ContactForm'), {
  loading: () => <div className="animate-pulse bg-gray-200 h-96 rounded-lg"></div>
});

const ContactInfo = dynamic(() => import('@/components/contact/ContactInfo'), {
  ssr: true // SSR'da gösterilmesi önemliyse
});

export const metadata: Metadata = {
  title: "İletişim - PriceSyncPro",
  description: "PriceSyncPro ile iletişime geçin. 7/24 Türkçe destek, demo talep ve sorularınız için bize ulaşın.",
  // Gereksiz keywords'ü kaldırın (SEO'da artık etkili değil)
  openGraph: {
    title: "İletişim - PriceSyncPro",
    description: "PriceSyncPro ile iletişime geçin. 7/24 Türkçe destek.",
    type: "website",
    locale: "tr_TR", // Türkçe için ekleyin
  },
  twitter: {
    card: "summary",
    title: "İletişim - PriceSyncPro", 
    description: "PriceSyncPro ile iletişime geçin. 7/24 Türkçe destek.",
  },
  alternates: {
    canonical: "/contact" // Canonical URL ekleyin
  }
};

const cardClassName = "bg-white rounded-2xl shadow-lg p-8 border border-gray-200";



export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="pt-16 pb-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              İletişime Geçin
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Sorularınız mı var? Size yardımcı olmaktan mutluluk duyarız. 
              Bize ulaşın ve en kısa sürede geri dönüş yapalım.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className={cardClassName}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Mesaj Gönderin
                </h2>
                <p className="text-gray-600">
                  Formu doldurun, size 24 saat içinde geri dönüş yapalım.
                </p>
              </div>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <ContactInfo />
              
              {/* Map or Additional Info */}
              <div className={cardClassName}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Çalışma Saatleri
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pazartesi - Cuma</span>
                    <span className="font-semibold text-gray-900">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cumartesi</span>
                    <span className="font-semibold text-gray-900">10:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pazar</span>
                    <span className="font-semibold text-gray-900">Kapalı</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <strong className="text-gray-900">Acil durumlar için:</strong> 7/24 online destek sistemimizi kullanabilirsiniz.
                  </p>
                </div>
              </div>

              {/* FAQ Link */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">
                  Sık Sorulan Sorular
                </h3>
                <p className="text-gray-300 mb-6">
                  Aradığınız cevap SSS bölümümüzde olabilir. Hızlı çözümler için göz atın.
                </p>
                <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  SSS&apos;yi İncele
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
