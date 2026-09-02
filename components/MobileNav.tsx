"use client";

import { useState } from "react";
import Link from "next/link";

type MobileNavProps = {
  baseUrl: string;
  dict: {
    navigation: {
      home: string;
      about: string;
      blog: string;
      services: string;
      contact: string;
    };
  };
};

export default function MobileNav({ baseUrl, dict }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-full border border-[#173f5f]/10 bg-white/60 p-2 text-[#173f5f] hover:bg-white md:hidden"
        aria-label="Open menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {isOpen ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-0 right-0 top-0 w-72 bg-[#f7f2e9] shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#173f5f]/10 bg-[#f7f2e9] p-4">
              <span className="font-black text-[#173f5f]">Menu</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-[#66717b] hover:bg-white hover:text-[#173f5f]"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="space-y-2 bg-[#f7f2e9] p-4">
              <Link
                href={`${baseUrl}/`}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 font-semibold text-[#173f5f] transition-colors hover:bg-[#f4c95d]/30 active:bg-[#f4c95d]/50"
              >
                {dict.navigation.home}
              </Link>
              <Link
                href={`${baseUrl}/#services`}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 font-semibold text-[#173f5f] transition-colors hover:bg-[#f4c95d]/30 active:bg-[#f4c95d]/50"
              >
                {dict.navigation.services}
              </Link>
              <Link
                href={`${baseUrl}/#contact`}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 font-semibold text-[#173f5f] transition-colors hover:bg-[#f4c95d]/30 active:bg-[#f4c95d]/50"
              >
                {dict.navigation.contact}
              </Link>
              <Link
                href={`${baseUrl}/about`}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 font-semibold text-[#173f5f] transition-colors hover:bg-[#f4c95d]/30 active:bg-[#f4c95d]/50"
              >
                {dict.navigation.about}
              </Link>
              <Link
                href={`${baseUrl}/blog`}
                onClick={() => setIsOpen(false)}
                className="block rounded-xl px-4 py-3 font-semibold text-[#173f5f] transition-colors hover:bg-[#f4c95d]/30 active:bg-[#f4c95d]/50"
              >
                {dict.navigation.blog}
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
