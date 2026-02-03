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
      products: string;
      cart: string;
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
        className="md:hidden p-2 text-gray-700 hover:text-blue-600"
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
          <div className="absolute top-0 right-0 bottom-0 w-64 bg-white shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
              <span className="font-semibold text-gray-900">Menu</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 active:bg-gray-100 rounded-lg"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-4 space-y-2 bg-white">
              <Link
                href={`${baseUrl}/`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors active:bg-blue-100"
              >
                {dict.navigation.home}
              </Link>
              <Link
                href={`${baseUrl}/products`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors active:bg-blue-100"
              >
                {dict.navigation.products}
              </Link>
              <Link
                href={`${baseUrl}/about`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors active:bg-blue-100"
              >
                {dict.navigation.about}
              </Link>
              <Link
                href={`${baseUrl}/blog`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors active:bg-blue-100"
              >
                {dict.navigation.blog}
              </Link>
              <Link
                href={`${baseUrl}/cart`}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-900 hover:bg-blue-50 hover:text-blue-600 rounded-lg font-medium transition-colors active:bg-blue-100"
              >
                {dict.navigation.cart}
              </Link>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
