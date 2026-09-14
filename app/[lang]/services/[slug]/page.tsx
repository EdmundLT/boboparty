import { notFound, permanentRedirect } from "next/navigation";
import ServicePlanningGuide from "@/components/ServicePlanningGuide";
import services from "@/data/services.json";
import type { Locale } from "@/i18n.config";
import { absoluteUrl, localPath, pageMetadata, SITE_URL } from "@/lib/seo";
import PageIntro from "@/components/PageIntro";
import ServiceCards from "@/components/ServiceCards";
import ServiceMediaGallery from "@/components/ServiceMediaGallery";
import EnquiryCTA from "@/components/EnquiryCTA";
type Props = { params: Promise<{ lang: Locale; slug: string }> };
export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { lang, slug } = await params;
  if (slug === "weddings-proposals") permanentRedirect(localPath(lang, "/services/weddings"));
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  return pageMetadata(
    lang,
    `/services/${slug}`,
    service[lang].title,
    service[lang].description,
  );
}
export default async function ServicePage({ params }: Props) {
  const { lang, slug } = await params;
  if (slug === "weddings-proposals") permanentRedirect(localPath(lang, "/services/weddings"));
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();
  const c = service[lang];
  const zh = lang === "zh-TW";
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: c.title,
        description: c.description,
        url: absoluteUrl(lang, `/services/${slug}`),
        areaServed: { "@type": "Place", name: "Hong Kong" },
        provider: { "@type": "Organization", name: "BoboParty", url: SITE_URL },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: zh ? "首頁" : "Home",
            item: absoluteUrl(lang),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: zh ? "派對服務" : "Services",
            item: absoluteUrl(lang, "/services"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: c.title,
            item: absoluteUrl(lang, `/services/${slug}`),
          },
        ],
      },
    ],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <PageIntro
        lang={lang}
        eyebrow="BoboParty / Hong Kong"
        title={c.title}
        description={c.description}
      />
      <ServiceMediaGallery slug={slug} lang={lang} title={c.title} />
      <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
        <article>
          <p className="mb-10 text-3xl font-bold leading-relaxed text-[#a84135]">
            {c.headline}
          </p>
          {c.sections.map((section, i) => (
            <section
              key={section.title}
              className="mb-10 border-t border-[#173f5f]/15 pt-7"
            >
              <p className="mb-3 text-xs font-bold text-[#a84135]">0{i + 1}</p>
              <h2 className="text-2xl font-black text-[#173f5f]">
                {section.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[#66717b]">
                {section.text}
              </p>
            </section>
          ))}
          <section className="rounded-3xl bg-[#e7efee] p-6 sm:p-8">
            <h2 className="mb-5 text-2xl font-black text-[#173f5f]">
              {zh ? "常見問題" : "Frequently asked questions"}
            </h2>
            {c.faqs.map((f) => (
              <details
                key={f.question}
                className="border-t border-[#173f5f]/15 py-5"
              >
                <summary className="cursor-pointer font-bold text-[#173f5f]">
                  {f.question}
                </summary>
                <p className="mt-3 leading-7 text-[#66717b]">{f.answer}</p>
              </details>
            ))}
          </section>
        </article>

      </div>
      <ServicePlanningGuide lang={lang} />
      <EnquiryCTA lang={lang} planningHref="#service-planning-title" />
      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <h2 className="mb-8 text-3xl font-black text-[#173f5f]">
          {zh ? "更多派對方向" : "More ways to celebrate"}
        </h2>
        <ServiceCards lang={lang} exclude={slug} />
      </section>
    </>
  );
}
