"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "es" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  tArray: (key: string) => string[]
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translations object
const translations = {
  es: {
    // Header
    "nav.mission": "Misión",
    "nav.schedule": "Cronograma",
    "nav.conference": "Conferencia",
    "nav.speakers": "Speakers",
    "nav.applications": "Aplicaciones",
    "nav.prizes": "Premios",
    "nav.workshops": "Workshops",
    "nav.ambassadors": "Embajadores",
    "nav.sponsors": "Patrocinadores",
    "nav.faq": "FAQ",
    "nav.contact": "Contacto",
    "nav.apply": "Aplica ahora",
    "nav.menu": "Menú",
    "nav.student_application": "Aplicación Estudiantes",
    "nav.school_application": "Aplicación Colegios",
    "nav.project_ideas": "Posibles Ideas",
    "nav.overview": "Resumen",
    "nav.moments": "Momentos",
    "nav.results": "Resultados",

    // Hero Section
    "hero.question": "¿Tienes una idea que puede\ncambiar el mundo?",
    "hero.from_idea": "De idea…",
    "hero.to_prototype": "…a prototipo",
    "hero.to_business": "…a negocio real",
    "hero.main_title": "48 horas. Un hackathon. Tu futuro.",
    "hero.subtitle": "Compite en el primer vibe-coding hackathon de la historia de Venezuela por $15,000+ en premios y lanza tu startup",
    "hero.subtitle_first_part": "Compite en el ",
    "hero.subtitle_highlight": "primer vibe-coding hackathon",
    "hero.subtitle_last_part": " de la historia de Venezuela por $15,000+ en premios y lanza tu startup",
    "hero.cta": "Aplica ahora",
    "hero.deadline": "Fecha límite: 19 de septiembre, 2025",
    "hero.scroll_hint": "Desliza para continuar",

    // Applications Section
    "applications.title": "Aplicaciones",
    "applications.description":
      "Forma un equipo de 2 a 4 personas y aplica para vivir 48 horas de construcción, inspiración y comunidad.",
    "applications.student.title": "Soy estudiante y quiero participar",
    "applications.student.description": "Únete al hackathon con tu equipo y compite por increíbles premios",
    "applications.student.cta": "Aplicar ahora",
    "applications.school.title": "Quiero llevar AlegrIA a mi colegio",
    "applications.school.description": "Organiza un workshop de AlegrIA en tu institución educativa",
    "applications.school.cta": "Solicitar workshop",

    // Prizes Section
    "prizes.title": "Premios",
    "prizes.description": "Más de $15,000 en premios esperándote",
    "prizes.first_place": "🏆 1er lugar",
    "prizes.second_place": "🥈 2do lugar",
    "prizes.third_place": "🥉 3er lugar",
    "prizes.top5": "⭐ Top 5 finalistas",
    "prizes.first_prize": "$1k por persona o Macbook Air M4",
    "prizes.first_bonus": "+ Pasantía en Slash",
    "prizes.second_prize": "$750 por persona",
    "prizes.second_bonus": "+ 1 año Suscripción Platzi",
    "prizes.third_prize": "$500 por persona",
    "prizes.third_bonus": "+ $250 créditos de OpenAI",
    "prizes.top5_prize": "3 meses de Lovable Pro",
    "prizes.top5_bonus": "+ Certificado de participación",
    "prizes.cta": "¿Listo para competir por estos premios?",

    // Schedule Section
    "schedule.title": "Cronograma y Speakers",
    "schedule.day1": "17 de octubre – Taller + Speakers",
    "schedule.day1_location": "Teatro de la Escuela Campo Alegre",
    "schedule.day1_time": "11:00 – 16:00",
    "schedule.day1_description": "Charlas de los líderes más innovadores de Venezuela",
    "schedule.day1_speakers_link": "Ver lista completa de speakers",
    "schedule.speakers_include": "Speakers incluyen:",
    "schedule.speakers_preview": "Victor Cardenas, CEO de Slash (Empresa de $400M)",
    "schedule.view_all_speakers": "Ver todos los speakers",
    "schedule.day1_networking": "• Reunión con tragos y comida",
    "schedule.days23": "18–19 de octubre – Hackathon",
    "schedule.days23_location": "Zona de eventos, Escuela Campo Alegre",
    "schedule.days23_time": "48 horas intensivas de creación",
    "schedule.days23_activities":
      "• Desarrollo de prototipos\n• Creación de pitch\n• Mentorías + Networking\n• Premiación final",
    "schedule.location_title": "Ubicación del Evento",
    "schedule.address1": "Final Av. Andrés Bello con Av. Alameda",
    "schedule.address2": "Urbanización Campo Alegre, Caracas",
    "schedule.directions": "Ver direcciones",
    "schedule.open_maps": "Abrir en Google Maps",

    // Workshops Section
    "workshops.title": "Workshops Previos",
    "workshops.completed": "Completado",
    "workshops.pending": "Pendiente",

    // Ambassadors Section
    "ambassadors.title": "Embajadores y Organizadores",
    "ambassadors.organizers": "Organizadores",
    "ambassadors.ambassadors": "Embajadores",
    "ambassadors.david.role": "Cofundador de AlegrIA, educador y speaker",
    "ambassadors.ugo.role": "Cofundador de AlegrIA y educador",

    // Moments Section
    "moments.title": "Momentos de Alegria",
    "moments.description": "Revive los mejores momentos de nuestros workshops anteriores",
    "moments.testimonials_title": "Lo que dicen nuestros estudiantes",
    "moments.loading": "Cargando momentos de Alegria...",
    "moments.click_to_expand": "Click para ampliar",
    "moments.testimonial1":
      "El curso de prompting me abrió los ojos a las posibilidades de la IA. Ahora puedo crear contenido increíble en minutos.",
    "moments.testimonial2":
      "Las herramientas de IA que nos recomendaron han revolucionado mi forma de estudiar. Estoy súper satisfecho con los resultados.",
    "moments.testimonial3":
      "AlegrIA me enseñó que cualquier idea puede convertirse en un negocio real. ¡Increíble experiencia!",

    // Photo descriptions
    "moments.photo1": "Estudiantes de 6to grado aprendiendo sobre emprendimiento",
    "moments.photo2": "Presentación interactiva en 7mo grado",
    "moments.photo3": "Sesión de aprendizaje grupal",
    "moments.photo4": "Trabajo colaborativo en 7mo grado",
    "moments.photo5": "Desarrollo de proyectos en equipo",
    "moments.photo6": "AI Tool Deep Dive - Herramientas de IA",
    "moments.photo7": "Colaboración y trabajo en equipo",
    "moments.photo8": "Presentación de ideas innovadoras",
    "moments.photo9": "Workshop en el Colegio San Ignacio",
    "moments.photo10": "Sesión de aprendizaje colaborativo en San Ignacio",

    // Sponsors Section
    "sponsors.title": "Patrocinadores",
    "sponsors.description": "Por confirmar",
    "sponsors.sponsor": "Patrocinador",
    "sponsors.slash_description": "plataforma bancaria para PYMEs",
    "sponsors.cardenas_description": "Proveedor de máquinas financieras más grande de Venezuela.",

    // FAQ Section
    "faq.title": "Preguntas Frecuentes",
    "faq.q1": "¿Cuál es el timeline de aplicaciones?",
    "faq.a1":
      "• Fecha límite para aplicar: 19 de septiembre, 2025\n• Fecha tentativa de respuesta: 28 de septiembre, 2025\n• Fecha del evento: 17-19 de octubre, 2025",
    "faq.q2": "¿Cómo funciona el proceso de aplicación?",
    "faq.a2":
      "AlegrIA es un evento exclusivo con cupos limitados. Debes aplicar con tu equipo y pasar por un proceso de selección. Solo los equipos más prometedores serán aceptados para participar en el hackathon. Te notificaremos si tu aplicación fue exitosa.",
    "faq.q3": "¿Quién puede participar?",
    "faq.a3": "Estudiantes de bachillerato o universidad en cualquier parte de Venezuela.",
    "faq.q4": "¿Necesito experiencia previa?",
    "faq.a4": "Es preferible, pero no. Se valora la curiosidad y las ganas más que el conocimiento técnico.",
    "faq.q5": "¿Qué necesito llevar?",
    "faq.a5":
      "Una laptop, tus ideas, y tu equipo. Nosotros ponemos el Wi-Fi y la energía (podemos proveer chromebooks si es necesario).",
    "faq.q6": "¿Cuánto cuesta?",
    "faq.a6": "Es gratis aplicar. Si tu equipo es aceptado, hay una tarifa de inscripción de $20 por persona.",
    "faq.q7": "¿Se puede ir sin equipo?",
    "faq.a7": "No. Debes aplicar con un equipo de 2 personas como mínimo.",

    // Footer
    "footer.description": "Empoderando a venezolanos para construir el negocio de sus sueños.",
    "footer.contact": "Contacto",
    "footer.links": "Enlaces",
    "footer.terms": "Términos y Condiciones",
    "footer.privacy": "Política de Privacidad",
    "footer.conduct": "Código de Conducta",
    "footer.rights": "Todos los derechos reservados.",

    // Speakers Page
    "speakers.title": "Nuestros Speakers",
    "speakers.back_to_schedule": "Volver al cronograma",
    "speakers.talks_title": "Charlas y Presentaciones",
    "speakers.companies_title": "Han trabajado en...",
    "speakers.click_details": "Click para ver más detalles",
    "speakers.for_whom": "Para quién es:",
    "speakers.victor.title": "Fundador y CEO de Slash",
    "speakers.victor.bio":
      "CEO y cofundador de Slash, una fintech de business banking vertical valorada en $370 millones",
    "speakers.victor.full_bio":
      "Víctor Cárdenas Codriansky, de 23 años, es el CEO y cofundador de Slash, una fintech de business banking vertical valorada en $370 millones tras levantar $60 millones en capital de riesgo. Apegado a su identidad venezolana, superó una crisis que casi lo lleva a la quiebra tras el colapso de Yeezy en 2022, demostrando una resiliencia admirable. Durante la pandemia, abandonó sus estudios de Computación en Stanford para dedicarse por completo al proyecto junto a su mejor amigo, Kevin Bai. Slash, graduada de Y Combinator, integra software contable y automatiza procesos financieros para PYMEs en EE. UU. La compañía planea expandirse a más de 100 países e incluir a Venezuela en sus operaciones en 2026.",
    "speakers.victor.achievements": [
      "Finalista del Breakthrough Junior Challenge 2016, quedando entre los 10 mejores de más de 15 000 proyectos globales",
      "Compró el dominio slash.com por $1 millón para fortalecer la marca y legitimidad de su plataforma",
      "Graduado de Y Combinator Summer 2021, recibiendo inversión y mentoría para escalar su negocio",
      "Superó una caída de ingresos de $5 M a $1.5 M tras la crisis de Yeezy, reposicionando la empresa con nuevos productos",
      "Próximo lanzamiento de la Global USD Account en 113 países, incluyendo Venezuela en 2026",
    ],
    "speakers.talk1.title": "Construyendo el futuro de las fintech en Venezuela",
    "speakers.talk1.description":
      "Descubre cómo se está revolucionando el sector financiero venezolano desde adentro, y las oportunidades que existen para emprendedores en fintech.",
    "speakers.talk1.audience": "emprendedores, estudiantes de finanzas, desarrolladores",
    "speakers.talk1.speaker": "Victor Cardenas",
    "speakers.talk1.company": "Fundador y CEO de Slash",
    "speakers.talk1.time": "11:00 AM",
    "speakers.talk1.date": "17 de octubre",
    "speakers.confirmed": "Por confirmar",
    "speakers.curious_facts": "Datos curiosos:",
    "speakers.linkedin": "Ver perfil de LinkedIn",

    // Forms
    "forms.back_to_applications": "Volver a aplicaciones",
    "forms.student_title": "Formulario de Aplicación - Participantes",
    "forms.school_title": "Formulario de Aplicación - Colegios",
    "forms.deadline_notice": "Fecha límite de aplicación",
    "forms.deadline_date": "19 de septiembre, 2025 - 11:59 PM EST",
    "forms.deadline_passed": "Período de Aplicaciones Cerrado",
    "forms.deadline_message": "Lo sentimos, el período de aplicaciones para AlegrIA Hackathon ha cerrado.",
    "forms.deadline_date_message": "La fecha límite era el 19 de septiembre de 2025 a las 11:59 PM EST.",
    "forms.questions": "¿Tienes preguntas?",
    "forms.contact_message": "Si tienes alguna consulta, no dudes en contactarnos.",
    "forms.contact_organizers": "Contactar Organizadores",
    "forms.success_title": "¡Felicitaciones!",
    "forms.success_message":
      "Tu aplicación ha sido enviada exitosamente. Te contactaremos pronto para informarte sobre el estado de tu aplicación. ¡Gracias por tu interés en AlegrIA!",
    "forms.close": "Cerrar",
    "forms.submitting": "Enviando aplicación...",
    "forms.submit": "Enviar Aplicación",
    "forms.participants_count": "Número de participantes (2-4) *",
    "forms.select_participants": "Selecciona el número de participantes",
    "forms.participant_name": "Nombre completo del participante",
    "forms.team_name": "Nombre del equipo *",
    "forms.school_university": "Colegio/Universidad *",
    "forms.school_year": "Año escolar *",
    "forms.contact_email": "Correo de contacto *",
    "forms.id_photo": "Foto de cédula *",
    "forms.upload_file": "Haz clic para subir o arrastra el archivo aquí",
    "forms.file_formats": "Formatos: JPG, PNG, PDF (máx. 5MB)",
    "forms.previous_experience": "Experiencia previa de todos los miembros del equipo (máx. 100 palabras)",
    "forms.motivation": "¿Por qué quieren participar? (máx. 200 palabras) *",
    "forms.preliminary_ideas": "Ideas preliminares para el hackathon (máx. 150 palabras)",
    "forms.school_name": "Nombre del colegio *",
    "forms.coordinator_name": "Nombre del coordinador/docente *",
    "forms.coordinator_email": "Correo del coordinador *",
    "forms.contact_phone": "Teléfono de contacto *",
    "forms.interested_students": "Número de alumnos interesados *",
    "forms.preferred_dates": "Fechas preferidas para el taller",
    "forms.selected_dates": "Fechas seleccionadas:",
    "forms.additional_comments": "Comentarios adicionales",

    // Common
    "common.loading": "Cargando...",
    "common.error": "Error",
    "common.success": "Éxito",
    "common.cancel": "Cancelar",
    "common.confirm": "Confirmar",
    "common.yes": "Sí",
    "common.no": "No",
    "common.back_home": "Volver al Inicio",

    // Results Section
    "results.coming_soon": "¡Los resultados se anunciarán pronto!",
    "results.check_back_date": "Regresa el 28 de septiembre de 2025 para ver los equipos aceptados",
    "results.announcement_date": "Fecha de anuncio: 28 de septiembre, 2025",

    // Ideas Section
    "ideas.title": "Posibles ideas",
    "ideas.description":
      "¿No sabes por dónde empezar? Aquí tienes algunas ideas inspiradoras que podrías desarrollar durante el hackathon.",
    "ideas.click_to_expand": "Haz clic para ver más detalles",
    "ideas.idea1.title": "Mapa Colaborativo de Tráfico",
    "ideas.idea1.description":
      "Una app o bot que permita a los conductores reportar al instante huecos, controles de policía o cortes de calle y ver esos avisos en un mapa colaborativo.",
    "ideas.idea2.title": "Comparador de Precios Comunitario",
    "ideas.idea2.description":
      "Un servicio donde los usuarios envíen precios de productos básicos en su barrio y obtengan un promedio actualizado para comparar tiendas cercanas.",
    "ideas.idea3.title": "Plataforma de Aportes Grupales",
    "ideas.idea3.description":
      "Una plataforma sencilla para que un grupo de amigos organice colectas de dinero, lleve el registro automático de quién ha aportado y reciba recordatorios antes de cada contribución.",
    "ideas.idea4.title": "Marketplace Anti-Desperdicio",
    "ideas.idea4.description":
      "Un marketplace minimalista donde panaderías o restaurantes publiquen su excedente de comida al cierre del día y voluntarios puedan reservarlo para evitar desperdicios.",
    "ideas.idea5.title": "Portal Ciudadano de Reportes",
    "ideas.idea5.description":
      "Un portal ciudadano en el que cualquier vecino suba foto y ubicación de farolas rotas, filtraciones o grietas, con notificaciones automáticas a autoridades o grupos comunitarios.",
    "ideas.idea6.title": "Red de Alertas Vecinales",
    "ideas.idea6.description":
      "Un bot o servicio geolocalizado donde los vecinos publiquen alertas de robos, emergencias o actividad sospechosa y todos reciban la notificación instantánea en un chat común.",
    "ideas.idea7.title": "Directorio de Actividades Extracurriculares",
    "ideas.idea7.description":
      "Un directorio web o bot donde organizadores de talleres y actividades extracurriculares publiquen horarios, precios y descripciones, y los padres puedan filtrar e inscribir a sus hijos de forma rápida.",
    "ideas.apply_now": "Aplica ahora",
    "ideas.back_to_applications": "Volver a aplicaciones",
    "ideas.view_all_ideas": "Ver todas las ideas",
    "ideas.inspired_cta": "¿Te inspiraste? ¡Aplica ahora y desarrolla tu idea!",

    // Overview Section
    "overview.title": "Tu oportunidad para destacarte",
    "overview.description": "Descripción general de lo que vivirás en AlegrIA",
    "overview.what_is.title": "¿Qué es AlegrIA?",
    "overview.what_is.body":
      "Un vibe‑coding hackathon de 48 horas en Caracas.\nConstruyes prototipos usando herramientas no‑code/low‑code.\nAprendes, creas y presentas tu demo ante jueces.",
    "overview.flow.title": "Agenda",
    "overview.flow.body":
      "Día 1: Taller + charlas para encender ideas.\nDías 2–3: 48h de construcción guiada con mentores.\nCierre: Demos en vivo y premiación.",
    "overview.eligibility.title": "Quiénes aplican",
    "overview.eligibility.body":
      "Equipos de 2–4 personas.\nEstudiantes de bachillerato o universidad en Venezuela.\nLa experiencia técnica es opcional.",
    "overview.dates.title": "Fechas clave",
    "overview.dates.body":
      "Cierre de aplicaciones: 19 de septiembre, 2025.\nDía 1: 17 de octubre, 2025.\nHackathon: 18–19 de octubre, 2025.",
    "overview.cost.title": "Costo",
    "overview.cost.body": "Aplicar es gratis.\nSi eres aceptado: $20 por persona.",
    "overview.prizes.title": "Premios",
    "overview.prizes.body": "Más de $15,000 en premios.\nPerks extra de software y equipo.",
    "overview.cta_primary": "Aplica ahora",
    "overview.cta_secondary": "Ver cronograma",
  },
  en: {
    // Header
    "nav.mission": "Mission",
    "nav.schedule": "Schedule",
    "nav.conference": "Conference",
    "nav.speakers": "Speakers",
    "nav.applications": "Applications",
    "nav.prizes": "Prizes",
    "nav.workshops": "Workshops",
    "nav.ambassadors": "Ambassadors",
    "nav.sponsors": "Sponsors",
    "nav.faq": "FAQ",
    "nav.contact": "Contact",
    "nav.apply": "Apply now",
    "nav.menu": "Menu",
    "nav.student_application": "Student Application",
    "nav.school_application": "School Application",
    "nav.project_ideas": "Project Ideas",
    "nav.overview": "Overview",
    "nav.moments": "Moments",
    "nav.results": "Results",

    // Hero Section
    "hero.question": "Do you have an idea that can\nchange the world?",
    "hero.from_idea": "From idea…",
    "hero.to_prototype": "…to prototype",
    "hero.to_business": "…to real business",
    "hero.main_title": "48 hours. One hackathon. Your future.",
    "hero.subtitle": "Compete in Venezuela's first vibe-coding hackathon in history for $15,000+ in prizes and launch your startup",
    "hero.subtitle_first_part": "Compete in Venezuela's ",
    "hero.subtitle_highlight": "first vibe-coding hackathon",
    "hero.subtitle_last_part": " in history for $15,000+ in prizes and launch your startup",
    "hero.cta": "Apply now",
    "hero.deadline": "Deadline: September 19, 2025",
    "hero.scroll_hint": "Scroll to continue",

    // Applications Section
    "applications.title": "Applications",
    "applications.description":
      "Form a team of 2 to 4 people and apply to experience 48 hours of building, inspiration, and community.",
    "applications.student.title": "I'm a student and want to participate",
    "applications.student.description": "Join the hackathon with your team and compete for incredible prizes",
    "applications.student.cta": "Apply now",
    "applications.school.title": "I want to bring AlegrIA to my school",
    "applications.school.description": "Organize an AlegrIA workshop at your educational institution",
    "applications.school.cta": "Request workshop",

    // Prizes Section
    "prizes.title": "Prizes",
    "prizes.description": "Over $15,000 in prizes waiting for you",
    "prizes.first_place": "🏆 1st place",
    "prizes.second_place": "🥈 2nd place",
    "prizes.third_place": "🥉 3rd place",
    "prizes.top5": "⭐ Top 5 finalists",
    "prizes.first_prize": "$1k per person or Macbook Air M4",
    "prizes.first_bonus": "+ Internship at Slash",
    "prizes.second_prize": "$750 per person",
    "prizes.second_bonus": "+ 1 year Platzi Subscription",
    "prizes.third_prize": "$500 per person",
    "prizes.third_bonus": "+ $250 OpenAI credits",
    "prizes.top5_prize": "3 months Lovable Pro",
    "prizes.top5_bonus": "+ Participation certificate",
    "prizes.cta": "Ready to compete for these prizes?",

    // Schedule Section
    "schedule.title": "Schedule & Speakers",
    "schedule.day1": "October 17 – Workshop + Speakers",
    "schedule.day1_location": "Escuela Campo Alegre Theater",
    "schedule.day1_time": "11:00 AM – 4:00 PM",
    "schedule.day1_description": "Talks by Venezuela's most innovative leaders",
    "schedule.day1_speakers_link": "See complete speakers list",
    "schedule.speakers_include": "Speakers include:",
    "schedule.speakers_preview": "Victor Cardenas, CEO of Slash ($400M Company)",
    "schedule.view_all_speakers": "View all speakers",
    "schedule.day1_networking": "• Networking with drinks and food",
    "schedule.days23": "October 18–19 – Hackathon",
    "schedule.days23_location": "Event area, Escuela Campo Alegre",
    "schedule.days23_time": "48 intensive hours of creation",
    "schedule.days23_activities":
      "• Prototype development\n• Pitch creation\n• Mentoring + Networking\n• Final awards ceremony",
    "schedule.location_title": "Event Location",
    "schedule.address1": "Final Av. Andrés Bello with Av. Alameda",
    "schedule.address2": "Campo Alegre Urbanization, Caracas",
    "schedule.directions": "Get directions",
    "schedule.open_maps": "Open in Google Maps",

    // Workshops Section
    "workshops.title": "Previous Workshops",
    "workshops.completed": "Completed",
    "workshops.pending": "Pending",

    // Ambassadors Section
    "ambassadors.title": "Ambassadors and Organizers",
    "ambassadors.organizers": "Organizers",
    "ambassadors.ambassadors": "Ambassadors",
    "ambassadors.david.role": "AlegrIA Co-founder, educator and speaker",
    "ambassadors.ugo.role": "AlegrIA Co-founder and educator",

    // Moments Section
    "moments.title": "Alegria Moments",
    "moments.description": "Relive the best moments from our previous workshops",
    "moments.testimonials_title": "What our students say",
    "moments.loading": "Loading Alegria moments...",
    "moments.click_to_expand": "Click to expand",
    "moments.testimonial1":
      "The prompting course opened my eyes to the possibilities of AI. Now I can create incredible content in minutes.",
    "moments.testimonial2":
      "The AI tools they recommended have revolutionized the way I study. I'm super satisfied with the results.",
    "moments.testimonial3": "AlegrIA taught me that any idea can become a real business. Incredible experience!",

    // Photo descriptions
    "moments.photo1": "6th grade students learning about entrepreneurship",
    "moments.photo2": "Interactive presentation in 7th grade",
    "moments.photo3": "Group learning session",
    "moments.photo4": "Collaborative work in 7th grade",
    "moments.photo5": "Team project development",
    "moments.photo6": "AI Tool Deep Dive - AI Tools",
    "moments.photo7": "Collaboration and teamwork",
    "moments.photo8": "Presentation of innovative ideas",
    "moments.photo9": "Workshop at San Ignacio School",
    "moments.photo10": "Collaborative learning session at San Ignacio",

    // Sponsors Section
    "sponsors.title": "Sponsors",
    "sponsors.description": "To be confirmed",
    "sponsors.sponsor": "Sponsor",
    "sponsors.slash_description": "banking platform for SMEs",
    "sponsors.cardenas_description": "Largest provider of financial machines in Venezuela.",

    // FAQ Section
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "What is the application timeline?",
    "faq.a1":
      "• Application deadline: September 19, 2025\n• Tentative response date: September 28, 2025\n• Event date: October 17-19, 2025",
    "faq.q2": "How does the application process work?",
    "faq.a2":
      "AlegrIA is an exclusive event with limited spots. You must apply with your team and go through a selection process. Only the most promising teams will be accepted to participate in the hackathon. We will notify you if your application was successful.",
    "faq.q3": "Who can participate?",
    "faq.a3": "High school or university students anywhere in Venezuela.",
    "faq.q4": "Do I need previous experience?",
    "faq.a4": "It's preferable, but not required. We value curiosity and enthusiasm more than technical knowledge.",
    "faq.q5": "What do I need to bring?",
    "faq.a5":
      "A laptop, your ideas, and your team. We provide Wi-Fi and power (we can provide Chromebooks if necessary).",
    "faq.q6": "How much does it cost?",
    "faq.a6": "It's free to apply. If your team is accepted, there's a registration fee of $20 per person.",
    "faq.q7": "Can I go without a team?",
    "faq.a7": "No. You must apply with a team of at least 2 people.",

    // Footer
    "footer.description": "Empowering Venezuelans to build the business of their dreams.",
    "footer.contact": "Contact",
    "footer.links": "Links",
    "footer.terms": "Terms and Conditions",
    "footer.privacy": "Privacy Policy",
    "footer.conduct": "Code of Conduct",
    "footer.rights": "All rights reserved.",

    // Speakers Page
    "speakers.title": "Our Speakers",
    "speakers.back_to_schedule": "Back to schedule",
    "speakers.talks_title": "Talks and Presentations",
    "speakers.companies_title": "Have worked at...",
    "speakers.click_details": "Click to see more details",
    "speakers.for_whom": "For whom:",
    "speakers.victor.title": "Founder and CEO of Slash",
    "speakers.victor.bio": "CEO and co-founder of Slash, a vertical business banking fintech valued at $370 million",
    "speakers.victor.full_bio":
      "Víctor Cárdenas Codriansky, 23 years old, is the CEO and co-founder of Slash, a vertical business banking fintech valued at $370 million after raising $60 million in venture capital. Deeply connected to his Venezuelan identity, he overcame a crisis that nearly led to bankruptcy after the collapse of Yeezy in 2022, demonstrating admirable resilience. During the pandemic, he dropped out of Computer Science studies at Stanford to dedicate himself entirely to the project alongside his best friend, Kevin Bai. Slash, a Y Combinator graduate, integrates accounting software and automates financial processes for SMEs in the US. The company plans to expand to over 100 countries and include Venezuela in its operations by 2026.",
    "speakers.victor.achievements": [
      "Finalist of the Breakthrough Junior Challenge 2016, ranking among the top 10 out of over 15,000 global projects",
      "Purchased the slash.com domain for $1 million to strengthen the brand and platform legitimacy",
      "Y Combinator Summer 2021 graduate, receiving investment and mentorship to scale the business",
      "Overcame a revenue drop from $5M to $1.5M after the Yeezy crisis, repositioning the company with new products",
      "Upcoming launch of the Global USD Account in 113 countries, including Venezuela in 2026",
    ],
    "speakers.talk1.title": "Building the future of fintech in Venezuela",
    "speakers.talk1.description":
      "Discover how Venezuela's financial sector is being revolutionized from within, and the opportunities that exist for fintech entrepreneurs.",
    "speakers.talk1.audience": "entrepreneurs, finance students, developers",
    "speakers.talk1.speaker": "Victor Cardenas",
    "speakers.talk1.company": "Founder and CEO of Slash",
    "speakers.talk1.time": "11:00 AM",
    "speakers.talk1.date": "October 17",
    "speakers.confirmed": "To be confirmed",
    "speakers.curious_facts": "Fun facts:",
    "speakers.linkedin": "View LinkedIn profile",

    // Forms
    "forms.back_to_applications": "Back to applications",
    "forms.student_title": "Application Form - Participants",
    "forms.school_title": "Application Form - Schools",
    "forms.deadline_notice": "Application deadline",
    "forms.deadline_date": "September 19, 2025 - 11:59 PM EST",
    "forms.deadline_passed": "Application Period Closed",
    "forms.deadline_message": "Sorry, the application period for AlegrIA Hackathon has closed.",
    "forms.deadline_date_message": "The deadline was September 19, 2025 at 11:59 PM EST.",
    "forms.questions": "Have questions?",
    "forms.contact_message": "If you have any questions, don't hesitate to contact us.",
    "forms.contact_organizers": "Contact Organizers",
    "forms.success_title": "Congratulations!",
    "forms.success_message":
      "Your application has been sent successfully. We will contact you soon to inform you about the status of your application. Thank you for your interest in AlegrIA!",
    "forms.close": "Close",
    "forms.submitting": "Submitting application...",
    "forms.submit": "Submit Application",
    "forms.participants_count": "Number of participants (2-4) *",
    "forms.select_participants": "Select the number of participants",
    "forms.participant_name": "Full name of participant",
    "forms.team_name": "Team name *",
    "forms.school_university": "School/University *",
    "forms.school_year": "School year *",
    "forms.contact_email": "Contact email *",
    "forms.id_photo": "ID photo *",
    "forms.upload_file": "Click to upload or drag the file here",
    "forms.file_formats": "Formats: JPG, PNG, PDF (max. 5MB)",
    "forms.previous_experience": "Previous experience of all team members (max. 100 words)",
    "forms.motivation": "Why do you want to participate? (max. 200 words) *",
    "forms.preliminary_ideas": "Preliminary ideas for the hackathon (max. 150 words)",
    "forms.school_name": "School name *",
    "forms.coordinator_name": "Coordinator/teacher name *",
    "forms.coordinator_email": "Coordinator email *",
    "forms.contact_phone": "Contact phone *",
    "forms.interested_students": "Number of interested students *",
    "forms.preferred_dates": "Preferred dates for the workshop",
    "forms.selected_dates": "Selected dates:",
    "forms.additional_comments": "Additional comments",

    // Common
    "common.loading": "Loading...",
    "common.error": "Error",
    "common.success": "Success",
    "common.cancel": "Cancel",
    "common.confirm": "Confirm",
    "common.yes": "Yes",
    "common.no": "No",
    "common.back_home": "Back to Home",

    // Results Section
    "results.coming_soon": "Results will be announced soon!",
    "results.check_back_date": "Check back on September 28, 2025 to see the accepted teams",
    "results.announcement_date": "Announcement date: September 28, 2025",

    // Ideas Section
    "ideas.title": "Project Ideas",
    "ideas.description":
      "Don't know where to start? Here are some inspiring ideas you could develop during the hackathon.",
    "ideas.click_to_expand": "Click to see more details",
    "ideas.idea1.title": "Collaborative Traffic Map",
    "ideas.idea1.description":
      "An app or bot that allows drivers to instantly report potholes, police checkpoints, or street closures and see those alerts on a collaborative map.",
    "ideas.idea2.title": "Community Price Comparator",
    "ideas.idea2.description":
      "A service where users send prices of basic products in their neighborhood and get an updated average to compare nearby stores.",
    "ideas.idea3.title": "Group Contribution Platform",
    "ideas.idea3.description":
      "A simple platform for a group of friends to organize money collections, keep automatic records of who has contributed, and receive reminders before each contribution.",
    "ideas.idea4.title": "Anti-Waste Marketplace",
    "ideas.idea4.description":
      "A minimalist marketplace where bakeries or restaurants publish their surplus food at closing time and volunteers can reserve it to avoid waste.",
    "ideas.idea5.title": "Citizen Reporting Portal",
    "ideas.idea5.description":
      "A citizen portal where any neighbor uploads photos and location of broken streetlights, leaks, or cracks, with automatic notifications to authorities or community groups.",
    "ideas.idea6.title": "Neighborhood Alert Network",
    "ideas.idea6.description":
      "A geolocated bot or service where neighbors publish alerts about robberies, emergencies, or suspicious activity and everyone receives instant notification in a common chat.",
    "ideas.idea7.title": "Extracurricular Activities Directory",
    "ideas.idea7.description":
      "A web directory or bot where organizers of workshops and extracurricular activities publish schedules, prices, and descriptions, and parents can filter and enroll their children quickly.",
    "ideas.apply_now": "Apply now",
    "ideas.back_to_applications": "Back to applications",
    "ideas.view_all_ideas": "View all ideas",
    "ideas.inspired_cta": "Feeling inspired? Apply now and develop your idea!",

    // Overview Section
    "overview.title": "Your chance to stand out",
    "overview.description": "A general overview of what you'll experience at AlegrIA.",
    "overview.what_is.title": "What is AlegrIA?",
    "overview.what_is.body":
      "A 48‑hour vibe‑coding hackathon in Caracas.\nBuild prototypes using no‑code/low‑code tools.\nLearn, create, and pitch your demo to judges.",
    "overview.flow.title": "Agenda",
    "overview.flow.body":
      "Day 1: Workshop + talks to spark ideas.\nDays 2–3: 48h of guided building with mentors.\nFinale: Live demos and awards.",
    "overview.eligibility.title": "Eligibility",
    "overview.eligibility.body":
      "Teams of 2–4 people.\nHigh school or university students in Venezuela.\nAdvanced technical experience optional.",
    "overview.dates.title": "Key dates",
    "overview.dates.body":
      "Applications close: September 19, 2025.\nDay 1: October 17, 2025.\nHackathon: October 18–19, 2025.",
    "overview.cost.title": "Cost",
    "overview.cost.body": "Applying is free.\nIf accepted: $20 per person.",
    "overview.prizes.title": "Prizes",
    "overview.prizes.body": "Over $15,000 in prizes.\nExtra software and gear perks.",
    "overview.cta_primary": "Apply now",
    "overview.cta_secondary": "View schedule",
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("es")

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("alegria-language") as Language
    if (savedLanguage && (savedLanguage === "es" || savedLanguage === "en")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("alegria-language", lang)
  }

  const t = (key: string): string => {
    const translation = translations[language][key as keyof (typeof translations)[typeof language]]
    // If translation is an array, join it or return first element
    if (Array.isArray(translation)) {
      return translation.join(', ')
    }
    return (translation as string) || key
  }

  const tArray = (key: string): string[] => {
    const translation = translations[language][key as keyof (typeof translations)[typeof language]]
    // If translation is an array, return it
    if (Array.isArray(translation)) {
      return translation
    }
    // If it's a string, return as single-item array
    return translation ? [translation as string] : [key]
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, tArray }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
