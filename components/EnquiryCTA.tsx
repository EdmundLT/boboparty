import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { WHATSAPP_URL } from "@/data/stores";
import { localPath } from "@/lib/seo";
export default function EnquiryCTA({
  lang,
  planningHref,
}: {
  lang: Locale;
  planningHref?: string;
}) {
  const zh = lang === "zh-TW";
  return (
    <section className="bg-[#173f5f] px-5 py-14 text-white sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-8 lg:flex-row lg:items-center">
        <div>
          <p className="mb-3 text-xs font-bold tracking-widest text-[#f4c95d]">
            LET’S MAKE A MOMENT
          </p>
          <h2 className="text-3xl font-black sm:text-4xl">
            {zh ? "你的想法，是派對的起點。" : "Your idea is where it begins."}
          </h2>
          <p className="mt-4 max-w-xl leading-7 text-white/80">
            {zh
              ? "告訴我們日期、場地與預算，一起討論適合你的佈置方向。項目、檔期與費用以確認方案為準。"
              : "Share your date, venue and budget to discuss a suitable direction. Scope, availability and pricing are confirmed with your plan."}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-4">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#f4c95d] px-7 py-4 text-center font-bold text-[#173f5f]"
          >
            {zh ? "WhatsApp 查詢佈置 ↗" : "Enquire on WhatsApp ↗"}
          </a>
          <Link
            href={planningHref ?? localPath(lang, "/planning")}
            className="text-center text-sm underline underline-offset-4"
          >
            {zh ? "先了解預約流程" : "Explore the booking process"}
          </Link>
        </div>
      </div>
    </section>
  );
}
