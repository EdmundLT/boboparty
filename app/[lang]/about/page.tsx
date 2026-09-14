import { pageMetadata } from '@/lib/seo';
import { getDictionary } from "@/lib/get-dictionary";
import type { Locale } from "@/i18n.config";
import type { Metadata } from "next";
import StoreInfo from "@/components/StoreInfo";
import { WHATSAPP_URL, SHOP_LOCATIONS } from "@/data/stores";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);

  return pageMetadata(lang, "/about", dict.about.title, dict.about.subtitle);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = (await params) as { lang: Locale };
  const dict = await getDictionary(lang);
  const isZh = lang === "zh-TW";
  const baseUrl = isZh ? "" : "/en";

  const intro = isZh
    ? "我們相信，最好的派對不是最完美的派對，而是最像你的那一個。"
    : "We believe the best parties are not the most perfect ones. They are the ones that feel most like you.";
  const serviceLead = isZh
    ? "不論是一個小小的生日驚喜，還是一場需要被記住的品牌活動，我們都會從你的故事出發。"
    : "Whether it is a small birthday surprise or a brand event worth remembering, we start with your story.";
  const contactLabel = isZh ? "和我們聊聊你的想法" : "Talk to us about your idea";
  const contactDescription = isZh
    ? "告訴我們日期、地點和你想營造的感覺，我們會回覆適合你的方向。"
    : "Share your date, venue, and the feeling you want to create. We will come back with a direction that fits.";

  return (
    <div className="min-h-screen bg-[#f7f2e9] text-[#17212b]">
      <section className="relative overflow-hidden border-b border-[#173f5f]/10">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-24">
          <div>
            <p className="mb-6 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#ef6f61]">
              <span className="h-px w-8 bg-[#ef6f61]" />
              01 / About BoboParty
            </p>
            <h1 className="max-w-xl text-5xl font-black leading-[0.98] tracking-[-0.06em] text-[#173f5f] sm:text-6xl lg:text-7xl">
              {dict.about.title}
            </h1>
            <p className="mt-7 max-w-lg text-lg leading-8 text-[#66717b]">{dict.about.subtitle}</p>
            <p className="mt-8 max-w-md text-xl font-semibold leading-8 text-[#ef6f61]">{intro}</p>
          </div>
          <div className="relative mx-auto w-full max-w-xl pb-8 pl-3 sm:pl-8">
            <div className="relative aspect-[1.15] overflow-hidden rounded-[2rem] border-[10px] border-white shadow-[0_24px_50px_rgba(23,63,95,0.15)] sm:rounded-[2.5rem] sm:border-[14px]">
              <Image
                src="https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=1200&q=85"
                alt={isZh ? "BoboParty 派對佈置" : "A BoboParty celebration setup"}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -bottom-1 left-0 rounded-2xl bg-[#f4c95d] px-5 py-4 shadow-lg sm:left-3">
              <p className="text-3xl font-black leading-none text-[#173f5f]">3</p>
              <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.16em] text-[#173f5f]/70">{isZh ? "香港實體店" : "Hong Kong stores"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-[#ef6f61]">02 / Our story</p>
              <h2 className="max-w-sm text-4xl font-black leading-[1.03] tracking-[-0.05em] text-[#173f5f] sm:text-5xl">{dict.about.ourStory.title}</h2>
            </div>
            <div className="max-w-2xl space-y-5 text-base leading-8 text-[#66717b] sm:text-lg">
              <p>{dict.about.ourStory.content1}</p>
              <p>{dict.about.ourStory.content2}</p>
              <p>{dict.about.ourStory.content3}</p>
              <div className="mt-8 border-l-4 border-[#ef6f61] bg-[#f7f2e9] px-6 py-5 text-lg font-semibold leading-7 text-[#173f5f] sm:px-8">
                {serviceLead}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#e7efee] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#173f5f]/15 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#ef6f61]">03 / Why us</p>
              <h2 className="text-4xl font-black tracking-[-0.05em] text-[#173f5f] sm:text-5xl">{dict.about.whyChooseUs.title}</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#66717b]">{isZh ? "把專業留給我們，把難忘留給你。" : "Leave the logistics to us. Keep the good memories for yourself."}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ["01", dict.about.whyChooseUs.quality.title, dict.about.whyChooseUs.quality.description, "bg-[#173f5f]"],
              ["02", dict.about.whyChooseUs.experience.title, dict.about.whyChooseUs.experience.description, "bg-[#ef6f61]"],
              ["03", dict.about.whyChooseUs.service.title, dict.about.whyChooseUs.service.description, "bg-[#f4c95d]"],
            ].map(([number, title, description, accent]) => (
              <article key={number} className="rounded-[1.75rem] bg-white p-7 shadow-[0_10px_30px_rgba(23,63,95,0.06)] sm:p-8">
                <div className={`mb-14 h-1.5 w-14 rounded-full ${accent}`} />
                <span className="text-xs font-black tracking-[0.2em] text-[#66717b]">{number}</span>
                <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-[#173f5f]">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-[#66717b]">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#173f5f] py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 sm:px-8 lg:flex-row lg:items-center lg:px-10">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f4c95d]">04 / Let&apos;s make it</p>
            <h2 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">{contactLabel}</h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">{contactDescription}</p>
          </div>
          <Link href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-[#f4c95d] px-7 py-4 text-sm font-black text-[#173f5f] transition hover:-translate-y-0.5 hover:bg-[#f8d879]">
            {isZh ? "WhatsApp 聯絡我們" : "Message us on WhatsApp"}
            <span className="text-lg" aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="bg-[#f7f2e9] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#ef6f61]">05 / Find us</p>
              <h2 className="text-4xl font-black tracking-[-0.05em] text-[#173f5f] sm:text-5xl">{dict.about.visitUs}</h2>
            </div>
            <Link href={`${baseUrl}/contact`} className="text-sm font-bold text-[#ef6f61] hover:text-[#173f5f]">{isZh ? "需要幫忙？聯絡我們 ↗" : "Need a hand? Contact us ↗"}</Link>
          </div>
          <StoreInfo locations={SHOP_LOCATIONS} dict={dict} />
        </div>
      </section>
    </div>
  );
}
