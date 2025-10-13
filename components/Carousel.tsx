'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { ShowcaseItem } from '@/types'

type CarouselProps = {
  items: ShowcaseItem[]
  dict: {
    home: {
      showcase: {
        viewDetails: string
        previous: string
        next: string
      }
    }
  }
}

export default function Carousel({ items, dict }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === items.length - 1 ? 0 : prevIndex + 1
    )
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  if (items.length === 0) return null

  const currentItem = items[currentIndex]

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Main Carousel */}
      <div className="relative h-[300px] sm:h-[400px] md:h-[500px] overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={currentItem.imageUrl}
          alt={currentItem.title}
          fill
          className="object-cover"
          priority={currentIndex === 0}
        />

        {/* Overlay with text */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6 md:p-8">
          <div className="max-w-3xl">
            {currentItem.category && (
              <span className="inline-block px-2 sm:px-3 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded-full mb-2 sm:mb-3">
                {currentItem.category}
              </span>
            )}
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1 sm:mb-2">
              {currentItem.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-200 mb-2 sm:mb-4 line-clamp-2 sm:line-clamp-3">
              {currentItem.description}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={goToPrevious}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all"
          aria-label={dict.home.showcase.previous}
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={goToNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 sm:p-3 rounded-full shadow-lg transition-all"
          aria-label={dict.home.showcase.next}
        >
          <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-4 sm:mt-6">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'w-6 sm:w-8 bg-blue-600'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
