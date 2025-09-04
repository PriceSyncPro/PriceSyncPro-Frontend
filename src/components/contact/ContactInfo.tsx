export default function ContactInfo() {
  const contactItems = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "E-posta",
      value: "info@pricesyncpro.com",
      description: "Genel sorularınız için",
      link: "mailto:info@pricesyncpro.com"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Telefon",
      value: "+90 (212) 555 0123",
      description: "Pazartesi - Cuma, 09:00 - 18:00",
      link: "tel:+902125550123"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Adres",
      value: "Maslak Mahallesi, Büyükdere Caddesi No:123",
      description: "Sarıyer, İstanbul 34485",
      link: "https://maps.google.com/?q=Maslak+Mahallesi+Büyükdere+Caddesi+123+Sarıyer+İstanbul"
    }
  ];

  const supportChannels = [
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
      ),
      title: "Canlı Destek",
      description: "7/24 online destek",
      action: "Sohbet Başlat",
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
      ),
      title: "Destek E-postası",
      description: "24 saat içinde yanıt",
      action: "E-posta Gönder",
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z" clipRule="evenodd" />
        </svg>
      ),
      title: "Demo Talebi",
      description: "Ücretsiz demo rezervasyonu",
      action: "Demo Planla",
      color: "bg-purple-500 hover:bg-purple-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Main Contact Info */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          İletişim Bilgileri
        </h3>
        <div className="space-y-6">
          {contactItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700">
                {item.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                {item.link ? (
                  <a 
                    href={item.link}
                    className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
                    target={item.link.startsWith('http') ? '_blank' : undefined}
                    rel={item.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-gray-900 font-medium">{item.value}</p>
                )}
                <p className="text-gray-600 text-sm mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Support Options */}
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
        <h3 className="text-xl font-bold text-gray-900 mb-6">
          Hızlı Destek
        </h3>
        <div className="space-y-4">
          {supportChannels.map((channel, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 ${channel.color} rounded-lg flex items-center justify-center text-white`}>
                  {channel.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{channel.title}</h4>
                  <p className="text-gray-600 text-sm">{channel.description}</p>
                </div>
              </div>
              <button className={`px-4 py-2 ${channel.color} text-white rounded-lg font-medium transition-colors text-sm`}>
                {channel.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-red-900 mb-2">Acil Durum Desteği</h4>
            <p className="text-red-800 text-sm mb-3">
              Kritik sistem sorunları için 7/24 acil destek hattımızı arayabilirsiniz.
            </p>
            <a 
              href="tel:+902125550199" 
              className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors text-sm"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              +90 (212) 555 01 99
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
