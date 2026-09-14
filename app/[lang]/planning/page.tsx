import type { Locale } from "@/i18n.config";
import { pageMetadata } from "@/lib/seo";
import PageIntro from "@/components/PageIntro";
import PlanningProcess from "@/components/PlanningProcess";
import EnquiryCTA from "@/components/EnquiryCTA";
const copy = {
  "zh-TW": [
    "派對佈置預約流程與籌備清單",
    "由第一次查詢到完成現場佈置，了解需要提供的資料、方案確認及進撤場安排。先整理日期、場地與預算，讓每一步有清晰方向。",
  ],
  en: [
    "Booking process & party planning checklist",
    "From your first enquiry to the finished setup, learn what to share, how to confirm a plan and what to check with the venue. Start with your date, space and budget.",
  ],
};
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  return pageMetadata(lang, "/planning", copy[lang][0], copy[lang][1]);
}
export default async function Page({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const zh = lang === "zh-TW";
  const sections = zh
    ? [
        [
          "查詢前：整理活動資料",
          "準備活動日期、地址、場合、預計人數與預算範圍。附上場地全景相片、可用尺寸及喜歡的色調，並說明希望 DIY、自取或安排現場佈置。",
        ],
        [
          "確認方案：逐項核對內容",
          "核對佈置尺寸、物料、文字、顏色和數量，並確認運送、安裝及撤場是否包含在方案內。費用、付款安排、修改期限與改期條件應在確認時向團隊了解，避免以參考圖片推定全部項目。",
        ],
        [
          "活動前：與場地協調",
          "向場地確認進場時間、升降機及卸貨安排、牆身固定限制和通道要求。若有攝影、餐飲或其他供應商，先協調設備位置與完成時間，並指定當天聯絡人。",
        ],
        [
          "活動後：按約定撤場",
          "事先確認撤場時段、裝飾是否需要歸還，以及場地清理要求。租借物料和可帶走的用品應清楚區分，臨時變更先與團隊溝通。",
        ],
      ]
    : [
        [
          "Before enquiring: prepare a brief",
          "Gather the date, address, occasion, guest count and budget range. Include wide venue photographs, available dimensions and colour references. Tell us whether you prefer DIY, collection or on-site styling.",
        ],
        [
          "Confirm the plan: check the scope",
          "Review sizes, materials, wording, colours and quantities, and whether delivery, installation and removal are included. Ask about payment, revision deadlines and rescheduling terms when confirming; a reference image does not define the full scope.",
        ],
        [
          "Before the event: coordinate access",
          "Check setup times, lifts, unloading, fixing restrictions and walkways with the venue. Coordinate photography, catering and other suppliers, then nominate a contact for the day.",
        ],
        [
          "After the event: agree on removal",
          "Confirm the removal window, returnable items and cleanup requirements in advance. Distinguish hired materials from items you may keep, and discuss changes with the team.",
        ],
      ];
  return (
    <>
      <PageIntro
        lang={lang}
        eyebrow="Planning / 從靈感到現場"
        title={copy[lang][0]}
        description={copy[lang][1]}
      />
      <PlanningProcess lang={lang} />
      <section className="mx-auto max-w-5xl space-y-6 px-5 py-14">
        <h2 className="text-3xl font-black text-[#173f5f]">
          {zh ? "你的籌備清單" : "Your planning checklist"}
        </h2>
        {sections.map(([title, text]) => (
          <article
            key={title}
            className="rounded-3xl border border-[#173f5f]/15 bg-white p-7"
          >
            <h3 className="text-xl font-bold text-[#173f5f]">{title}</h3>
            <p className="mt-4 leading-8 text-[#66717b]">{text}</p>
          </article>
        ))}
      </section>
      <EnquiryCTA lang={lang} />
    </>
  );
}
