import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-16 sm:px-6 sm:py-24 md:grid md:place-items-center lg:px-8">
      <div className="max-w-max mx-auto">
        <main className="sm:flex">
          <p className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 sm:text-5xl">404</p>
          <div className="sm:ml-6">
            <div className="sm:border-l sm:border-gray-200 dark:sm:border-gray-700 sm:pl-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight sm:text-5xl">
                Sayfa bulunamadı
              </h1>
              <p className="mt-1 text-base text-gray-500 dark:text-gray-400">
                Aradığınız sayfa mevcut değil.
              </p>
            </div>
            <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
              <Link
                href="/dashboard"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Ana sayfaya dön
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                İletişime geç
              </Link>
            </div>
          </div>
        </main>
        
        {/* Yardımcı Bilgiler */}
        <div className="mt-16">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Bu sayfa olması mı gerekiyordu?
          </h2>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Eğer bu sayfanın var olması gerektiğini düşünüyorsanız:
            </p>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3"></span>
                URL&apos;yi tekrar kontrol edin
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3"></span>
                Ana sayfadan doğru bağlantıyı bulun
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-1.5 w-1.5 rounded-full bg-gray-400 mt-2 mr-3"></span>
                Sorun devam ederse bizimle iletişime geçin
              </li>
            </ul>
          </div>
        </div>

        {/* Popüler Sayfalar */}
        <div className="mt-8">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Popüler sayfalar
          </h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Link
              href="/dashboard"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Dashboard
            </Link>
            <Link
              href="/dashboard/products"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Ürünler
            </Link>
            <Link
              href="/dashboard/rules"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Kurallar
            </Link>
            <Link
              href="/dashboard/profile"
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
            >
              Profil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
