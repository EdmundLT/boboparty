type ServicesOverviewProps = {
  lang: "zh-TW" | "en"
}

const services = {
  "zh-TW": [
    {
      number: "01",
      title: "主題與概念策劃",
      description: "從一個想法開始，為你的派對整理主題、色調與氣氛，做出真正屬於你的設計方向。",
      detail: "主題定位 · 色彩配搭 · 視覺建議",
      accent: "bg-[#ef6f61]",
    },
    {
      number: "02",
      title: "氣球藝術佈置",
      description: "由專業團隊打造氣球拱門、背景牆、桌面裝飾及拍照位，讓場地一到場就有主角感。",
      detail: "拱門 · 背景牆 · 拍照位",
      accent: "bg-[#f4c95d]",
    },
    {
      number: "03",
      title: "場地佈置與撤場",
      description: "由運送、安裝到活動後撤場一站式處理，讓你把時間留給真正重要的人和時刻。",
      detail: "運送 · 安裝 · 撤場",
      accent: "bg-[#8ed1c7]",
    },
    {
      number: "04",
      title: "企業活動與開幕",
      description: "配合品牌色彩與活動目標，為開幕禮、週年、發佈會及公司聚會打造專業現場。",
      detail: "品牌活動 · 開幕禮 · 週年會",
      accent: "bg-[#173f5f]",
    },
    {
      number: "05",
      title: "婚禮與人生大事",
      description: "婚禮、求婚、滿月、百日宴，每個值得紀念的日子，我們都用細節把情緒留下來。",
      detail: "婚禮 · 求婚 · 親子派對",
      accent: "bg-[#ef6f61]",
    },
    {
      number: "06",
      title: "派對諮詢與 DIY 支援",
      description: "想自己動手也可以。從尺寸、數量到現場效果，我們提供實用建議，陪你完成理想佈置。",
      detail: "方案諮詢 · DIY 指導 · 自取安排",
      accent: "bg-[#f4c95d]",
    },
  ],
  en: [
    {
      number: "01",
      title: "Theme & Concept",
      description: "We turn a first idea into a clear direction with a considered theme, palette, and atmosphere made for you.",
      detail: "Theme direction · Color palette · Visual advice",
      accent: "bg-[#ef6f61]",
    },
    {
      number: "02",
      title: "Balloon Styling",
      description: "From arches to backdrops, our team creates the visual centerpiece that makes a space feel instantly special.",
      detail: "Arches · Backdrops · Photo moments",
      accent: "bg-[#f4c95d]",
    },
    {
      number: "03",
      title: "Setup & Teardown",
      description: "Delivery, installation, and teardown are handled end to end, so you can stay present for the people who matter.",
      detail: "Delivery · Installation · Teardown",
      accent: "bg-[#8ed1c7]",
    },
    {
      number: "04",
      title: "Corporate Events",
      description: "We translate your brand into a polished setting for launches, anniversaries, openings, and team celebrations.",
      detail: "Brand events · Openings · Anniversaries",
      accent: "bg-[#173f5f]",
    },
    {
      number: "05",
      title: "Weddings & Milestones",
      description: "For weddings, proposals, baby celebrations, and every once-in-a-lifetime day, we make the details feel personal.",
      detail: "Weddings · Proposals · Family celebrations",
      accent: "bg-[#ef6f61]",
    },
    {
      number: "06",
      title: "DIY Advice",
      description: "Prefer to make it yourself? We help with sizing, quantities, and practical guidance to bring your own setup to life.",
      detail: "Consultation · DIY guidance · Pickup planning",
      accent: "bg-[#f4c95d]",
    },
  ],
} as const

export default function ServicesOverview({ lang }: ServicesOverviewProps) {
  const copy = lang === "zh-TW"
    ? { eyebrow: "我們可以一起完成的事", title: "不只佈置場地，\n我們在打造一個時刻。", subtitle: "從第一個靈感，到賓客離場後仍會記得的畫面，我們替你處理每個重要細節。" }
    : { eyebrow: "What we can make together", title: "More than a setup.\nA moment worth remembering.", subtitle: "From the first spark of an idea to the photo everyone keeps, we handle the details that make a celebration feel like yours." }

  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="grid gap-10 border-b border-[#173f5f]/15 pb-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-end lg:gap-20">
          <div>
            <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[#ef6f61]">
              <span className="h-px w-8 bg-[#ef6f61]" />
              02 / Services
            </p>
            <h2 className="whitespace-pre-line text-4xl font-black leading-[1.02] tracking-[-0.055em] text-[#173f5f] sm:text-5xl lg:text-6xl">
              {copy.title}
            </h2>
          </div>
          <div className="max-w-xl lg:pb-1">
            <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-[#ef6f61]">{copy.eyebrow}</p>
            <p className="text-lg leading-8 text-[#66717b] sm:text-xl">{copy.subtitle}</p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services[lang].map((service) => (
            <article key={service.number} className="group relative overflow-hidden rounded-[1.75rem] border border-[#173f5f]/12 bg-[#f7f2e9] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_45px_rgba(23,63,95,0.1)] sm:p-7">
              <div className={`mb-12 h-1.5 w-14 rounded-full ${service.accent} transition-all duration-300 group-hover:w-24`} />
              <span className="text-xs font-black tracking-[0.2em] text-[#66717b]">{service.number}</span>
              <h3 className="mt-3 text-2xl font-black tracking-[-0.035em] text-[#173f5f]">{service.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#66717b]">{service.description}</p>
              <p className="mt-6 border-t border-[#173f5f]/10 pt-4 text-[10px] font-bold uppercase tracking-[0.14em] text-[#173f5f]/65">{service.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
