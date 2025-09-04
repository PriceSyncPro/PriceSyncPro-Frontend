import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gizlilik Politikası - PriceSyncPro",
  description: "PriceSyncPro gizlilik politikası. Kişisel verilerinizin nasıl toplandığı, kullanıldığı ve korunduğu hakkında detaylı bilgi.",
  keywords: ["gizlilik politikası", "kişisel veriler", "KVKK", "veri güvenliği", "PriceSyncPro"],
  openGraph: {
    title: "Gizlilik Politikası - PriceSyncPro",
    description: "PriceSyncPro gizlilik politikası ve kişisel veri koruma uygulamaları.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Gizlilik Politikası - PriceSyncPro",
    description: "PriceSyncPro gizlilik politikası ve kişisel veri koruma uygulamaları.",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="pt-16 pb-12 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Gizlilik Politikası
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Kişisel verilerinizin güvenliği bizim için önceliklidir. 
              Bu politika, verilerinizin nasıl toplandığı ve kullanıldığını açıklar.
            </p>
            <div className="mt-6 text-sm text-gray-500">
              Son güncelleme: 31 Ocak 2025
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 border border-gray-200">
            <div className="prose prose-lg max-w-none">
              
              {/* Introduction */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Giriş</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  PriceSyncPro olarak, kullanıcılarımızın gizliliğini korumak ve kişisel verilerini güvenli bir şekilde işlemek 
                  en önemli önceliklerimizden biridir. Bu Gizlilik Politikası, PriceSyncPro platformunu kullanırken 
                  kişisel verilerinizin nasıl toplandığı, kullanıldığı, saklandığı ve korunduğu hakkında bilgi vermektedir.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Bu politika, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) ve ilgili mevzuat 
                  uyarınca hazırlanmıştır.
                </p>
              </div>

              {/* Data Collection */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Toplanan Veriler</h2>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Kişisel Bilgiler</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Ad, soyad ve iletişim bilgileri (e-posta, telefon)</li>
                  <li>Şirket bilgileri ve iş unvanı</li>
                  <li>Hesap oluşturma ve giriş bilgileri</li>
                  <li>Fatura ve ödeme bilgileri</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Teknik Veriler</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>IP adresi ve konum bilgileri</li>
                  <li>Tarayıcı türü ve sürümü</li>
                  <li>Cihaz bilgileri ve işletim sistemi</li>
                  <li>Platform kullanım istatistikleri</li>
                  <li>Çerezler (cookies) ve benzeri teknolojiler</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 İş Verileri</h3>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Takip edilen ürün bilgileri</li>
                  <li>Fiyat analizi verileri</li>
                  <li>Rakip analizi bilgileri</li>
                  <li>Raporlar ve dashboard ayarları</li>
                </ul>
              </div>

              {/* Data Usage */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Verilerin Kullanım Amaçları</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Toplanan kişisel veriler aşağıdaki amaçlarla kullanılmaktadır:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Platform hizmetlerinin sunulması ve geliştirilmesi</li>
                  <li>Kullanıcı hesaplarının yönetimi ve güvenliği</li>
                  <li>Müşteri destek hizmetlerinin sağlanması</li>
                  <li>Fatura ve ödeme işlemlerinin gerçekleştirilmesi</li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                  <li>Platform performansının analiz edilmesi ve iyileştirilmesi</li>
                  <li>Güvenlik önlemlerinin alınması ve dolandırıcılığın önlenmesi</li>
                  <li>Pazarlama ve iletişim faaliyetleri (onay verilen durumlarda)</li>
                </ul>
              </div>

              {/* Data Sharing */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Veri Paylaşımı</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kişisel verileriniz aşağıdaki durumlar dışında üçüncü taraflarla paylaşılmaz:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Yasal zorunluluklar ve mahkeme kararları</li>
                  <li>Hizmet sağlayıcılar (bulut depolama, ödeme işlemcileri)</li>
                  <li>İş ortakları (sadece gerekli olan veriler)</li>
                  <li>Açık rızanızın bulunduğu durumlar</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Tüm veri paylaşımları gizlilik sözleşmeleri ve güvenlik önlemleri ile korunmaktadır.
                </p>
              </div>

              {/* Data Security */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Veri Güvenliği</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kişisel verilerinizin güvenliği için aşağıdaki önlemler alınmaktadır:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>SSL/TLS şifreleme teknolojileri</li>
                  <li>Güvenli veri merkezleri ve yedekleme sistemleri</li>
                  <li>Erişim kontrolü ve kimlik doğrulama</li>
                  <li>Düzenli güvenlik denetimleri ve testleri</li>
                  <li>Personel eğitimleri ve gizlilik sözleşmeleri</li>
                  <li>Güvenlik ihlali durumunda acil müdahale planları</li>
                </ul>
              </div>

              {/* User Rights */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Kullanıcı Hakları</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  KVKK kapsamında aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
                  <li>İşleme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme</li>
                  <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                  <li>Kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                  <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi sonucu aleyhte bir sonucun ortaya çıkmasına itiraz etme</li>
                  <li>Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Bu haklarınızı kullanmak için <a href="mailto:privacy@pricesyncpro.com" className="text-gray-900 hover:underline font-medium">privacy@pricesyncpro.com</a> adresine başvurabilirsiniz.
                </p>
              </div>

              {/* Cookies */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Çerezler (Cookies)</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Platformumuz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li><strong>Zorunlu Çerezler:</strong> Platform işlevselliği için gerekli</li>
                  <li><strong>Performans Çerezleri:</strong> Site performansını analiz etmek için</li>
                  <li><strong>İşlevsellik Çerezleri:</strong> Kullanıcı tercihlerini hatırlamak için</li>
                  <li><strong>Pazarlama Çerezleri:</strong> Kişiselleştirilmiş içerik sunmak için (onay ile)</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Çerez ayarlarınızı tarayıcınızdan yönetebilir veya platform ayarlarından değiştirebilirsiniz.
                </p>
              </div>

              {/* Data Retention */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Veri Saklama Süresi</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca saklanır:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>Hesap verileri: Hesap aktif olduğu sürece</li>
                  <li>İş verileri: Hizmet sözleşmesi süresi + 5 yıl</li>
                  <li>Fatura bilgileri: Yasal zorunluluk süresi (10 yıl)</li>
                  <li>Log kayıtları: 2 yıl</li>
                  <li>Pazarlama verileri: Onay geri alınana kadar</li>
                </ul>
              </div>

              {/* International Transfers */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Uluslararası Veri Transferi</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Kişisel verileriniz, hizmet kalitesini artırmak amacıyla yurt dışındaki güvenilir 
                  hizmet sağlayıcılara aktarılabilir. Bu transferler:
                </p>
                <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                  <li>KVKK ve GDPR uyumlu şekilde gerçekleştirilir</li>
                  <li>Yeterli koruma seviyesine sahip ülkelere yapılır</li>
                  <li>Standart sözleşme hükümleri ile güvence altına alınır</li>
                  <li>Düzenli denetimlerle kontrol edilir</li>
                </ul>
              </div>

              {/* Changes */}
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Politika Değişiklikleri</h2>
                <p className="text-gray-700 leading-relaxed">
                  Bu Gizlilik Politikası, yasal değişiklikler veya hizmet güncellemeleri nedeniyle 
                  zaman zaman güncellenebilir. Önemli değişiklikler e-posta yoluyla bildirilecek 
                  ve platform üzerinde duyurulacaktır. Güncellenmiş politika, yayınlandığı tarihten 
                  itibaren geçerli olacaktır.
                </p>
              </div>

              {/* Contact */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. İletişim</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Gizlilik politikası ile ilgili sorularınız için:
                </p>
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="space-y-2">
                    <p className="text-gray-900 font-medium">
                      <strong>E-posta:</strong> privacy@pricesyncpro.com
                    </p>
                    <p className="text-gray-900 font-medium">
                      <strong>Telefon:</strong> +90 (212) 555 0123
                    </p>
                    <p className="text-gray-900 font-medium">
                      <strong>Adres:</strong> Maslak Mahallesi, Büyükdere Caddesi No:123, Sarıyer, İstanbul 34485
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
