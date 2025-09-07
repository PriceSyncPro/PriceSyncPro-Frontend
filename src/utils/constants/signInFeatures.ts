export interface Feature {
  icon: string;
  title: string;
  description: string;
  stats: string;
}

const features: Feature[] = [
    {
      icon: "⚡",
      title: "Anlık Fiyat Takibi",
      description: "Rakip fiyatlarını gerçek zamanlı olarak izleyin ve anında harekete geçin",
      stats: "99.9% doğruluk oranı"
    },
    {
      icon: "📊",
      title: "Detaylı Raporlama",
      description: "Kapsamlı analitik araçları ile veriye dayalı kararlar alın",
      stats: "500+ analiz metriği"
    },
    {
      icon: "🎯",
      title: "Akıllı Uyarılar",
      description: "Fiyat değişimlerinde anında bildirim alın ve fırsatları kaçırmayın",
      stats: "Ortalama 30 saniye"
    },
    {
      icon: "🚀",
      title: "Otomatik Güncelleme",
      description: "Fiyatlarınızı otomatik olarak optimize edin ve rekabette öne geçin",
      stats: "%35 artış garantisi"
    }
  ];

export default features;