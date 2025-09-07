export interface Benefit {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export const SIGNUP_BENEFITS: Benefit[] = [
  {
    icon: "💰",
    title: "Karlılığınızı Artırın",
    description: "Optimal fiyat stratejileri ile karlılığınızı %40'a kadar artırın",
    color: "from-green-400 to-emerald-500"
  },
  {
    icon: "⚡",
    title: "Anlık Bildirimler",
    description: "Rakip fiyat değişimlerinde anında bildirim alın ve harekete geçin",
    color: "from-yellow-400 to-orange-500"
  },
  {
    icon: "🎯",
    title: "Hassas Analiz",
    description: "AI destekli analitiklerle pazar trendlerini öngörün",
    color: "from-blue-400 to-purple-500"
  },
  {
    icon: "📈",
    title: "Satış Artışı",
    description: "Müşterilerimiz ortalama %35 satış artışı deneyimliyor",
    color: "from-pink-400 to-red-500"
  }
];