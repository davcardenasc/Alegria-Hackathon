"use client"

import { Mail, Phone, Instagram } from 'lucide-react'
import Link from "next/link"
import { useLanguage } from "@/contexts/LanguageContext"

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer id="contacto" className="py-16 border-t border-[#4A5EE7]/20">
      <div className="container mx-auto px-6 sm:px-8 lg:px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-[#F7F9FF] mb-4">AlegrIA</h3>
            <p className="text-[#BFC9DB]">{t("footer.description")}</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#F7F9FF] mb-4">{t("footer.contact")}</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="text-[#4A5EE7]" size={16} />
                <span className="text-[#BFC9DB]">cursos.alegria.labs@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-[#4A5EE7]" size={16} />
                <a 
                  href={`https://wa.me/584122226901?text=${encodeURIComponent("Hola! Estoy interesado en el hackathon de AlegrIA y me gustaría obtener más información.")}`} 
                  className="text-[#BFC9DB] hover:text-[#F7F9FF] transition-colors"
                >
                  +58 412 222 6901
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Instagram className="text-[#4A5EE7]" size={16} />
                <a
                  href="https://instagram.com/alegria.labs"
                  className="text-[#BFC9DB] hover:text-[#F7F9FF] transition-colors"
                >
                  @alegria.labs
                </a>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-[#F7F9FF] mb-4">{t("footer.links")}</h4>
            <div className="space-y-2">
              <Link href="/terminos" className="block text-[#BFC9DB] hover:text-[#F7F9FF] transition-colors">
                {t("footer.terms")}
              </Link>
              <Link href="/privacidad" className="block text-[#BFC9DB] hover:text-[#F7F9FF] transition-colors">
                {t("footer.privacy")}
              </Link>
              <Link href="/codigo-conducta" className="block text-[#BFC9DB] hover:text-[#F7F9FF] transition-colors">
                {t("footer.conduct")}
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#4A5EE7]/20 pt-8 text-center">
          <p className="text-[#BFC9DB]">
            © {new Date().getFullYear()} AlegrIA. {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
