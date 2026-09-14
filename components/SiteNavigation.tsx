"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n.config";
import ServiceDropdown from "@/components/ServiceDropdown";
export default function SiteNavigation({ lang }: { lang: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const zh = lang === "zh-TW";
  const base = zh ? "" : "/en";
  const links = [
    ["/services", zh ? "派對服務" : "Services"],
    ["/gallery", zh ? "佈置靈感" : "Inspiration"],
    ["/planning", zh ? "預約流程" : "Planning"],
    ["/blog", zh ? "派對資訊" : "Journal"],
    ["/about", zh ? "關於我們" : "About"],
    ["/contact", zh ? "門市聯絡" : "Contact"],
  ];
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const escape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <>
      <nav
        aria-label={zh ? "主要導覽" : "Main navigation"}
        className="hidden items-center gap-1 xl:flex"
      >
        {links.map(([path, label]) => path === "/services" ? <ServiceDropdown key={path} lang={lang} /> : (
          <Link
            key={path}
            href={`${base}${path}`}
            aria-current={pathname === `${base}${path}` ? "page" : undefined}
            className="rounded-full px-3 py-2 text-sm font-bold text-[#173f5f] hover:bg-[#f4c95d]/30 aria-[current=page]:bg-[#e7efee]"
          >
            {label}
          </Link>
        ))}
      </nav>
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-site-menu"
        onClick={() => setOpen(!open)}
        className="shrink-0 whitespace-nowrap rounded-full border border-[#173f5f]/20 px-3 py-2 text-sm font-bold text-[#173f5f] xl:hidden"
      >
        {open ? (zh ? "關閉 ✕" : "Close ✕") : zh ? "選單 ☰" : "Menu ☰"}
      </button>
      {open && (
        <nav
          id="mobile-site-menu"
          aria-label={zh ? "手機導覽" : "Mobile navigation"}
          className="fixed inset-x-0 bottom-0 top-[4.5rem] z-50 overflow-y-auto border-t border-[#173f5f]/15 bg-[#f7f2e9] p-6 xl:hidden"
        >
          <div className="mx-auto max-w-2xl">
            <Link
              href={`${base}/`}
              onClick={() => setOpen(false)}
              className="block border-b border-[#173f5f]/15 py-4 font-bold text-[#173f5f]"
            >
              {zh ? "首頁" : "Home"}
            </Link>
            {links.map(([path, label]) => path === "/services" ? (
              <ServiceDropdown key={path} lang={lang} mobile onNavigate={() => setOpen(false)} />
            ) : (
              <Link key={path} href={`${base}${path}`} onClick={() => setOpen(false)} className="block border-b border-[#173f5f]/15 py-4 font-bold text-[#173f5f]">{label} →</Link>
            ))}
          </div>
        </nav>
      )}
    </>
  );
}
