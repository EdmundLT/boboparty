'use client'

import { usePathname, useRouter } from 'next/navigation'
import { i18n, type Locale } from '@/i18n.config'

export default function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLang: Locale) => {
    if (newLang === 'zh-TW') {
      // If switching to Chinese, remove /en prefix
      if (pathname.startsWith('/en')) {
        const newPath = pathname.replace('/en', '') || '/'
        router.push(newPath)
      } else {
        router.push('/')
      }
    } else {
      // If switching to English, add /en prefix
      if (pathname.startsWith('/en')) {
        return // Already on English
      } else {
        router.push(`/en${pathname}`)
      }
    }
  }

  return (
    <div className="relative inline-flex items-center bg-gray-100 rounded-full p-1">
      {i18n.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            currentLang === locale
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {locale === 'zh-TW' ? '中文' : 'EN'}
        </button>
      ))}
    </div>
  )
}
