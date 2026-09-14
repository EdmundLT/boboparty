"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n.config";
import services from "@/data/services.json";

export default function ServiceDropdown({ lang, mobile = false, onNavigate }: { lang: Locale; mobile?: boolean; onNavigate?: () => void }) {
  const disclosure = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  const base = lang === "en" ? "/en" : "";
  useEffect(() => { if (disclosure.current) disclosure.current.open = false; }, [pathname]);
  useEffect(() => {
    const outside = (event: PointerEvent) => {
      if (disclosure.current && !disclosure.current.contains(event.target as Node)) disclosure.current.open = false;
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && disclosure.current?.open) {
        disclosure.current.open = false;
        disclosure.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);
  const close = () => { if (disclosure.current) disclosure.current.open = false; onNavigate?.(); };
  return (
    <details ref={disclosure} className="group relative" onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node)) event.currentTarget.open = false; }}>
      <summary className={`flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-[#173f5f] [&::-webkit-details-marker]:hidden ${mobile ? "border-b border-[#173f5f]/15 py-4" : "rounded-full px-3 py-2 text-sm hover:bg-[#f4c95d]/30"}`}>
        {lang === "en" ? "Services" : "派對服務"}
        <svg aria-hidden="true" viewBox="0 0 20 20" className="h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="m5 7 5 5 5-5" /></svg>
      </summary>
      <div className={mobile ? "space-y-1 border-b border-[#173f5f]/15 py-3 pl-3" : "absolute left-0 top-full z-50 w-80 rounded-2xl border border-[#173f5f]/15 bg-[#f7f2e9] p-3 shadow-xl"}>
        {services.map(service => <Link key={service.slug} href={`${base}/services/${service.slug}`} onClick={close} aria-current={pathname.endsWith(`/services/${service.slug}`) ? "page" : undefined} className="block rounded-xl px-4 py-3 text-sm text-[#173f5f] hover:bg-[#e7efee] focus-visible:bg-[#e7efee] aria-[current=page]:font-bold">{service[lang].title}</Link>)}
        <Link href={`${base}/services`} onClick={close} className="mt-2 block border-t border-[#173f5f]/15 px-4 py-3 text-sm font-bold text-[#a84135]">{lang === "en" ? "All services" : "全部派對服務"}</Link>
      </div>
    </details>
  );
}
