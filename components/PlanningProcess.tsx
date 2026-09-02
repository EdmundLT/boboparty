type PlanningProcessProps = {
  lang: "zh-TW" | "en"
}

const steps = {
  "zh-TW": [
    ["01", "告訴我們你的想法", "日期、地點、場合和一點點靈感，先從聊天開始。"],
    ["02", "一起定下方案", "我們會按場地、預算和氣氛，整理出清晰可行的佈置方向。"],
    ["03", "交給我們準備", "確認細節後，團隊會安排製作、運送和現場時間表。"],
    ["04", "放心享受當天", "我們到場完成佈置，你只需要出席、拍照、好好慶祝。"],
  ],
  en: [
    ["01", "Tell us the idea", "Share the date, place, occasion, and the little spark that started it."],
    ["02", "Shape the plan", "We turn your space, budget, and mood into a clear, workable direction."],
    ["03", "Let us prep", "Once the details are set, we coordinate the making, delivery, and setup."],
    ["04", "Enjoy the day", "We create the scene. You show up, take photos, and celebrate properly."],
  ],
} as const

export default function PlanningProcess({ lang }: PlanningProcessProps) {
  const title = lang === "zh-TW" ? "你的派對，從這裡開始。" : "Your celebration starts here."
  const subtitle = lang === "zh-TW" ? "簡單四步，由靈感走到現場。" : "Four simple steps from first thought to finished scene."

  return (
    <section className="overflow-hidden bg-[#173f5f] py-20 text-white sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="mb-14 flex flex-col justify-between gap-5 border-b border-white/20 pb-8 sm:flex-row sm:items-end">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-[#f4c95d]">03 / How it works</p>
            <h2 className="text-4xl font-black tracking-[-0.05em] sm:text-5xl">{title}</h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-white/65">{subtitle}</p>
        </div>
        <div className="grid gap-8 md:grid-cols-4 md:gap-5">
          {steps[lang].map(([number, stepTitle, description]) => (
            <div key={number} className="relative border-l border-white/25 pl-5 md:min-h-48">
              <span className="text-xs font-bold tracking-[0.2em] text-[#f4c95d]">{number}</span>
              <h3 className="mt-5 text-xl font-black tracking-[-0.025em]">{stepTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-white/65">{description}</p>
              {number !== "04" ? <span className="absolute right-0 top-1 hidden text-xl text-white/30 md:block" aria-hidden="true">→</span> : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
