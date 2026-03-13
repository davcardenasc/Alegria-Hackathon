"use client"

import { useScrollToHash } from "@/hooks/useScrollToHash"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { SPONSORS } from "@/lib/data"

// ─── Hero (split: text left, photo right) ─────────────────────────────────────

function Hero() {
  const { t } = useLanguage()
  return (
    <section className="relative min-h-screen bg-[#00162D] pt-20 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{background: 'radial-gradient(ellipse at 15% 60%, rgba(74, 94, 231, 0.25) 0%, transparent 55%)'}} />
      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-5rem)] relative z-10">
        <div className="flex flex-col justify-center px-8 md:px-16 lg:px-20 xl:px-28 py-16 lg:py-0">
          <Image
            src="/images/New Alegria Logo.png"
            alt="AlegrIA"
            width={180}
            height={60}
            className="mb-10 w-[140px] md:w-[180px]"
            priority
          />
          <h1
            className="font-bold text-white mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            {t("home.hero.title")}
          </h1>
          <p className="text-[#BFC9DB] text-lg md:text-xl leading-relaxed mb-10 max-w-lg">
            {t("home.hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/resultados-2026"
              className="inline-flex items-center justify-center gap-2 bg-[#4A5EE7] hover:bg-[#3a4ed7] text-white px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 text-sm"
            >
              {t("home.hero.cta_results")} <ArrowRight size={16} />
            </Link>
            <Link
              href="/hackaton"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 text-white px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 text-sm"
            >
              {t("home.hero.cta_next")}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[300px] lg:min-h-0">
          <Image
            src="/images/1Team_Wide_Shot1.JPG"
            alt="Estudiantes en AlegrIA"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#00162D] via-transparent to-transparent lg:via-[#00162D]/20 lg:to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}

// ─── Stats strip (accent blue to stand out) ───────────────────────────────────

function StatsStrip() {
  const { t } = useLanguage()
  const stats = [
    { number: "26", label: t("home.stats.teams") },
    { number: "48h", label: t("home.stats.nonstop") },
    { number: "$75K+", label: t("home.stats.prizes") },
    { number: "26", label: t("home.stats.startups") },
  ]

  return (
    <div className="bg-[#4A5EE7]">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/20">
          {stats.map((stat, i) => (
            <div key={i} className="px-6 md:px-10 py-8 md:py-10 text-center">
              <div
                className="font-bold text-white"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <div className="text-white/60 text-sm mt-2 tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── About AlegrIA (merged editorial + explainer) ─────────────────────────────

function AboutAlegrIA() {
  const { t } = useLanguage()
  return (
    <section className="bg-[#F7F9FF]">
      <div className="container mx-auto px-6 lg:px-12 py-24 md:py-32">
        {/* Big editorial headline */}
        <p
          className="font-bold leading-[1.15] tracking-tight text-[#00162D] mb-20 max-w-4xl"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(1.75rem, 4.5vw, 3.25rem)",
          }}
        >
          {t("home.about.headline")}
        </p>

        {/* Photo + explanation below */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="/images/9san-ignacio-alegria.jpg"
              alt="Estudiantes en un taller de AlegrIA"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
          <div>
            <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-xs mb-5">
              {t("home.about.how_eyebrow")}
            </p>
            <h2
              className="font-bold text-[#00162D] mb-6"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
                letterSpacing: "-0.02em",
                lineHeight: 1.15,
              }}
            >
              {t("home.about.how_title")}
            </h2>
            <p className="text-[#1a2332] text-base md:text-lg leading-relaxed mb-4">
              {t("home.about.p1")}
            </p>
            <p className="text-[#1a2332] text-base md:text-lg leading-relaxed mb-8">
              {t("home.about.p2")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/resultados-2026"
                className="inline-flex items-center gap-2 bg-[#00162D] hover:bg-[#4A5EE7] text-white px-7 py-3.5 rounded-lg font-semibold transition-all duration-300 text-sm"
              >
                {t("home.about.cta_primary")} <ArrowRight size={16} />
              </Link>
              <Link
                href="/hackaton"
                className="inline-flex items-center gap-2 text-[#4A5EE7] hover:text-[#3a4ed7] font-semibold transition-colors group text-sm"
              >
                {t("home.about.cta_secondary")}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Photo gallery (compact, edge-to-edge, no gaps) ───────────────────────────

const galleryPhotos = [
  { src: "/images/6to-1-copy.jpg", alt: "Workshop ECA 6to grado" },
  { src: "/images/7mo-1-copy.jpeg", alt: "Workshop ECA 7mo grado" },
  { src: "/images/8vo-1.jpg", alt: "Workshop ECA 8vo grado" },
  { src: "/images/8vo-3.jpg", alt: "Workshop ECA 8vo grado" },
  { src: "/images/8vo-4-copy.jpg", alt: "Workshop ECA 8vo grado" },
  { src: "/images/9san-ignacio-alegria.jpg", alt: "Workshop San Ignacio" },
  { src: "/images/9san-ignacio-alegria-2.png", alt: "Workshop San Ignacio" },
  { src: "/images/7mo-3-copy.jpg", alt: "Workshop ECA 7mo grado" },
  { src: "/images/7mo-7-copy.jpeg", alt: "Workshop ECA 7mo grado" },
  { src: "/images/7mo-8-copy.jpg", alt: "Workshop ECA 7mo grado" },
]

function PhotoGallery() {
  const { t } = useLanguage()
  return (
    <section>
      <div className="bg-[#F7F9FF]">
        <div className="container mx-auto px-6 lg:px-12 pt-20 pb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-xs mb-3">{t("home.gallery.eyebrow")}</p>
            <h2
              className="font-bold text-[#00162D]"
              style={{
                fontFamily: "var(--font-montserrat)",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {t("home.gallery.title")}
            </h2>
          </div>
          <Link
            href="/resultados-2026#galeria"
            className="inline-flex items-center gap-2 text-[#00162D]/40 hover:text-[#00162D] text-sm font-medium transition-colors group"
          >
            {t("home.gallery.cta")}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      <div
        className="grid grid-cols-4 md:grid-cols-5"
        style={{ lineHeight: 0 }}
      >
        {galleryPhotos.map((photo, i) => (
          <div
            key={i}
            className="relative overflow-hidden"
            style={{ paddingBottom: "75%" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700 absolute inset-0"
              sizes="(max-width: 768px) 25vw, 20vw"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials (navy blue) ─────────────────────────────────────────────────

function TestimonialsSection() {
  const { t } = useLanguage()

  const testimonials = [
    { quote: t("moments.testimonial1"), name: "Matias Azpurua", school: "San Ignacio" },
    { quote: t("moments.testimonial2"), name: "Jesus Rubinetti", school: "British School" },
    { quote: t("moments.testimonial3"), name: "María González", school: "Escuela Campo Alegre" },
    { quote: t("moments.testimonial4"), name: "Andrés Palacios", school: "Colegio Integral El Ávila" },
  ]

  return (
    <section className="bg-[#00162D]">
      <div className="container mx-auto px-6 lg:px-12 py-24">
        <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-xs mb-5">
          {t("home.testimonials.eyebrow")}
        </p>
        <h2
          className="font-bold text-white mb-14"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {t("home.testimonials.title")}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((item, i) => (
            <div key={i} className="border border-white/10 rounded-xl p-6 flex flex-col justify-between">
              <blockquote className="text-[#F7F9FF] leading-relaxed mb-6 text-sm md:text-base">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div>
                <p className="text-white font-semibold text-xs">{item.name}</p>
                <p className="text-white/30 text-xs">{item.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Sponsors bar (navy blue, full color logos) ───────────────────────────────

function SponsorsBar() {
  const { t } = useLanguage()
  const confirmed = SPONSORS.filter((s) => s.confirmed && s.logo)

  return (
    <section className="bg-[#00162D] py-16 border-t border-white/5">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <p className="text-white/30 text-xs uppercase tracking-widest font-semibold">{t("home.sponsors.eyebrow")}</p>
            <Link
              href="/premios#aliados"
              className="inline-flex items-center gap-2 text-white/30 hover:text-white text-xs font-medium transition-colors group"
            >
              {t("home.sponsors.cta")}
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {confirmed.map((sponsor, i) => (
              <a
                key={i}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative h-10 md:h-12"
                title={sponsor.name}
              >
                <Image
                  src={sponsor.logo!}
                  alt={sponsor.name}
                  width={110}
                  height={36}
                  className="h-10 md:h-12 w-auto object-contain"
                  sizes="110px"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Next edition teaser (white) ──────────────────────────────────────────────

function NextEdition() {
  const { t } = useLanguage()
  return (
    <section className="bg-[#00162D]">
      <div className="container mx-auto px-6 lg:px-12 py-20 md:py-28 text-center">
        <h2
          className="font-bold text-white mb-4"
          style={{
            fontFamily: "var(--font-montserrat)",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            letterSpacing: "-0.02em",
          }}
        >
          {t("home.next_edition.title")}
        </h2>
        <p className="text-[#BFC9DB] text-lg mb-10 max-w-md mx-auto">
          {t("home.next_edition.subtitle")}
        </p>
        <Link
          href="/contacto"
          className="inline-flex items-center gap-2 bg-[#4A5EE7] hover:bg-[#3a4ed7] text-white px-8 py-4 rounded-lg font-bold transition-all duration-300 text-sm"
        >
          {t("home.next_edition.cta")} <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  useScrollToHash()

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <StatsStrip />
        <AboutAlegrIA />
        <PhotoGallery />
        <TestimonialsSection />
        <SponsorsBar />
        <NextEdition />
      </main>
      <Footer />
    </div>
  )
}
