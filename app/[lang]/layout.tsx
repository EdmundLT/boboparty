import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { i18n, type Locale } from "@/i18n.config";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "next/link";
import Image from "next/image";
import { getDictionary } from "@/lib/get-dictionary";
import WhatsAppButton from "@/components/WhatsAppButton";
import MobileNav from "@/components/MobileNav";
import CartIcon from "@/components/CartIcon";
import ToastContainer from "@/components/Toast";
import SearchModal from "@/components/SearchModal";

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
        <nav className="border-b border-gray-200 bg-white/95 backdrop-blur-lg shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <Link href={`${baseUrl}/`} className="flex items-center gap-3 group transition-opacity hover:opacity-80">
                <Image
                  src="/layout/logo.png"
                  alt="BoboParty Logo"
                  width={48}
                  height={48}
                  className="rounded-xl shadow-sm object-cover"
                  priority
                />
                <span className="text-lg font-semibold text-gray-900">Bobo Party</span>
              </Link>
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="hidden md:flex items-center gap-1">
                  <Link
                    href={`${baseUrl}/`}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                  >
                    {dict.navigation.home}
                  </Link>
                  <Link
                    href={`${baseUrl}/products`}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                  >
                    {dict.navigation.products}
                  </Link>
                  <Link
                    href={`${baseUrl}/blog`}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                  >
                    {dict.navigation.blog}
                  </Link>
                  <Link
                    href={`${baseUrl}/about`}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-150"
                  >
                    {dict.navigation.about}
                  </Link>
                </div>
                <SearchModal baseUrl={baseUrl} dict={dict} />
                <CartIcon baseUrl={baseUrl} />
                <LanguageSwitcher currentLang={lang} />
                <MobileNav baseUrl={baseUrl} dict={dict} />
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
        <ToastContainer />
        <WhatsAppButton />
        <footer className="border-t border-gray-200 bg-white mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/layout/logo.png"
                    alt="BoboParty Logo"
                    width={40}
                    height={40}
                    className="rounded-lg"
                  />
                  <span className="text-lg font-semibold text-gray-900">Bobo Party</span>
                </div>
                <p className="text-sm text-gray-600 max-w-md">
                  {dict.home.description}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">Shop</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href={`${baseUrl}/products`} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {dict.navigation.products}
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/cart`} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {dict.navigation.cart}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-4">About</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href={`${baseUrl}/about`} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {dict.navigation.about}
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/blog`} className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                      {dict.navigation.blog}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                © {new Date().getFullYear()} BoboParty. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
