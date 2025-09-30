interface Feature {
    title: string,
    description: string
}

export default function FeaturesSection() {
  const features: Feature[] = [
    {
      title: "Gerçek Zamanlı Takip",
      description: "Ürün fiyatlarınızı anlık takip edin. Rakip değişimlerinde otomatik uyarılar alın."
    },
    {
      title: "Gelişmiş Analiz", 
      description: "Pazar trendlerini analiz edin. Gelecekteki fiyat hareketlerini öngörün."
    },
    {
      title: "Otomatik Fiyatlandırma",
      description: "Belirlediğiniz kurallara göre fiyatlarınızı otomatik güncelleyin."
    },
    {
      title: "Rekabet Analizi",
      description: "Rakiplerinizin stratejilerini analiz edin. Pazar konumunuzu güçlendirin."
    },
    {
      title: "Akıllı Raporlar",
      description: "Detaylı raporlar ile veriye dayalı kararlar alın."
    },
    {
      title: "Güvenli Platform", 
      description: "Verileriniz en yüksek güvenlik standartlarıyla korunur."
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
            Güçlü Özellikler
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            İşletmenizi büyütmek için tüm araçlar tek platformda
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
