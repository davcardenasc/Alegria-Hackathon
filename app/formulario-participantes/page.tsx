import { Metadata } from "next"
import TallyForm from "./tally-form"

export const metadata: Metadata = {
  title: "Formulario de Aplicación - Estudiantes | AlegrIA Hackathon",
  description: "Aplica ahora al AlegrIA Hackathon. Compite por $50,000+ en premios con tu equipo de hasta 4 estudiantes venezolanos.",
  alternates: {
    canonical: 'https://alegriahackaton.com/formulario-participantes',
  },
}

export default function FormularioParticipantes() {
  return <TallyForm />
}