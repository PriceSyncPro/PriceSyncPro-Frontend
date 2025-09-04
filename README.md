# PriceSync Pro Frontend

PriceSync Pro, e-ticaret platformlarında ürün fiyat takibi ve yönetimi için geliştirilmiş modern bir web uygulamasıdır. **Next.js 15**, **React 18**, **TypeScript** ve **Tailwind CSS** teknolojileri kullanılarak geliştirilmiştir.

![PriceSync Pro Dashboard](./banner.png)

## 🚀 Özellikler

### 📊 Dashboard ve Analitik
- **Gerçek zamanlı dashboard** - Ürün performansı ve fiyat değişimlerini anlık takip
- **Interaktif grafikler** - ApexCharts ile gelişmiş veri görselleştirme
- **Responsive tasarım** - Tüm cihazlarda mükemmel görünüm

### 🛍️ Ürün Yönetimi
- **Ürün ekleme ve düzenleme** - Kolay ürün yönetim arayüzü
- **Toplu ürün işlemleri** - Çoklu ürün seçimi ve işlem yapma
- **Ürün kategorileri** - Organize edilmiş ürün yapısı
- **Görsel yükleme** - Drag & drop ile resim yükleme

### ⚙️ Kural Motoru
- **Dinamik fiyat kuralları** - Esnek kural tanımlama sistemi
- **Otomatik fiyat güncellemeleri** - Belirlenen kurallara göre otomatik işlemler
- **Kural şablonları** - Hazır kural kalıpları
- **Koşullu işlemler** - Karmaşık iş mantığı desteği

### 💰 Finansal Yönetim
- **Jeton sistemi** - Kredi tabanlı kullanım modeli
- **İşlem geçmişi** - Detaylı finansal raporlama
- **Otomatik faturalandırma** - Kullanım bazlı ücretlendirme
- **Ödeme entegrasyonu** - Güvenli ödeme işlemleri

### 📈 Raporlama
- **Detaylı raporlar** - Kapsamlı analiz ve raporlama
- **Veri dışa aktarma** - Excel, PDF formatlarında rapor alma
- **Özelleştirilebilir grafikler** - İhtiyaca göre görselleştirme
- **Periyodik raporlar** - Otomatik rapor gönderimi

### 🎨 Kullanıcı Deneyimi
- **Modern arayüz** - Kullanıcı dostu tasarım
- **Karanlık mod** - Göz yorgunluğunu azaltan tema
- **Çoklu dil desteği** - Türkçe ve İngilizce arayüz
- **Mobil uyumlu** - Responsive tasarım

## 🛠️ Teknoloji Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - Modern React features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework

### UI Kütüphaneleri
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations
- **React ApexCharts** - Interactive charts

### Veri Yönetimi
- **Axios** - HTTP client for API calls
- **JWT Decode** - Token management
- **React Hook Form** - Form handling

### Geliştirme Araçları
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📦 Kurulum

### Gereksinimler
- Node.js 18.x veya üzeri (Node.js 20.x önerilir)
- npm veya yarn package manager
- Git

### Projeyi Klonlama
```bash
git clone https://github.com/PriceSyncPro/PriceSyncPro-FrontEnd.git
cd PriceSyncPro-FrontEnd
```

### Bağımlılıkları Yükleme
```bash
npm install
# veya
yarn install
```

### Geliştirme Sunucusunu Başlatma
```bash
npm run dev
# veya
yarn dev
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde çalışacaktır.

### Production Build
```bash
npm run build
npm start
# veya
yarn build
yarn start
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router
│   ├── dashboard/         # Dashboard sayfaları
│   │   ├── (others-pages)/
│   │   │   ├── add-product/      # Ürün ekleme
│   │   │   ├── products/         # Ürün listesi
│   │   │   ├── add-rule/         # Kural ekleme
│   │   │   ├── rules/            # Kural yönetimi
│   │   │   ├── deposit-credit/   # Jeton ekleme
│   │   │   ├── transactions/     # İşlem geçmişi
│   │   │   ├── profile/          # Kullanıcı profili
│   │   │   └── calendar/         # Takvim
│   │   └── (ui-elements)/        # UI bileşenleri
│   ├── signin/            # Giriş sayfası
│   ├── signup/            # Kayıt sayfası
│   └── layout.tsx         # Ana layout
├── components/            # React bileşenleri
│   ├── auth/             # Kimlik doğrulama
│   ├── charts/           # Grafik bileşenleri
│   ├── common/           # Ortak bileşenler
│   ├── forms/            # Form bileşenleri
│   ├── products/         # Ürün bileşenleri
│   ├── tables/           # Tablo bileşenleri
│   ├── transactions/     # İşlem bileşenleri
│   └── ui/               # UI primitives
├── context/              # React Context
│   ├── SidebarContext.tsx
│   ├── ThemeContext.tsx
│   └── AnnouncementContext.tsx
├── hooks/                # Custom hooks
├── icons/                # SVG iconlar
├── layout/               # Layout bileşenleri
│   ├── AppHeader.tsx
│   ├── AppSidebar.tsx
│   └── Backdrop.tsx
├── utils/                # Yardımcı fonksiyonlar
│   ├── api/              # API servisleri
│   ├── types/            # TypeScript tipleri
│   └── axios.ts          # HTTP client config
└── lib/                  # Kütüphane konfigürasyonları
```

## 🔧 Konfigürasyon

### Ortam Değişkenleri
`.env.local` dosyası oluşturun:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Authentication
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000

# Database (if needed)
DATABASE_URL=your-database-url

# External Services
STRIPE_SECRET_KEY=your-stripe-secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-public-key
```

### Tailwind CSS Konfigürasyonu
`tailwind.config.ts` dosyasında özelleştirmeler yapabilirsiniz:

```typescript
// Özel renkler, fontlar ve animasyonlar
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a',
      }
    }
  }
}
```

## 🎯 Kullanım

### Dashboard Erişimi
1. Uygulamaya giriş yapın
2. Dashboard ana sayfasında genel istatistikleri görüntüleyin
3. Sol menüden istediğiniz modüle geçiş yapın

### Ürün Ekleme
1. **Ürünler > Ürün Ekle** menüsüne gidin
2. Ürün bilgilerini doldurun
3. Görselleri yükleyin
4. Fiyat takip ayarlarını yapın
5. Kaydet butonuna tıklayın

### Kural Oluşturma
1. **Kurallar > Kural Ekle** menüsüne gidin
2. Kural tipini seçin
3. Koşulları tanımlayın
4. Aksiyonları belirleyin
5. Kuralı aktif hale getirin

### Raporları İnceleme
1. **Rapor > Geçmiş Raporlar** menüsüne gidin
2. Tarih aralığını seçin
3. Rapor tipini belirleyin
4. Verileri görüntüleyin veya dışa aktarın

## 🔌 API Entegrasyonu

### API Servisleri
```typescript
// utils/api/services/
├── authService.ts         # Kimlik doğrulama
├── productsService.ts     # Ürün işlemleri
├── rulesService.ts        # Kural yönetimi
├── transactionsService.ts # İşlem geçmişi
└── reportsService.ts      # Raporlama
```

### Örnek API Kullanımı
```typescript
import { productsService } from '@/utils/api/services';

// Ürün listesi alma
const products = await productsService.getProducts();

// Yeni ürün ekleme
const newProduct = await productsService.createProduct({
  name: 'Ürün Adı',
  price: 100,
  category: 'Kategori'
});
```

## 🎨 Tema ve Stil

### Karanlık Mod
Uygulama otomatik karanlık mod desteği sunar:
```typescript
import { useTheme } from 'next-themes';

const { theme, setTheme } = useTheme();
```

### Özel Bileşenler
```typescript
// components/ui/ klasöründe bulunan bileşenler
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
```

## 📱 Responsive Tasarım

Uygulama tüm ekran boyutlarında optimize edilmiştir:
- **Desktop**: 1024px ve üzeri
- **Tablet**: 768px - 1023px
- **Mobile**: 320px - 767px

## 🔒 Güvenlik

### Kimlik Doğrulama
- JWT token tabanlı authentication
- Secure HTTP-only cookies
- Automatic token refresh
- Role-based access control

### Veri Güvenliği
- Input validation
- XSS protection
- CSRF protection
- Secure API endpoints

## 🧪 Test

### Test Komutları
```bash
# Unit testler
npm run test

# E2E testler
npm run test:e2e

# Test coverage
npm run test:coverage
```

## 📊 Performans

### Optimizasyonlar
- **Code splitting** - Sayfa bazlı kod bölme
- **Image optimization** - Next.js Image component
- **Bundle analysis** - Webpack bundle analyzer
- **Lazy loading** - Bileşen lazy loading

### Performans Metrikleri
- First Contentful Paint (FCP) < 1.5s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1

## 🚀 Deployment

### Vercel (Önerilen)
```bash
npm install -g vercel
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Manual Deployment
```bash
npm run build
npm start
```

## 🤝 Katkıda Bulunma

1. Projeyi fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

### Kod Standartları
- ESLint kurallarına uyun
- TypeScript tiplerini kullanın
- Commit mesajlarında conventional commits kullanın
- Test yazın

## 📝 Changelog

### v2.0.0 (Şubat 2025)
- ✨ Next.js 15 ve React 18 güncellemesi
- 🎨 Yeni modern arayüz tasarımı
- 🚀 Performans iyileştirmeleri
- 📱 Gelişmiş responsive tasarım
- 🔧 TypeScript tam desteği

### v1.5.0 (Ocak 2025)
- 📊 Gelişmiş raporlama sistemi
- 🔄 Otomatik kural motoru
- 💰 Jeton sistemi entegrasyonu
- 🌙 Karanlık mod desteği

## 📞 Destek

### Dokümantasyon
- [API Dokümantasyonu](https://docs.pricesyncpro.com/api)
- [Kullanıcı Kılavuzu](https://docs.pricesyncpro.com/guide)
- [Video Eğitimler](https://docs.pricesyncpro.com/videos)

### İletişim
- 📧 Email: support@pricesyncpro.com
- 💬 Discord: [PriceSync Pro Community](https://discord.gg/pricesyncpro)
- 🐛 Bug Reports: [GitHub Issues](https://github.com/PriceSyncPro/PriceSyncPro-FrontEnd/issues)

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasına bakın.

## 🙏 Teşekkürler

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Radix UI](https://www.radix-ui.com/) - UI primitives
- [ApexCharts](https://apexcharts.com/) - Chart library

---

**PriceSync Pro** ile e-ticaret fiyat yönetiminizi bir üst seviyeye taşıyın! 🚀
