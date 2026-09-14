'use client'

import { usePathname, useRouter } from 'next/navigation'
import { i18n, type Locale } from '@/i18n.config'

export default function LanguageSwitcher({ currentLang }: { currentLang: Locale }) {
  const pathname = usePathname()
  const router = useRouter()

  const switchLanguage = (newLang: Locale) => {
    const contentPath = pathname.replace(/^\/(en|zh-TW)(?=\/|$)/, '') || '/'
    router.push(newLang === 'en' ? `/en${contentPath === '/' ? '' : contentPath}` : contentPath)
  }

  return (
    <div className="relative inline-flex shrink-0 items-center rounded-full border border-[#173f5f]/10 bg-white/60 p-1">
      {i18n.locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLanguage(locale)}
            className={`whitespace-nowrap rounded-full px-2 py-2 text-xs font-bold transition-all duration-150 sm:px-4 sm:text-sm ${
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
