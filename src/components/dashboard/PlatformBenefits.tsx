export default function PlatformBenefits() {
  return (
    <>
      {/* Platform Benefits */}
      <div className="bg-white rounded-xl border border-gray-100 p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-1">
            Neden PriceSyncPro?
          </h2>
          <p className="text-gray-500 text-sm">
            Rekabet avantajınızı koruyacak güçlü özellikler
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 text-sm mb-1">Hızlı Kurulum</h3>
            <p className="text-gray-500 text-xs">2 dakikada başlayın</p>
          </div>

          <div className="text-center p-3">
            <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 text-sm mb-1">Güvenli Platform</h3>
            <p className="text-gray-500 text-xs">SSL koruması</p>
          </div>

          <div className="text-center p-3">
            <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 text-sm mb-1">Gerçek Zamanlı</h3>
            <p className="text-gray-500 text-xs">Anında takip</p>
          </div>

          <div className="text-center p-3">
            <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center mx-auto mb-3">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
              </svg>
            </div>
            <h3 className="font-medium text-gray-900 text-sm mb-1">7/24 Destek</h3>
            <p className="text-gray-500 text-xs">Türkçe destek</p>
          </div>
        </div>
      </div>
    </>
  );
}
