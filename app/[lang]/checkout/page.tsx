import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/get-dictionary";

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const baseUrl = lang === "zh-TW" ? "" : "/en";

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{dict.checkout.title}</h1>
          <p className="text-gray-600">{dict.checkout.subtitle}</p>
          <Link
            href={`${baseUrl}/cart`}
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700"
          >
            {dict.checkout.goToCart}
          </Link>
        </div>
      </section>
    </div>
  );
}
