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
import ToastContainer from "@/components/Toast";

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
        <nav className="sticky top-0 z-50 border-b border-[#173f5f]/10 bg-[#f7f2e9]/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-[4.5rem] items-center justify-between">
              <Link href={`${baseUrl}/`} className="group flex items-center gap-3 transition-opacity hover:opacity-80">
                <Image
                  src="/layout/logo.png"
                  alt="BoboParty Logo"
                  width={48}
                  height={48}
                  className="rounded-2xl object-cover shadow-sm"
                  priority
                />
                <span className="leading-none">
                  <span className="block text-lg font-black tracking-[-0.04em] text-[#173f5f]">Bobo Party</span>
                  <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.2em] text-[#ef6f61]">Party goods & moments</span>
                </span>
              </Link>
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="hidden items-center gap-1 rounded-full border border-[#173f5f]/10 bg-white/60 p-1 md:flex">
                  <Link
                    href={`${baseUrl}/`}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-[#66717b] transition-all duration-150 hover:bg-[#f4c95d]/25 hover:text-[#173f5f]"
                  >
                    {dict.navigation.home}
                  </Link>
                  <Link
                    href={`${baseUrl}/#services`}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-[#66717b] transition-all duration-150 hover:bg-[#f4c95d]/25 hover:text-[#173f5f]"
                  >
                    {dict.navigation.services}
                  </Link>
                  <Link
                    href={`${baseUrl}/blog`}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-[#66717b] transition-all duration-150 hover:bg-[#f4c95d]/25 hover:text-[#173f5f]"
                  >
                    {dict.navigation.blog}
                  </Link>
                  <Link
                    href={`${baseUrl}/about`}
                    className="rounded-full px-3 py-2 text-sm font-semibold text-[#66717b] transition-all duration-150 hover:bg-[#f4c95d]/25 hover:text-[#173f5f]"
                  >
                    {dict.navigation.about}
                  </Link>
                </div>
                <LanguageSwitcher currentLang={lang} />
                <MobileNav baseUrl={baseUrl} dict={dict} />
              </div>
            </div>
          </div>
        </nav>
        <main className="min-h-screen">{children}</main>
        <ToastContainer />
        <WhatsAppButton />
        <footer className="mt-16 border-t border-[#173f5f]/10 bg-[#173f5f] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-1 md:col-span-2">
                <div className="mb-4 flex items-center gap-3">
                  <Image
                    src="/layout/logo.png"
                    alt="BoboParty Logo"
                    width={40}
                    height={40}
                    className="rounded-xl"
                  />
                  <span className="text-lg font-black tracking-[-0.04em] text-white">Bobo Party</span>
                </div>
                <p className="max-w-md text-sm leading-6 text-white/65">
                  {dict.home.description}
                </p>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#f4c95d]">Explore</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href={`${baseUrl}/#services`} className="text-sm text-white/70 transition-colors hover:text-white">
                      {dict.navigation.services}
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/#contact`} className="text-sm text-white/70 transition-colors hover:text-white">
                      {dict.navigation.contact}
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#f4c95d]">About</h3>
                <ul className="space-y-3">
                  <li>
                    <Link href={`${baseUrl}/about`} className="text-sm text-white/70 transition-colors hover:text-white">
                      {dict.navigation.about}
                    </Link>
                  </li>
                  <li>
                    <Link href={`${baseUrl}/blog`} className="text-sm text-white/70 transition-colors hover:text-white">
                      {dict.navigation.blog}
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-8 border-t border-white/15 pt-8">
              <p className="text-center text-xs text-white/45">
                © {new Date().getFullYear()} BoboParty. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
