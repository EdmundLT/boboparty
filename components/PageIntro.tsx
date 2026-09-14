import Link from "next/link";
import type { Locale } from "@/i18n.config";
import { localPath } from "@/lib/seo";
export default function PageIntro({
  lang,
  eyebrow,
  title,
  description,
}: {
  lang: Locale;
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <header className="border-b border-[#173f5f]/10 bg-[#f7f2e9]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 sm:py-20">
        <nav
          aria-label={lang === "en" ? "Breadcrumb" : "麵包屑導覽"}
          className="mb-10 flex flex-wrap gap-2 text-sm text-[#66717b]"
        >
          <Link href={localPath(lang)} className="hover:underline">
            {lang === "en" ? "Home" : "首頁"}
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{title}</span>
        </nav>
        <p className="mb-5 text-xs font-bold uppercase tracking-[0.22em] text-[#a84135]">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-[#173f5f] sm:text-6xl">
          {title}
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[#66717b]">
          {description}
        </p>
      </div>
    </header>
  );
}
