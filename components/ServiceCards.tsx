import Link from "next/link";
import services from "@/data/services.json";
import type { Locale } from "@/i18n.config";
import { localPath } from "@/lib/seo";
export default function ServiceCards({
  lang,
  exclude,
}: {
  lang: Locale;
  exclude?: string;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {services
        .filter((s) => s.slug !== exclude)
        .map((service, index) => (
          <Link
            key={service.slug}
            href={localPath(lang, `/services/${service.slug}`)}
            className="group flex flex-col rounded-3xl border border-[#173f5f]/15 bg-white p-7 transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#173f5f]"
          >
            <span className="mb-8 text-sm font-bold text-[#a84135]">
              0{index + 1} / {lang === "en" ? "CELEBRATE" : "為每個重要時刻"}
            </span>
            <h3 className="text-2xl font-black text-[#173f5f]">
              {service[lang].title}
            </h3>
            <p className="mb-7 mt-4 flex-1 text-sm leading-7 text-[#66717b]">
              {service[lang].description}
            </p>
            <span className="border-t border-[#173f5f]/10 pt-4 text-sm font-bold text-[#173f5f]">
              {lang === "en" ? "Explore this service" : "了解服務與籌備建議"}{" "}
              <span aria-hidden="true">↗</span>
            </span>
          </Link>
        ))}
    </div>
  );
}
