"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

const sponsors = [
  {
    name: "Slash",
    logo: "/images/slash-logo.png",
    tier: "Gold",
    url: "https://www.slash.com",
    descKey: "premios.sponsors.slash_desc",
  },
  {
    name: "Yummy",
    logo: "/images/yummy-logo.png",
    tier: "Gold",
    url: "https://www.yummysuperapp.com/",
    descKey: "premios.sponsors.yummy_desc",
  },
  {
    name: "Ribbit Capital",
    logo: "/images/Ribbit_Capital logo.png",
    tier: "Gold",
    url: "https://www.ribbitcap.com/",
    descKey: "premios.sponsors.ribbit_desc",
  },
  {
    name: "Lovable",
    logo: "/images/lovable-logo.png",
    tier: "Gold",
    url: "https://lovable.dev/",
    descKey: "premios.sponsors.lovable_desc",
  },
  {
    name: "4Geeks Academy",
    logo: "/images/4GeeksAcademy-logo.png",
    tier: "Gold",
    url: "https://4geeksacademy.com/es/inicio",
    descKey: "premios.sponsors.4geeks_desc",
  },
  {
    name: "Cashea",
    logo: "/images/cashea-logo.jpg",
    tier: "Silver",
    url: "https://www.cashea.app/",
    descKey: "premios.sponsors.cashea_desc",
  },
  {
    name: "Intezia",
    logo: "/images/INTEZIA_logo.png",
    tier: "Silver",
    url: "https://intezia.com/",
    descKey: "premios.sponsors.intezia_desc",
  },
  {
    name: "Startup Venezuela Summit",
    logo: "/images/startup-venezuela-summit-logo.png",
    tier: "Silver",
    url: "https://www.startupvenezuelasummit.com/",
    descKey: "premios.sponsors.svs_desc",
  },
]

const prizeColors = [
  { color: "#FFD700", borderColor: "border-[#FFD700]/30", bgColor: "from-[#FFD700]/5" },
  { color: "#C0C0C0", borderColor: "border-[#C0C0C0]/20", bgColor: "from-[#C0C0C0]/5" },
  { color: "#CD7F32", borderColor: "border-[#CD7F32]/20", bgColor: "from-[#CD7F32]/5" },
]

export default function PremiosPage() {
  const { t } = useLanguage()

  const mainPrizes = [
    {
      place: t("premios.prizes.place_1"),
      badge: t("premios.prizes.badge_gold"),
      amount: "$25,000",
      description: t("premios.prizes.description"),
      bonus: t("premios.prizes.bonus_1"),
      ...prizeColors[0],
      size: "large",
    },
    {
      place: t("premios.prizes.place_2"),
      badge: t("premios.prizes.badge_silver"),
      amount: "$5,000",
      description: t("premios.prizes.description"),
      bonus: t("premios.prizes.bonus_2"),
      ...prizeColors[1],
      size: "medium",
    },
    {
      place: t("premios.prizes.place_3"),
      badge: t("premios.prizes.badge_bronze"),
      amount: "$2,500",
      description: t("premios.prizes.description"),
      bonus: t("premios.prizes.bonus_3"),
      ...prizeColors[2],
      size: "medium",
    },
  ]

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      <Header />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute inset-0" style={{background: 'radial-gradient(ellipse at 75% 30%, rgba(255, 215, 0, 0.1) 0%, transparent 50%)'}} />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00162D] to-transparent" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20 pt-40">
          <p className="text-[#FFD700] font-semibold tracking-widest uppercase text-sm mb-4">
            {t("premios.hero.eyebrow")}
          </p>
          <h1
            className="font-bold leading-none mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(2.5rem, 8vw, 6rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {t("premios.hero.title_prefix")}{" "}
            <span className="text-[#FFD700]">$75,000</span>
            <br />
            {t("premios.hero.title_suffix")}
          </h1>
          <p className="text-[#BFC9DB] text-lg md:text-xl max-w-xl leading-relaxed">
            {t("premios.hero.subtitle")}
          </p>
        </div>
      </section>

      {/* ─── PHOTO STRIP ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 h-56 sm:h-64 md:h-80">
        <div className="relative overflow-hidden">
          <Image src="/images/1Winners.JPG" alt="Ganadores AlegrIA" fill className="object-cover" sizes="(max-width: 640px) 100vw, 33vw" quality={80} priority />
        </div>
        <div className="relative overflow-hidden hidden sm:block">
          <Image src="/images/1_medalspic.JPG" alt="Medallas AlegrIA" fill className="object-cover" sizes="33vw" quality={80} priority />
        </div>
        <div className="relative overflow-hidden hidden sm:block">
          <Image src="/images/1-paneljudging.JPG" alt="Panel de jueces AlegrIA" fill className="object-cover" sizes="33vw" quality={80} priority />
        </div>
      </div>

      {/* ─── PRIZE BREAKDOWN ─────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("premios.prizes.eyebrow")}</p>
        <h2
          className="font-bold text-white mb-16"
          style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
        >
          {t("premios.prizes.title")}
        </h2>

        {/* 1st Place — Full row */}
        <div
          className={`mb-8 rounded-2xl border ${mainPrizes[0].borderColor} bg-gradient-to-r ${mainPrizes[0].bgColor} to-transparent p-10 md:p-14`}
        >
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex-shrink-0">
              <span className="inline-block text-xs font-bold px-3 py-1 rounded-full bg-[#FFD700] text-[#00162D] uppercase tracking-wider mb-4">
                {mainPrizes[0].badge}
              </span>
              <div
                className="font-bold"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(3rem, 8vw, 6rem)",
                  color: mainPrizes[0].color,
                  lineHeight: 1,
                }}
              >
                {mainPrizes[0].amount}
              </div>
            </div>
            <div className="flex-1 md:border-l md:border-[#FFD700]/20 md:pl-10">
              <h3 className="font-bold text-white text-2xl mb-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                {mainPrizes[0].place}
              </h3>
              <p className="text-[#BFC9DB] text-lg mb-3">{mainPrizes[0].description}</p>
              <p className="text-[#FFD700]/80 text-sm font-medium">{mainPrizes[0].bonus}</p>
            </div>
          </div>
        </div>

        {/* 2nd & 3rd side by side */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {mainPrizes.slice(1).map((prize, i) => (
            <div
              key={i}
              className={`rounded-2xl border ${prize.borderColor} bg-gradient-to-br ${prize.bgColor} to-transparent p-8`}
            >
              <span
                className="inline-block text-xs font-bold px-3 py-1 rounded-full border text-[#BFC9DB] uppercase tracking-wider mb-4"
                style={{ borderColor: prize.color + "40" }}
              >
                {prize.badge}
              </span>
              <div
                className="font-bold mb-2"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  color: prize.color,
                  lineHeight: 1,
                }}
              >
                {prize.amount}
              </div>
              <h3 className="font-bold text-white text-lg mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>
                {prize.place}
              </h3>
              <p className="text-[#BFC9DB] text-sm mb-3">{prize.description}</p>
              <p className="text-sm font-medium" style={{ color: prize.color + "CC" }}>{prize.bonus}</p>
            </div>
          ))}
        </div>

        {/* All teams + Yummy */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-[#4A5EE7]/20 bg-[#0a1f3d]/50 p-8">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border border-[#4A5EE7]/40 text-[#4A5EE7] uppercase tracking-wider mb-4">
              {t("premios.prizes.all_teams_badge")}
            </span>
            <div
              className="font-bold text-white mb-2"
              style={{ fontFamily: "var(--font-montserrat)", fontSize: "1.5rem" }}
            >
              {t("premios.prizes.all_teams_label")}
            </div>
            <p className="text-[#BFC9DB] text-sm mb-2">{t("premios.prizes.all_teams_prize")}</p>
            <p className="text-[#4A5EE7] text-sm font-medium">{t("premios.prizes.all_teams_bonus")}</p>
          </div>
          <div className="rounded-2xl border border-[#FF6B35]/20 bg-gradient-to-br from-[#FF6B35]/5 to-transparent p-8">
            <span className="inline-block text-xs font-bold px-3 py-1 rounded-full border border-[#FF6B35]/40 text-[#FF6B35] uppercase tracking-wider mb-4">
              {t("premios.prizes.yummy_badge")}
            </span>
            <div
              className="font-bold text-[#FF6B35] mb-2"
              style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
            >
              $20,000
            </div>
            <h3 className="font-bold text-white text-lg mb-1" style={{ fontFamily: "var(--font-montserrat)" }}>
              {t("premios.prizes.yummy_title")}
            </h3>
            <p className="text-[#BFC9DB] text-sm">
              {t("premios.prizes.yummy_description")}
            </p>
          </div>
        </div>
      </section>

      {/* ─── SPONSORS SHOWCASE ───────────────────────────────── */}
      <section id="aliados" className="py-24 bg-[#04112a]">
        <div className="container mx-auto px-6 lg:px-12">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">{t("premios.sponsors.eyebrow")}</p>
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
          >
            {t("premios.sponsors.title")}
          </h2>
          <p className="text-[#BFC9DB] text-lg mb-16 max-w-2xl">
            {t("premios.sponsors.subtitle")}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {sponsors.map((sponsor, i) => (
              <a
                key={i}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#4A5EE7]/20 hover:border-[#4A5EE7]/50 rounded-xl p-6 transition-all duration-300 group flex flex-col"
              >
                <div className="h-12 mb-4 flex items-center">
                  <div className="relative h-9 w-32">
                    <Image src={sponsor.logo} alt={sponsor.name} fill className="object-contain object-left" sizes="128px" />
                  </div>
                </div>
                <p className="text-[#BFC9DB] text-xs leading-relaxed flex-1">{t(sponsor.descKey)}</p>
                <span className="inline-flex items-center gap-1 text-[#4A5EE7] text-xs font-medium mt-3 group-hover:underline">
                  {t("premios.sponsors.visit")} <ExternalLink size={12} />
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SPONSOR CTA ─────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="border border-[#4A5EE7]/20 rounded-2xl p-10 md:p-16 text-center">
          <h2
            className="font-bold text-white mb-4"
            style={{ fontFamily: "var(--font-montserrat)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", letterSpacing: "-0.02em" }}
          >
            {t("premios.cta.title")}
          </h2>
          <p className="text-[#BFC9DB] text-lg mb-8 max-w-xl mx-auto">
            {t("premios.cta.subtitle")}
          </p>
          <Link
            href="/contacto"
            className="inline-flex items-center gap-2 bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
          >
            {t("premios.cta.btn")} <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
