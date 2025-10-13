import type { Locale } from '@/i18n.config'

const dictionaries = {
  'zh-TW': () => import('@/dictionaries/zh-TW.json').then((module) => module.default),
  en: () => import('@/dictionaries/en.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => {
  const dictionary = dictionaries[locale];
  if (!dictionary) {
    throw new Error(`Dictionary not found for locale: ${locale}`);
  }
  return dictionary();
}
