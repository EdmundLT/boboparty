import type { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/get-dictionary";
import { INSTAGRAM_FEATURED_POSTS } from "@/data/instagram";
import InstagramGrid from "@/components/InstagramGrid";
export default async function InstagramSection({ lang }: { lang: Locale }) {
  const dict = await getDictionary(lang);
  return (
    <section id="instagram" className="bg-[#e7efee] py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-9 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-3 text-xs font-bold tracking-widest text-[#a84135]">
              FOLLOW THE CELEBRATION
            </p>
            <h2 className="text-3xl font-black text-[#173f5f] sm:text-4xl">
              {dict.home.instagram.title}
            </h2>
            <p className="mt-3 leading-7 text-[#66717b]">
              {lang === "en"
                ? "Selected posts from @boboparty.hk. Visit Instagram for the latest updates."
                : "精選 @boboparty.hk 貼文，更多最新作品與動態請到 Instagram 查看。"}
            </p>
          </div>
          <a
            href="https://www.instagram.com/boboparty.hk/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#173f5f] underline underline-offset-4"
          >
            @boboparty.hk ↗
          </a>
        </div>
        <InstagramGrid posts={INSTAGRAM_FEATURED_POSTS} dict={dict} />
      </div>
    </section>
  );
}
