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
    <div className="relative inline-flex items-center rounded-full border border-[#173f5f]/10 bg-white/60 p-1">
      {i18n.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
            className={`rounded-full px-3 py-2 text-xs font-bold transition-all duration-150 sm:px-4 sm:text-sm ${
            currentLang === locale
              ? 'bg-[#173f5f] text-white shadow-sm'
              : 'text-[#66717b] hover:bg-[#f4c95d]/25 hover:text-[#173f5f]'
          }`}
        >
          {locale === 'zh-TW' ? '中文' : 'EN'}
        </button>
      ))}
    </div>
  )
}
