import type { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import { getDictionary } from "@/lib/get-dictionary";
import CartClient from "@/components/CartClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return {
    title: dict.cart.title,
    description: dict.cart.subtitle,
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default async function CartPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const baseUrl = lang === "zh-TW" ? "" : "/en";

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-3xl font-bold text-gray-900">{dict.cart.title}</h1>
          <p className="text-gray-600 mt-2">{dict.cart.subtitle}</p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <CartClient baseUrl={baseUrl} dict={dict.cart} />
      </section>
    </div>
  );
}
