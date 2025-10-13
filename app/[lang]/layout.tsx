import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "@/i18n.config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/get-dictionary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BoboParty",
  description: "Professional party planning services",
  icons: {
    icon: '/layout/logo.png',
  },
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Locale };
  const dict = await getDictionary(lang);
  const baseUrl = lang === 'zh-TW' ? '' : '/en';

  return (
    <html lang={lang}>
      <body className={inter.className}>
        <nav className="border-b bg-white shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href={`${baseUrl}/`} className="flex items-center gap-3 group">
                <Image
                  src="/layout/logo.png"
                  alt="BoboParty Logo"
                  width={56}
                  height={56}
                  className="rounded-lg shadow-sm object-cover"
                  priority
                />
                Bobo Party
              </Link>
              <div className="flex items-center gap-8">
                <div className="hidden md:flex items-center gap-8">
                  <Link
                    href={`${baseUrl}/`}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
                  >
                    {dict.navigation.home}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    href={`${baseUrl}/about`}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
                  >
                    {dict.navigation.about}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    href={`${baseUrl}/blog`}
                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium relative group"
                  >
                    {dict.navigation.blog}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
                  </Link>
                </div>
                <LanguageSwitcher currentLang={lang} />
              </div>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
