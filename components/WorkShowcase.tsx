import Image from "next/image"
import type { ShowcaseItem } from "@/types"

type WorkShowcaseProps = {
  items: ShowcaseItem[]
  lang: "zh-TW" | "en"
}

export default function WorkShowcase({ items, lang }: WorkShowcaseProps) {
  const title = lang === "zh-TW" ? "看見我們如何把空間變成回憶" : "See how we turn spaces into memories"
  const subtitle = lang === "zh-TW" ? "每個場合都有自己的氣氛，我們從你的故事開始設計。" : "Every occasion has its own atmosphere. We start with your story."
  const viewMore = lang === "zh-TW" ? "查看完整作品" : "View more work"

  return (
    <section className="bg-[#f7f2e9] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#ef6f61]">04 / Selected work</p>
            <h2 className="max-w-2xl text-4xl font-black leading-[1.02] tracking-[-0.05em] text-[#173f5f] sm:text-5xl">{title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#66717b]">{subtitle}</p>
        </div>

        <div className="grid gap-4 md:grid-cols-12 md:grid-rows-2 md:gap-5">
          {items.slice(0, 3).map((item, index) => (
            <article key={item.id} className={`group relative min-h-[17rem] overflow-hidden rounded-[1.75rem] bg-[#173f5f] ${index === 0 ? "md:col-span-7 md:row-span-2 md:min-h-[36rem]" : "md:col-span-5"}`}>
              <Image src={item.imageUrl} alt={item.title} fill className="object-cover transition duration-700 group-hover:scale-105" sizes={index === 0 ? "(min-width: 768px) 58vw, 100vw" : "(min-width: 768px) 42vw, 100vw"} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102f48]/90 via-[#173f5f]/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#f4c95d]">{item.category}</p>
                <h3 className="text-2xl font-black tracking-[-0.03em] text-white">{item.title}</h3>
                <p className="mt-2 max-w-md text-sm leading-6 text-white/70">{item.description}</p>
              </div>
            </article>
          ))}
          <a href="https://www.instagram.com/boboparty.hk/" target="_blank" rel="noopener noreferrer" className="flex min-h-28 items-center justify-between rounded-[1.75rem] bg-[#ef6f61] p-6 text-white transition hover:bg-[#e25e51] md:col-span-5">
            <span className="max-w-[14rem] text-xl font-black tracking-[-0.03em]">{viewMore}</span>
            <span className="text-4xl" aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
