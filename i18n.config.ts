export const i18n = {
  defaultLocale: 'zh-TW',
  locales: ['zh-TW', 'en'],
} as const

export type Locale = (typeof i18n)['locales'][number]
