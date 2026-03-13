"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowRight, Building2, MessageSquare } from "lucide-react"

type InquiryType = "aliado" | "colegio" | "general" | ""

export default function ContactoPage() {
  const [inquiryType, setInquiryType] = useState<InquiryType>("")
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({ name: "", org: "", email: "", message: "" })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ inquiryType, ...form }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.message || "Hubo un error. Intenta de nuevo.")
      } else {
        setSubmitted(true)
      }
    } catch {
      setError("No se pudo enviar el mensaje. Intenta de nuevo.")
    } finally {
      setSending(false)
    }
  }

  const inputClass = "w-full bg-[#0a1f3d] border border-[#4A5EE7]/20 focus:border-[#4A5EE7]/60 rounded-lg px-4 py-3 text-white placeholder-[#BFC9DB]/40 outline-none transition-colors text-sm"

  return (
    <div className="min-h-screen bg-[#00162D] text-white">
      <Header />

      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-[45vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 hero-glow" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00162D] to-transparent" />
        <div className="relative z-10 container mx-auto px-6 lg:px-12 pb-20 pt-40">
          <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">
            AlegrIA Hackatón
          </p>
          <h1
            className="font-bold leading-none mb-6"
            style={{
              fontFamily: "var(--font-montserrat)",
              fontSize: "clamp(2.5rem, 7vw, 5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            Hablemos
          </h1>
          <p className="text-[#BFC9DB] text-xl max-w-lg leading-relaxed">
            ¿Quieres apoyar AlegrIA, llevar los talleres a tu colegio, o tienes alguna pregunta? Escríbenos.
          </p>
        </div>
      </section>

      {/* ─── CONTACT FORM ────────────────────────────────────── */}
      <section className="py-24 container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">

          {/* Inquiry type selector */}
          <p className="text-[#BFC9DB] text-sm font-semibold uppercase tracking-widest mb-6">¿En qué podemos ayudarte?</p>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {[
              { key: "aliado" as InquiryType, icon: <Building2 size={20} />, label: "Ser aliado", sub: "Patrocinar AlegrIA" },
              { key: "colegio" as InquiryType, icon: <ArrowRight size={20} />, label: "Llevar AlegrIA a mi colegio", sub: "Talleres y workshops" },
              { key: "general" as InquiryType, icon: <MessageSquare size={20} />, label: "Consulta general", sub: "Cualquier otra pregunta" },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setInquiryType(opt.key)}
                className={`rounded-xl p-5 text-left border transition-all duration-200 ${
                  inquiryType === opt.key
                    ? "border-[#4A5EE7] bg-[#4A5EE7]/10"
                    : "border-[#4A5EE7]/20 hover:border-[#4A5EE7]/50 bg-[#0a1f3d]/40"
                }`}
              >
                <div className={`mb-3 ${inquiryType === opt.key ? "text-[#4A5EE7]" : "text-[#BFC9DB]"}`}>{opt.icon}</div>
                <p className="font-semibold text-white text-sm" style={{ fontFamily: "var(--font-montserrat)" }}>{opt.label}</p>
                <p className="text-[#BFC9DB] text-xs mt-0.5">{opt.sub}</p>
              </button>
            ))}
          </div>

          {/* Form */}
          {submitted ? (
            <div className="border border-[#4A5EE7]/30 rounded-2xl p-12 text-center">
              <p className="text-[#4A5EE7] font-semibold tracking-widest uppercase text-sm mb-4">Listo</p>
              <h2 className="font-bold text-white text-2xl mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>
                Mensaje enviado
              </h2>
              <p className="text-[#BFC9DB]">Te responderemos pronto a <span className="text-white">{form.email}</span>.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[#BFC9DB] text-xs font-semibold uppercase tracking-wider mb-2">Nombre</label>
                  <input
                    required
                    type="text"
                    placeholder="Tu nombre"
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-[#BFC9DB] text-xs font-semibold uppercase tracking-wider mb-2">
                    {inquiryType === "aliado" ? "Empresa" : inquiryType === "colegio" ? "Colegio" : "Organización"}
                  </label>
                  <input
                    type="text"
                    placeholder={inquiryType === "aliado" ? "Nombre de tu empresa" : inquiryType === "colegio" ? "Nombre del colegio" : "Opcional"}
                    className={inputClass}
                    value={form.org}
                    onChange={(e) => setForm({ ...form, org: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <label className="block text-[#BFC9DB] text-xs font-semibold uppercase tracking-wider mb-2">Email</label>
                <input
                  required
                  type="email"
                  placeholder="tu@email.com"
                  className={inputClass}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[#BFC9DB] text-xs font-semibold uppercase tracking-wider mb-2">Mensaje</label>
                <textarea
                  required
                  rows={5}
                  placeholder={
                    inquiryType === "aliado"
                      ? "Cuéntanos sobre tu empresa y cómo te gustaría apoyar AlegrIA..."
                      : inquiryType === "colegio"
                      ? "Cuéntanos sobre tu colegio, el grado y cuándo te gustaría tener el taller..."
                      : "¿En qué podemos ayudarte?"
                  }
                  className={inputClass + " resize-none"}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>
              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center gap-2 bg-[#4A5EE7] hover:bg-[#4A5EE7]/80 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300"
              >
                {sending ? "Enviando..." : <><span>Enviar mensaje</span> <ArrowRight size={18} /></>}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
