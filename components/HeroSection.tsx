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
    <section className="relative overflow-hidden bg-[#f7f2e9] text-[#17212b]">
      <div className="absolute -left-24 top-16 h-56 w-56 rounded-full bg-[#f4c95d]/30 blur-3xl" aria-hidden="true" />
      <div className="absolute right-0 top-0 h-72 w-72 translate-x-1/3 rounded-full bg-[#ef6f61]/20 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16 lg:px-10 lg:py-24">
        <div className="fd-reveal max-w-xl">
          <p className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.28em] text-[#ef6f61]">
            <span className="h-px w-8 bg-[#ef6f61]" />
            Party goods for big feelings
          </p>
          <h1 className="text-balance text-5xl font-black leading-[0.98] tracking-[-0.055em] text-[#173f5f] sm:text-6xl lg:text-7xl">
            {dict.home.hero.title}
          </h1>
          <p className="mt-6 max-w-lg text-xl font-semibold leading-snug text-[#ef6f61] sm:text-2xl">
            {dict.home.hero.subtitle}
          </p>
          <p className="mt-5 max-w-lg text-base leading-7 text-[#66717b] sm:text-lg">
            {dict.home.hero.description}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`${baseUrl}/#services`}
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#173f5f] px-7 py-4 text-sm font-bold text-white shadow-[0_12px_24px_rgba(23,63,95,0.18)] transition hover:-translate-y-0.5 hover:bg-[#0f2f49] active:translate-y-0"
            >
              {dict.home.hero.cta}
              <span aria-hidden="true" className="text-lg leading-none">↗</span>
            </Link>
            <Link
              href={`${baseUrl}/about`}
              className="inline-flex items-center justify-center rounded-full border border-[#173f5f]/25 bg-white/50 px-7 py-4 text-sm font-bold text-[#173f5f] transition hover:-translate-y-0.5 hover:border-[#173f5f] hover:bg-white active:translate-y-0"
            >
              {dict.home.hero.contactUs}
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-5 border-t border-[#173f5f]/15 pt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#66717b]">
            <span>Celebrate often</span>
            <span className="h-1 w-1 rounded-full bg-[#ef6f61]" />
            <span>Make it yours</span>
          </div>
        </div>

        <div className="fd-reveal fd-reveal-delay relative mx-auto w-full max-w-xl pb-8 lg:pb-4">
          <div className="absolute -right-2 top-5 z-10 flex h-24 w-24 rotate-12 items-center justify-center rounded-full bg-[#f4c95d] p-4 text-center text-xs font-black uppercase leading-tight tracking-[0.12em] text-[#173f5f] shadow-lg sm:-right-5 sm:h-28 sm:w-28">
            Party starts here
          </div>
          <div className="relative aspect-[0.92] rotate-[-2deg] overflow-hidden rounded-[2.5rem] border-[10px] border-white bg-[#dbe7e9] shadow-[0_24px_50px_rgba(23,63,95,0.18)] sm:rounded-[3rem] sm:border-[14px]">
            <Image
              src="/hero1.jpg"
              alt="BoboParty celebration supplies"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#173f5f]/45 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-white sm:bottom-7 sm:left-7 sm:right-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/75">BoboParty</p>
                <p className="mt-1 text-2xl font-black tracking-tight sm:text-3xl">Make a moment of it.</p>
              </div>
              <span className="mb-1 text-3xl" aria-hidden="true">✦</span>
            </div>
          </div>
          <div className="absolute -bottom-1 -left-2 rounded-2xl bg-white px-4 py-3 shadow-[0_12px_30px_rgba(23,63,95,0.12)] sm:-left-7 sm:px-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#66717b]">Good things</p>
            <p className="mt-1 text-sm font-black text-[#173f5f]">come in bright colors</p>
          </div>
        </div>
      </div>
    </section>
  )
}
