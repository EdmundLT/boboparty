import Link from 'next/link'
import Image from 'next/image'

type HeroSectionProps = {
  dict: {
    home: {
      hero: {
        title: string
        subtitle: string
        description: string
        cta: string
        contactUs: string
      }
    }
  }
  baseUrl: string
}

export default function HeroSection({ dict, baseUrl }: HeroSectionProps) {
  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/hero1.jpg"
          alt="BoboParty Hero"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/70 via-blue-700/70 to-purple-700/70"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            {dict.home.hero.title}
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl font-medium mb-4 text-blue-50">
            {dict.home.hero.subtitle}
          </p>

          <p className="text-base sm:text-lg lg:text-xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {dict.home.hero.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`${baseUrl}/products`}
              className="inline-flex items-center justify-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-base hover:bg-blue-50 active:scale-95 transition-all duration-150 shadow-xl shadow-black/10"
            >
              {dict.home.hero.cta}
            </Link>
            <Link
              href={`${baseUrl}/about`}
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-base hover:bg-white/20 active:scale-95 transition-all duration-150"
            >
              {dict.home.hero.contactUs}
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 sm:h-16 fill-gray-50" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  )
}
