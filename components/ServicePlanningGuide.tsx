import type { Locale } from "@/i18n.config";
import { CONTACT_WHATSAPP, SHOP_LOCATIONS, WHATSAPP_URL } from "@/data/stores";
import services from "@/data/services.json";

export default function ServicePlanningGuide({ lang }: { lang: Locale }) {

  const zh = lang === "zh-TW";
  const steps = zh
    ? ["提供活動日期、場地相片、尺寸、預計人數與預算。", "一起確認主題、配色、物料、數量與報價，核對所有名字及日期。", "安排製作與運送，向場地確認進場時段、固定限制及卸貨位置。", "按確認方案完成安裝，並預先約定活動後的撤場與物料歸還安排。"]
    : ["Share the date, venue photographs, dimensions, guest count and budget.", "Agree on the theme, palette, materials, quantities and quote. Check names and dates.", "Coordinate production and delivery. Confirm venue access, fixing restrictions and unloading.", "Complete the agreed setup and arrange removal and returnable items in advance."];
  return (
    <section aria-labelledby="service-planning-title" className="bg-[#173f5f] px-5 py-12 text-white sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        <h2 id="service-planning-title" className="scroll-mt-24 text-3xl font-black">{zh ? "準備好下一步？" : "Ready for the next step?"}</h2>
        <p className="mt-4 max-w-2xl leading-7 text-white/80">{zh ? "由查詢到現場佈置，需要的資料都在這裡。" : "Everything to prepare, from your first enquiry to the finished setup."}</p>
        <div className="mt-9 grid gap-x-12 gap-y-9 md:grid-cols-2">
          <section className="border-t border-white/20 pt-6">
            <h3 className="mb-5 text-xl font-bold text-[#f4c95d]">{zh ? "門市與聯絡" : "Stores & contact"}</h3>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mb-5 inline-block text-sm underline underline-offset-4 hover:text-[#f4c95d]">WhatsApp: +{CONTACT_WHATSAPP.slice(0, 3)} {CONTACT_WHATSAPP.slice(3, 7)} {CONTACT_WHATSAPP.slice(7)}</a>
            <ul className="space-y-4 text-sm leading-7">{SHOP_LOCATIONS.map(store => <li key={store.name}><p className="font-bold">{store.address}</p><p className="text-white/75">{store.openingHours}</p></li>)}</ul>
            <p className="mt-5 text-sm leading-7 text-white/75">{zh ? "出發前請先確認假期營業時間、指定款式庫存及自取安排。" : "Confirm holiday hours, specific stock and collection arrangements before visiting."}</p>
          </section>
          <section className="border-t border-white/20 pt-6">
            <h3 className="mb-5 text-xl font-bold text-[#f4c95d]">{zh ? "預約與佈置流程" : "Booking & setup"}</h3>
            <ol className="list-decimal space-y-4 pl-5 text-sm leading-7 text-white/85">{steps.map(step => <li key={step} className="pl-2">{step}</li>)}</ol>
            <p className="mt-5 text-sm leading-7 text-white/75">{zh ? "檔期、付款、修改及改期條件，請在確認方案時與團隊逐項核對。" : "Confirm availability, payment, revisions and rescheduling terms with the team when agreeing the plan."}</p>
          </section>
          <section className="border-t border-white/20 pt-6">
            <h3 className="mb-4 text-xl font-bold text-[#f4c95d]">{zh ? "佈置靈感" : "Styling inspiration"}</h3>
            <p className="text-sm leading-7 text-white/85">{zh ? "先從本頁上方的圖像與影片整理喜歡的配色、背景比例和細節。挑選兩至三種主色，配合場地牆身、燈光及蛋糕桌；參考畫面需按實際尺寸與進場條件調整。" : "Use the images and films above to identify colours, backdrop proportions and details you like. Start with two or three colours that suit the walls, lighting and cake table, then adapt the references to your venue dimensions and access."}</p>
          </section>
          <section className="border-t border-white/20 pt-6">
            <h3 className="mb-4 text-xl font-bold text-[#f4c95d]">{zh ? "派對籌備重點" : "Party planning essentials"}</h3>
            <ul className="list-disc space-y-3 pl-5 text-sm leading-7 text-white/85">{(zh ? ["量度可用闊度、高度、深度與門口尺寸，保留賓客及上菜通道。", "先安排蛋糕桌與合照位置，再分配其餘裝飾，避免遮擋主角或重要文字。", "協調攝影、餐飲及其他供應商的到場時間，指定一位當天聯絡人。"] : ["Measure width, height, depth and doorway access. Leave guest and service routes clear.", "Position the cake table and photo area before adding decorations, keeping people and important wording visible.", "Coordinate photography, catering and other suppliers, and nominate a contact for the day."]).map(t => <li key={t}>{t}</li>)}</ul>
          </section>
          <section className="border-t border-white/20 pt-6 md:col-span-2">
            <h3 className="mb-5 text-xl font-bold text-[#f4c95d]">{zh ? "服務範圍" : "Our services"}</h3>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{services.map(service => <div key={service.slug}><h4 className="font-bold">{service[lang].title}</h4><p className="mt-2 text-sm leading-7 text-white/75">{service[lang].headline}</p></div>)}</div>
          </section>
        </div>
      </div>
    </section>
  );
}
