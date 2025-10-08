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
    "nav.speakers": "Ponentes",
    "nav.applications": "Aplicaciones",
    "nav.prizes": "Premios",
    "nav.main_prizes": "Premios principales",
    "nav.yummy_prizes": "Premios Yummy",
    "nav.workshops": "Workshops",
    "nav.ambassadors": "Organizadores",
    "nav.sponsors": "Aliados",
    "nav.faq": "FAQ",
    "nav.contact": "Contacto",
    "nav.apply": "Aplica ahora",
    "nav.menu": "Menú",
    "nav.student_application": "Aplicaciones Hackatón",
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
    "hero.main_title": "48 horas. Un hackatón. Tu futuro.",
    "hero.subtitle": "Compite en el primer hackatón de vibe-coding de la historia de Venezuela por $50,000+ en premios y lanza tu startup",
    "hero.subtitle_first_part": "Compite en el ",
    "hero.subtitle_highlight": "primer hackatón de vibe-coding",
    "hero.subtitle_last_part": " de la historia de Venezuela por $50,000+ en premios y lanza tu startup",
    "hero.cta": "Ver resultados",
    "hero.deadline": "¡Felicitaciones a los equipos clasificados! Ahora a construir...",
    "hero.scroll_hint": "Desliza para continuar",

    // Applications Section
    "applications.title": "Aplicaciones",
    "applications.description":
      "Forma un equipo de 2 a 4 personas y aplica para vivir 48 horas de construcción, inspiración y comunidad.",
    "applications.student.title": "Quiero participar en el hackatón",
    "applications.student.description": "Únete al hackatón con tu equipo y compite por increíbles premios",
    "applications.student.cta": "Ver resultados",
    "applications.school.title": "Quiero llevar AlegrIA a mi colegio",
    "applications.school.description": "Organiza un workshop de AlegrIA en tu institución educativa",
    "applications.school.cta": "Solicitar workshop",

    // Prizes Section
    "prizes.title": "Premios",
    "prizes.description": "Más de $50,000 en premios esperándote",
    "prizes.first_place": "🏆 1er lugar",
    "prizes.second_place": "🥈 2do lugar",
    "prizes.third_place": "🥉 3er lugar",
    "prizes.top5": "⭐ Todos",
    "prizes.first_prize": "$25.000",
    "prizes.first_description": "para el desarrollo de su negocio",
    "prizes.first_bonus": "+ Curso 16 horas Intezia \"De 0 a Experto en IA\"",
    "prizes.second_prize": "$5.000",
    "prizes.second_description": "para el desarrollo de su negocio",
    "prizes.second_bonus": "+ Becas 4Geeks Academy \"Full Stack Developer\"",
    "prizes.third_prize": "$2.500",
    "prizes.third_description": "para el desarrollo de su negocio",
    "prizes.third_bonus": "+ $500 créditos de OpenAI",
    "prizes.top5_prize": "1 mes suscripción en Lovable Pro",
    "prizes.top5_bonus": "+ Curso Intezia \"IA para negocios\"",
    "prizes.yummy_category_title": "Premios Yummy",
    "prizes.yummy_category_description": "Para las mejores ideas que requieran delivery físico. El pago será en créditos de envíos para tu negocio con el API de Yummy.",
    "prizes.yummy_winner": "🏆 Ganador",
    "prizes.yummy_prize": "$20.000",
    "prizes.yummy_bonus": "Para desarrollo de negocio con delivery",
    "prizes.yummy_description": "... en créditos de envíos Yummy para tu negocio",
    "prizes.cta": "¿Listo para competir por estos premios?",

    // Schedule Section
    "schedule.title": "Charlas y cronograma",
    "schedule.day1": "17 de octubre – Taller + Ponentes",
    "schedule.day1_location": "Escuela Campo Alegre",
    "schedule.day1_time": "11:00 – 16:00",
    "schedule.day1_description": "Charlas de los líderes más innovadores de Venezuela",
    "schedule.day1_speakers_link": "Ver lista completa de ponentes",
    "schedule.speakers_include": "Ponentes incluyen:",
    "schedule.speakers_preview": "CEO de Yummy, Cashea, Slash y Presidente de Venecápital",
    "schedule.view_all_speakers": "Ver todos los ponentes",
    "schedule.day1_table_title": "Día 1: 17 de octubre",
    "schedule.time_column": "Hora",
    "schedule.agenda_column": "Agenda",
    "schedule.arrival": "Llegada",
    "schedule.opening_ceremony": "Ceremonia de apertura",
    "schedule.talks_session": "Charlas",
    "schedule.talks_description": "aquí pon el botón para los speakers que está ahorita y la descripción corta para las charlas",
    "schedule.day1_closing": "Clausura del 1er día",
    "schedule.dinner": "Cena",
    "schedule.last_call": "Última llamada para irse de la sede o quedarse hasta el próximo día",
    "schedule.development_sleep": "Desarrollo de producto + dormir",
    "schedule.view_complete": "Ver cronograma completo",
    "schedule.day2_table_title": "Día 2: 18 de octubre",
    "schedule.day3_table_title": "Día 3: 19 de octubre",
    "schedule.arrival_returning": "Llegada para los que se fueron",
    "schedule.assembly": "Asamblea (Resumen de agenda + Plan para el día)",
    "schedule.product_development": "Desarrollo de producto + mentorías exclusivas",
    "schedule.lunch": "Almuerzo",
    "schedule.final_touches": "Últimos toques + desarrollo de pitch",
    "schedule.submission": "Entrega de producto y pitch deck",
    "schedule.jury_selection": "Jurado: Decide Top 10 basado en entregables\nConcursantes: Siguen desarrollando su producto",
    "schedule.top10_announcement": "Anuncio de los Top 10 (dos lotes de presentación) y Reglas para Demo (5 min demo + 5 min Q&A)",
    "schedule.first_batch": "Presentaciones del 1er lote",
    "schedule.break": "Break",
    "schedule.second_batch": "Presentaciones del 2do lote",
    "schedule.jury_deliberation": "Deliberación de jueces",
    "schedule.awards_closing": "Premiación y cierre",
    "schedule.speakers_section_title": "Charlas",
    "schedule.schedule_section_title": "Cronograma",
    "schedule.day1_networking": "• Reunión con bebidas y comida",
    "schedule.days23": "18–19 de octubre – Hackatón",
    "schedule.days23_location": "Escuela Campo Alegre",
    "schedule.days23_time": "48 horas intensivas de creación",
    "schedule.days23_activities":
      "• Desarrollo de prototipos\n• Creación de pitch\n• Mentorías + Networking\n• Premiación final",
    "schedule.location_title": "Ubicación del Evento",
    "schedule.address1": "Final Calle La Cinta",
    "schedule.address2": "Las Mercedes, Caracas, Venezuela",
    "schedule.directions": "Dirección disponible en Google Maps",
    "schedule.open_maps": "https://www.google.com/maps/search/?api=1&query=Escuela+Campo+Alegre+Final+Calle+La+Cinta+Las+Mercedes+Caracas+Venezuela",
    "schedule.open_maps_text": "Abrir en Google Maps",

    // Workshops Section
    "workshops.title": "Workshops previos",
    "workshops.completed": "Completado",
    "workshops.pending": "Pendiente",

    // Ambassadors Section
    "ambassadors.title": "Organizadores",
    "ambassadors.organizers": "Organizadores",
    "ambassadors.ambassadors": "Embajadores",
    "ambassadors.david.role": "Cofundador de AlegrIA, educador y speaker",
    "ambassadors.ugo.role": "Cofundador de AlegrIA y educador",

    // Moments Section
    "moments.title": "Momentos de AlegrIA",
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
    "sponsors.title": "Aliados",
    "sponsors.description": "Por confirmar",
    "sponsors.sponsor": "Aliado",
    "sponsors.slash_description": "Plataforma bancaria para PYMEs",
    "sponsors.yummy_description": "Superapp y plataforma #1 de delivery y ridesharing en Venezuela",
    "sponsors.ribbit_description": "Firma global de capital de riesgo que invierte en empresas fintech. Portfolio: Coinbase, Robinhood...",
    "sponsors.cashea_description": "El primer compra ahora y paga después de Venezuela. El más grande, más rentable y de crecimiento más rápido de Latinoamérica.",
    "sponsors.lovable_description": "Plataforma de desarrollo de software con IA que permite crear aplicaciones web completas usando lenguaje natural.",
    "sponsors.intezia_description": "Consultoría de inteligencia artificial en Latam.",
    "sponsors.4geeks_description": "Bootcamp internacional en línea con 2000+ graduados en desarrollo web, IA y ciberseguridad.",

    // FAQ Section
    "faq.title": "Preguntas frecuentes",
    "faq.q1": "¿Cuál es el timeline de aplicaciones?",
    "faq.a1":
      "• Fecha límite para aplicar: 1 de octubre, 2025\n• Fecha tentativa de respuesta: 7 de octubre, 2025\n• Fecha del evento: 17-19 de octubre, 2025",
    "faq.q2": "¿Cómo funciona el proceso de aplicación?",
    "faq.a2":
      "AlegrIA es un evento exclusivo con cupos limitados. Debes aplicar con tu equipo y pasar por un proceso de selección. Solo los equipos más prometedores serán aceptados para participar en el hackatón. Te notificaremos si tu aplicación fue exitosa.",
    "faq.q3": "¿Quién puede participar?",
    "faq.a3": "Cualquier persona de los 14 a 29 años en Venezuela.",
    "faq.q4": "¿Necesito experiencia previa?",
    "faq.a4": "Es preferible, pero no. Se valora la curiosidad y las ganas más que el conocimiento técnico.",
    "faq.q5": "¿Qué necesito llevar?",
    "faq.a5":
      "Una laptop, tus ideas, y tu equipo. Nosotros ponemos el Wi-Fi y la energía (podemos proveer chromebooks si es necesario).",
    "faq.q6": "¿Cuánto cuesta?",
    "faq.a6": "Es gratis aplicar. Si tu equipo es aceptado, hay una tarifa de inscripción de $20 por persona.",
    "faq.q7": "¿Se puede ir sin equipo?",
    "faq.a7": "No. Debes aplicar con un equipo de 2 personas como mínimo.",
    "faq.q8": "¿Qué es vibe-coding?",
    "faq.a8": "Vibe-coding es un estilo de creación rápida de productos donde los participantes construyen aplicaciones, sitios web o herramientas funcionales confiando en IA y plataformas no-code/low-code. El objetivo es lanzar algo funcional rápidamente, priorizando usabilidad y originalidad sobre código perfecto.",
    "faq.a8_short": "Creación rápida de productos usando IA y plataformas no-code/low-code. Prioriza usabilidad y originalidad sobre código perfecto.",

    // Footer
    "footer.description": "Empoderando a venezolanos para construir el negocio de sus sueños.",
    "footer.contact": "Contacto",
    "footer.links": "Enlaces",
    "footer.terms": "Términos y Condiciones",
    "footer.privacy": "Política de Privacidad",
    "footer.conduct": "Código de Conducta",
    "footer.rights": "Todos los derechos reservados.",

    // Speakers Page
    "speakers.title": "Nuestros ponentes",
    "speakers.back_to_schedule": "Volver al cronograma",
    "speakers.talks_title": "Charlas y presentaciones",
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
    "speakers.vicente.title": "Fundador y CEO de Yummy",
    "speakers.vicente.bio": "Fundador y CEO de Yummy, la superapp líder de delivery y ridesharing en Venezuela",
    "speakers.vicente.full_bio": "Vicente Zavarce es el Fundador y CEO de Yummy, una super-app de e-commerce lanzada en Venezuela. Valorada en más de $200 millones, Yummy opera en cuatro países, sirve a 4 millones de usuarios y completa alrededor de 800,000 órdenes cada mes. Graduado Magna Cum Laude de Northeastern University, Vicente perfeccionó sus habilidades en growth marketing en Wayfair, Getaround y Postmates antes de lanzar Yummy en 2020 como la primera app de delivery de Venezuela. Lo que comenzó como una plataforma de entrega de comida se ha expandido rápidamente a comestibles, rideshare y pronto pagos digitales, haciendo de Yummy una de las super-apps en ascenso de América Latina. Vicente también es reconocido por Forbes 30 Under 30 y es Socio en Epakon Capital, donde invierte en empresas de software en diversas industrias.",
    "speakers.vicente.achievements": [
      "Domina español, inglés, portugués y francés",
      "Primero financió Yummy usando ahorros personales y tarjetas de crédito antes de recaudar financiamiento de capital de riesgo",
      "Operó la empresa remotamente desde San Francisco durante los confinamientos de COVID-19",
      "Conocido por su estilo de liderazgo basado en datos y enfocado en la resistencia",
    ],
    "speakers.pedro.title": "Fundador y CEO de Cashea",
    "speakers.pedro.bio": "Fundador y CEO de Cashea, la aplicación líder de pagos de compra ahora y paga después en Venezuela",
    "speakers.pedro.full_bio": "Pedro Julio Vallenilla es el Fundador y CEO de Cashea, la aplicación líder de pagos de compra ahora y paga después en Venezuela. Desde su lanzamiento en 2022, Cashea ha alcanzado a más de 8 millones de usuarios y está presente en 18,000 comercios, convirtiéndose en una de las apps financieras más influyentes del país. Su modelo innovador de Buy Now, Pay Later transformó la forma de comprar en Venezuela, brindando flexibilidad de pago a millones de usuarios. Con más de 31 millones de órdenes procesadas, Cashea ha revolucionado el comercio electrónico venezolano. Antes de Cashea, Pedro fundó startups como Elemétrica, Meser y TuDescuento, además de desempeñarse en Colektia, donde gestionó portafolios millonarios para bancos como Nubank y Santander. También ha sido mentor en programas como Startup Chile y Founder Institute, apoyando a emprendedores en toda Latinoamérica.",
    "speakers.pedro.achievements": [
      "Cashea procesa alrededor del 1% del PIB venezolano en transacciones",
      "La app creció 10× en un año y ya cubre a casi un tercio de la población adulta del país",
      "Comenzó en un solo centro comercial de Caracas antes de expandirse masivamente",
      "Mentor en programas como Startup Chile y Founder Institute",
      "Experiencia previa en Colektia gestionando portafolios millonarios para Nubank y Santander",
    ],
    "speakers.pedro_urdaneta.title": "Presidente de Venecápital",
    "speakers.pedro_urdaneta.bio": "Abogado corporativo con más de 25 años de trayectoria en fusiones y adquisiciones, finanzas corporativas y transacciones transfronterizas en Venezuela.",
    "speakers.pedro_urdaneta.full_bio": "Pedro Urdaneta es abogado corporativo con más de 25 años de trayectoria en fusiones y adquisiciones, finanzas corporativas y transacciones transfronterizas en Venezuela. Además de su rol como Presidente de Venecápital —la Asociación Venezolana de Capital Privado— donde impulsa el desarrollo de la industria de capital privado en el país, es Socio Senior en la firma LEĜA Abogados, donde co-dirige las prácticas de Corporativo/M&A y Banca & Finanzas. Ha sido profesor universitario en asignaturas como derecho comparado y ética empresarial en la Universidad Metropolitana, y es recurrente conferencista en foros de negocios internacionales.",
    "speakers.pedro_urdaneta.achievements": [
      "Fue nombrado Presidente de Venecápital para su nuevo periodo estatutario recientemente",
      "Ha sido abogado reconocido por Chambers Global por su expertise en reestructuraciones corporativas y proyectos de infraestructura",
      "Está admitido para ejercer tanto en Venezuela como en Nueva York, lo que le da una perspectiva internacional en transacciones y litigios",
    ],
    "speakers.talk1.title": "Escalando Slash a $150M ARR tras estar al borde del cierre",
    "speakers.talk1.description":
      "Descubre cómo se está revolucionando el sector financiero Estado Unidense y las oportunidades que existen para emprendedores en fintech.",
    "speakers.talk1.audience": "emprendedores, estudiantes de finanzas, desarrolladores",
    "speakers.talk1.speaker": "Victor Cardenas",
    "speakers.talk1.company": "Fundador y CEO de Slash",
    "speakers.talk1.time": "11:50 AM",
    "speakers.talk1.date": "17 de octubre",
    "speakers.talk2.title": "Escalando startups en Latinoamérica: De la idea al mercado global",
    "speakers.talk2.description":
      "Aprende sobre growth, adquisición de usuarios y estrategias para escalar startups dentro de Latinoamérica.",
    "speakers.talk2.audience": "emprendedores, especialistas en marketing, founders de startups",
    "speakers.talk2.speaker": "Vicente Zavarce",
    "speakers.talk2.company": "CEO y Fundador de Yummy",
    "speakers.talk2.time": "2:00 PM",
    "speakers.talk2.date": "17 de octubre",
    "speakers.talk3.title": "Construyendo la app compra ahora, paga después más grande de Latinoamerica",
    "speakers.talk3.description":
      "Descubre cómo Cashea revolucionó el mercado financiero venezolano y las estrategias para crear productos fintech accesibles en mercados emergentes.",
    "speakers.talk3.audience": "emprendedores fintech, especialistas en crédito, founders de startups",
    "speakers.talk3.speaker": "Pedro Julio Vallenilla",
    "speakers.talk3.company": "Fundador y CEO de Cashea",
    "speakers.talk3.time": "2:50 PM",
    "speakers.talk3.date": "17 de octubre",
    "speakers.talk4.title": "Fortaleciendo el capital privado en Venezuela: desafíos y oportunidades",
    "speakers.talk4.description": "Explorando las oportunidades y desafíos del capital privado en Venezuela y su impacto en el emprendimiento.",
    "speakers.talk4.audience": "emprendedores, inversionistas, estudiantes de finanzas",
    "speakers.talk4.speaker": "Pedro Urdaneta",
    "speakers.talk4.company": "Presidente de Venecápital",
    "speakers.talk4.time": "11:00 AM",
    "speakers.talk4.date": "17 de octubre",
    "speakers.talk5.title": "Formación exclusiva de Intezia: Construcción de agentes de IA",
    "speakers.talk5.description": "Taller práctico sobre la construcción de agentes de inteligencia artificial.",
    "speakers.talk5.audience": "desarrolladores, estudiantes de IA, emprendedores tech",
    "speakers.talk5.speaker": "Equipo Intezia",
    "speakers.talk5.company": "Intezia",
    "speakers.talk5.time": "3:40 PM",
    "speakers.talk5.date": "17 de octubre",
    "speakers.confirmed": "Por confirmar",
    "speakers.curious_facts": "Datos curiosos:",
    "speakers.linkedin": "Ver perfil de LinkedIn",

    // Forms
    "forms.back_to_applications": "Volver a aplicaciones",
    "forms.student_title": "Formulario de Aplicación - Participantes",
    "forms.school_title": "Formulario de Aplicación - Colegios",
    "forms.deadline_notice": "Fecha límite de aplicación",
    "forms.deadline_date": "1 de octubre, 2025 - 11:59 PM EST",
    "forms.deadline_passed": "Período de Aplicaciones Cerrado",
    "forms.deadline_message": "Lo sentimos, el período de aplicaciones para AlegrIA Hackatón ha cerrado.",
    "forms.deadline_date_message": "La fecha límite era el 1 de octubre de 2025 a las 11:59 PM EST.",
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
    "forms.preliminary_ideas": "Ideas preliminares para el hackatón (máx. 150 palabras)",
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
    "results.check_back_date": "Regresa el 7 de octubre de 2025 para ver los equipos aceptados",
    "results.announcement_date": "Fecha de anuncio: 7 de octubre, 2025",

    // Ideas Section
    "ideas.title": "Posibles ideas",
    "ideas.description":
      "¿No sabes por dónde empezar? Aquí tienes algunas ideas inspiradoras que podrías desarrollar durante el hackatón.",
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
    "ideas.idea5.title": "Agenda Colaborativa de Eventos",
    "ideas.idea5.description":
      "Una plataforma donde organizadores pueden crear páginas para sus eventos y los participantes registrarse, recibir recordatorios y acceder a toda la información en un solo enlace compartido.",
    "ideas.idea6.title": "Portal Ciudadano de Reportes",
    "ideas.idea6.description":
      "Un portal ciudadano en el que cualquier vecino suba foto y ubicación de farolas rotas, filtraciones o grietas, con notificaciones automáticas a autoridades o grupos comunitarios.",
    "ideas.idea7.title": "Red de Alertas Vecinales",
    "ideas.idea7.description":
      "Un bot o servicio geolocalizado donde los vecinos publiquen alertas de robos, emergencias o actividad sospechosa y todos reciban la notificación instantánea en un chat común.",
    "ideas.idea8.title": "Directorio de Actividades Extracurriculares",
    "ideas.idea8.description":
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
      "Un evento de 48 horas donde equipos crean startups beneficiando a Venezuela desde cero usando herramientas de inteligencia artificial.\nUsas herramientas no‑code/low‑code para construir prototipos funcionales.",
    "overview.flow.title": "Agenda",
    "overview.flow.body":
      "Día 1: Taller + charlas para encender ideas.\nDías 2–3: 48h de construcción guiada con mentores.\nCierre: Demos en vivo y premiación.",
    "overview.eligibility.title": "Quiénes aplican",
    "overview.eligibility.body":
      "Equipos de 2–4 personas.\nCualquier persona de los 14 a 29 años en Venezuela.\nLa experiencia técnica es opcional.",
    "overview.dates.title": "Fechas clave",
    "overview.dates.body":
      "Cierre de aplicaciones: 1 de octubre, 2025.\nDía 1: 17 de octubre, 2025.\nHackatón: 18–19 de octubre, 2025.",
    "overview.cost.title": "Costo",
    "overview.cost.body": "Aplicar es gratis.\nSi eres aceptado: $20 por persona.",
    "overview.prizes.title": "Premios",
    "overview.prizes.body": "Más de $50,000 en premios.\nPerks extra de software y equipo.",
    "overview.cta_primary": "Aplica ahora",
    "overview.cta_secondary": "Ver cronograma",
  },
  en: {
    // Header
    "nav.mission": "Mission",
    "nav.schedule": "Schedule",
    "nav.conference": "Conference",
    "nav.speakers": "Ponentes",
    "nav.applications": "Applications",
    "nav.prizes": "Prizes",
    "nav.main_prizes": "Main Prizes",
    "nav.yummy_prizes": "Yummy Prizes",
    "nav.workshops": "Workshops",
    "nav.ambassadors": "Organizers",
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
    "hero.subtitle": "Compete in Venezuela's first vibe-coding hackathon in history for $50,000+ in prizes and launch your startup",
    "hero.subtitle_first_part": "Compete in Venezuela's ",
    "hero.subtitle_highlight": "first vibe-coding hackathon",
    "hero.subtitle_last_part": " in history for $50,000+ in prizes and launch your startup",
    "hero.cta": "Apply now",
    "hero.deadline": "Deadline: October 1, 2025",
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
    "prizes.description": "Over $50,000 in prizes waiting for you",
    "prizes.first_place": "🏆 1st place",
    "prizes.second_place": "🥈 2nd place",
    "prizes.third_place": "🥉 3rd place",
    "prizes.top5": "⭐ Everyone",
    "prizes.first_prize": "$25,000",
    "prizes.first_description": "for business development",
    "prizes.first_bonus": "+ 16-hour Intezia \"From 0 to AI Expert\" course",
    "prizes.second_prize": "$5,000",
    "prizes.second_description": "for business development",
    "prizes.second_bonus": "+ 4Geeks Academy \"Full Stack Developer\" scholarships",
    "prizes.third_prize": "$2,500",
    "prizes.third_description": "for business development",
    "prizes.third_bonus": "+ $500 OpenAI credits",
    "prizes.top5_prize": "1 month Lovable Pro subscription",
    "prizes.top5_bonus": "+ Intezia \"AI for Business\" course",
    "prizes.yummy_category_title": "Yummy Prizes",
    "prizes.yummy_category_description": "For the best ideas requiring physical delivery. Payment will be in Yummy API credits for your business delivery needs.",
    "prizes.yummy_winner": "🏆 Winner",
    "prizes.yummy_prize": "$20,000",
    "prizes.yummy_bonus": "For delivery business development",
    "prizes.yummy_description": "... in Yummy delivery credits for your business",
    "prizes.cta": "Ready to compete for these prizes?",

    // Schedule Section
    "schedule.title": "Talks and Schedule",
    "schedule.day1": "October 17 – Workshop + Speakers",
    "schedule.day1_location": "Escuela Campo Alegre",
    "schedule.day1_time": "11:00 AM – 4:00 PM",
    "schedule.day1_description": "Talks by Venezuela's most innovative leaders",
    "schedule.day1_speakers_link": "See complete speakers list",
    "schedule.speakers_include": "Speakers include:",
    "schedule.speakers_preview": "CEO of Yummy, Cashea, Slash and President of Venecápital",
    "schedule.view_all_speakers": "View all speakers",
    "schedule.day1_table_title": "Day 1: October 17",
    "schedule.time_column": "Time",
    "schedule.agenda_column": "Agenda",
    "schedule.arrival": "Arrival",
    "schedule.opening_ceremony": "Opening ceremony",
    "schedule.talks_session": "Talks",
    "schedule.talks_description": "here put the button for speakers that's currently there and the short description for the talks",
    "schedule.day1_closing": "Day 1 closing",
    "schedule.dinner": "Dinner",
    "schedule.last_call": "Last call to leave the venue or stay until next day",
    "schedule.development_sleep": "Product development + sleep",
    "schedule.view_complete": "View complete schedule",
    "schedule.day2_table_title": "Day 2: October 18",
    "schedule.day3_table_title": "Day 3: October 19",
    "schedule.arrival_returning": "Arrival for those who left",
    "schedule.assembly": "Assembly (Agenda summary + Plan for the day)",
    "schedule.product_development": "Product development + exclusive mentoring",
    "schedule.lunch": "Lunch",
    "schedule.final_touches": "Final touches + pitch development",
    "schedule.submission": "Product and pitch deck submission",
    "schedule.jury_selection": "Jury: Decides Top 10 based on deliverables\nContestants: Continue developing their product",
    "schedule.top10_announcement": "Top 10 announcement (two presentation batches) and Demo Rules (5 min demo + 5 min Q&A)",
    "schedule.first_batch": "First batch presentations",
    "schedule.break": "Break",
    "schedule.second_batch": "Second batch presentations",
    "schedule.jury_deliberation": "Jury deliberation",
    "schedule.awards_closing": "Awards and closing",
    "schedule.speakers_section_title": "Talks",
    "schedule.schedule_section_title": "Schedule",
    "schedule.day1_networking": "• Networking with drinks and food",
    "schedule.days23": "October 18–19 – Hackathon",
    "schedule.days23_location": "Escuela Campo Alegre",
    "schedule.days23_time": "48 intensive hours of creation",
    "schedule.days23_activities":
      "• Prototype development\n• Pitch creation\n• Mentoring + Networking\n• Final awards ceremony",
    "schedule.location_title": "Event Location",
    "schedule.address1": "Final Calle La Cinta",
    "schedule.address2": "Las Mercedes, Caracas, Venezuela",
    "schedule.directions": "Directions available on Google Maps",
    "schedule.open_maps": "https://www.google.com/maps/search/?api=1&query=Escuela+Campo+Alegre+Final+Calle+La+Cinta+Las+Mercedes+Caracas+Venezuela",
    "schedule.open_maps_text": "Open in Google Maps",

    // Workshops Section
    "workshops.title": "Previous Workshops",
    "workshops.completed": "Completed",
    "workshops.pending": "Pending",

    // Ambassadors Section
    "ambassadors.title": "Organizers",
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
    "sponsors.slash_description": "Banking platform for SMEs",
    "sponsors.yummy_description": "Superapp and #1 delivery and ridesharing platform in Venezuela",
    "sponsors.ribbit_description": "Global venture capital firm investing in fintech companies. Portfolio: Coinbase, Robinhood...",
    "sponsors.cashea_description": "Venezuela's first buy now, pay later. The biggest, most profitable and fastest growing in Latin America.",
    "sponsors.lovable_description": "AI-powered software development platform that enables building complete web applications using natural language.",
    "sponsors.intezia_description": "Artificial intelligence consulting in Latin America.",
    "sponsors.4geeks_description": "International online bootcamp with 2000+ graduates in web development, AI and cybersecurity.",

    // FAQ Section
    "faq.title": "Frequently Asked Questions",
    "faq.q1": "What is the application timeline?",
    "faq.a1":
      "• Application deadline: October 1, 2025\n• Tentative response date: October 7, 2025\n• Event date: October 17-19, 2025",
    "faq.q2": "How does the application process work?",
    "faq.a2":
      "AlegrIA is an exclusive event with limited spots. You must apply with your team and go through a selection process. Only the most promising teams will be accepted to participate in the hackathon. We will notify you if your application was successful.",
    "faq.q3": "Who can participate?",
    "faq.a3": "Anyone aged 14 to 29 in Venezuela.",
    "faq.q4": "Do I need previous experience?",
    "faq.a4": "It's preferable, but not required. We value curiosity and enthusiasm more than technical knowledge.",
    "faq.q5": "What do I need to bring?",
    "faq.a5":
      "A laptop, your ideas, and your team. We provide Wi-Fi and power (we can provide Chromebooks if necessary).",
    "faq.q6": "How much does it cost?",
    "faq.a6": "It's free to apply. If your team is accepted, there's a registration fee of $20 per person.",
    "faq.q7": "Can I go without a team?",
    "faq.a7": "No. You must apply with a team of at least 2 people.",
    "faq.q8": "What is vibe-coding?",
    "faq.a8": "Vibe-coding is a style of rapid product creation where participants build functional apps, websites, or tools relying on AI and no-code/low-code platforms. The goal is to ship something functional fast, prioritizing usability and originality over perfect code.",
    "faq.a8_short": "Rapid product creation using AI and no-code/low-code platforms. Prioritizes usability and originality over perfect code.",

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
    "speakers.vicente.title": "Founder and CEO of Yummy",
    "speakers.vicente.bio": "Founder and CEO of Yummy, the leading superapp for delivery and ridesharing in Venezuela",
    "speakers.vicente.full_bio": "Vicente Zavarce is the Founder and CEO of Yummy, an e-commerce super-app launched in Venezuela. Valued at over $200 million, Yummy operates in four countries, serves 4 million users, and completes around 800,000 orders each month. A Magna Cum Laude graduate from Northeastern University, Vicente honed his growth marketing skills at Wayfair, Getaround, and Postmates before launching Yummy in 2020 as Venezuela's first delivery app. What started as a food delivery platform has rapidly expanded into groceries, rideshare, and soon digital payments, making Yummy one of Latin America's rising super-apps. Vicente is also a Forbes 30 Under 30 honoree and Partner at Epakon Capital, where he invests in software companies across industries.",
    "speakers.vicente.achievements": [
      "Fluent in Spanish, English, Portuguese, and French",
      "First financed Yummy using personal savings and credit cards before raising venture funding",
      "Operated the company remotely from San Francisco during COVID-19 lockdowns",
      "Known for his data-driven, resilience-focused leadership style",
    ],
    "speakers.pedro.title": "Founder and CEO of Cashea",
    "speakers.pedro.bio": "Founder and CEO of Cashea, Venezuela's leading buy now, pay later app",
    "speakers.pedro.full_bio": "Pedro Julio Vallenilla is the Founder and CEO of Cashea, Venezuela's leading buy now, pay later app. Since its launch in 2022, Cashea has reached over 8 million users and is present in 18,000 stores, becoming one of the most influential financial apps in the country. His innovative Buy Now, Pay Later model transformed how Venezuelans shop, providing payment flexibility to millions of users. With over 31 million orders processed, Cashea has revolutionized Venezuelan e-commerce. Before Cashea, Pedro founded startups like Elemétrica, Meser, and TuDescuento, and worked at Colektia, where he managed million-dollar portfolios for banks like Nubank and Santander. He has also been a mentor in programs like Startup Chile and Founder Institute, supporting entrepreneurs throughout Latin America.",
    "speakers.pedro.achievements": [
      "Cashea processes around 1% of Venezuelan GDP in transactions",
      "The app grew 10× in one year and already covers almost a third of the country's adult population",
      "Started in a single shopping mall in Caracas before expanding massively",
      "Mentor in programs like Startup Chile and Founder Institute",
      "Previous experience at Colektia managing million-dollar portfolios for Nubank and Santander",
    ],
    "speakers.pedro_urdaneta.title": "President of Venecápital",
    "speakers.pedro_urdaneta.bio": "Corporate lawyer with over 25 years of experience in mergers and acquisitions, corporate finance, and cross-border transactions in Venezuela.",
    "speakers.pedro_urdaneta.full_bio": "Pedro Urdaneta is a corporate lawyer with over 25 years of experience in mergers and acquisitions, corporate finance, and cross-border transactions in Venezuela. In addition to his role as President of Venecápital —the Venezuelan Private Capital Association— where he drives the development of the private capital industry in the country, he is a Senior Partner at LEĜA Abogados, where he co-leads the Corporate/M&A and Banking & Finance practices. He has been a university professor in subjects such as comparative law and business ethics at Universidad Metropolitana, and is a recurring speaker at international business forums.",
    "speakers.pedro_urdaneta.achievements": [
      "Recently appointed President of Venecápital for its new statutory period",
      "Recognized lawyer by Chambers Global for his expertise in corporate restructuring and infrastructure projects",
      "Admitted to practice in both Venezuela and New York, giving him an international perspective on transactions and litigation",
    ],
    "speakers.talk1.title": "Scaling Slash to $150M ARR after being on the brink of closure",
    "speakers.talk1.description":
      "Discover how the US financial sector is being revolutionized and the opportunities that exist for fintech entrepreneurs.",
    "speakers.talk1.audience": "entrepreneurs, finance students, developers",
    "speakers.talk1.speaker": "Victor Cardenas",
    "speakers.talk1.company": "Founder and CEO of Slash",
    "speakers.talk1.time": "11:50 AM",
    "speakers.talk1.date": "October 17",
    "speakers.talk2.title": "Scaling startups in Latin America: From idea to global market",
    "speakers.talk2.description":
      "Learn about growth, user acquisition, and strategies for scaling startups within Latin America.",
    "speakers.talk2.audience": "entrepreneurs, marketing specialists, startup founders",
    "speakers.talk2.speaker": "Vicente Zavarce",
    "speakers.talk2.company": "CEO and Founder of Yummy",
    "speakers.talk2.time": "2:00 PM",
    "speakers.talk2.date": "October 17",
    "speakers.talk3.title": "Building Latin America's largest buy now, pay later app",
    "speakers.talk3.description":
      "Discover how Cashea revolutionized the Venezuelan financial market and strategies for creating accessible fintech products in emerging markets.",
    "speakers.talk3.audience": "fintech entrepreneurs, credit specialists, startup founders",
    "speakers.talk3.speaker": "Pedro Julio Vallenilla",
    "speakers.talk3.company": "Founder and CEO of Cashea",
    "speakers.talk3.time": "2:50 PM",
    "speakers.talk3.date": "October 17",
    "speakers.talk4.title": "Strengthening private capital in Venezuela: challenges and opportunities",
    "speakers.talk4.description": "Exploring the opportunities and challenges of private capital in Venezuela and its impact on entrepreneurship.",
    "speakers.talk4.audience": "entrepreneurs, investors, finance students",
    "speakers.talk4.speaker": "Pedro Urdaneta",
    "speakers.talk4.company": "President of Venecápital",
    "speakers.talk4.time": "11:00 AM",
    "speakers.talk4.date": "October 17",
    "speakers.talk5.title": "Exclusive Intezia training: Building AI agents",
    "speakers.talk5.description": "Practical workshop on building artificial intelligence agents.",
    "speakers.talk5.audience": "developers, AI students, tech entrepreneurs",
    "speakers.talk5.speaker": "Intezia Team",
    "speakers.talk5.company": "Intezia",
    "speakers.talk5.time": "3:40 PM",
    "speakers.talk5.date": "October 17",
    "speakers.confirmed": "To be confirmed",
    "speakers.curious_facts": "Fun facts:",
    "speakers.linkedin": "View LinkedIn profile",

    // Forms
    "forms.back_to_applications": "Back to applications",
    "forms.student_title": "Application Form - Participants",
    "forms.school_title": "Application Form - Schools",
    "forms.deadline_notice": "Application deadline",
    "forms.deadline_date": "October 1, 2025 - 11:59 PM EST",
    "forms.deadline_passed": "Application Period Closed",
    "forms.deadline_message": "Sorry, the application period for AlegrIA Hackathon has closed.",
    "forms.deadline_date_message": "The deadline was October 1, 2025 at 11:59 PM EST.",
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
    "results.check_back_date": "Check back on October 7, 2025 to see the accepted teams",
    "results.announcement_date": "Announcement date: October 7, 2025",

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
    "ideas.idea5.title": "Collaborative Event Agenda",
    "ideas.idea5.description":
      "A platform where organizers can create attractive pages for their activities and attendees can register, receive reminders, and access all information through a single shared link.",
    "ideas.idea6.title": "Citizen Reporting Portal",
    "ideas.idea6.description":
      "A citizen portal where any neighbor uploads photos and location of broken streetlights, leaks, or cracks, with automatic notifications to authorities or community groups.",
    "ideas.idea7.title": "Neighborhood Alert Network",
    "ideas.idea7.description":
      "A geolocated bot or service where neighbors publish alerts about robberies, emergencies, or suspicious activity and everyone receives instant notification in a common chat.",
    "ideas.idea8.title": "Extracurricular Activities Directory",
    "ideas.idea8.description":
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
      "A 48‑hour event where teams create startups benefiting Venezuela from scratch using artificial intelligence tools.\nUse no‑code/low‑code tools to build functional prototypes.",
    "overview.flow.title": "Agenda",
    "overview.flow.body":
      "Day 1: Workshop + talks to spark ideas.\nDays 2–3: 48h of guided building with mentors.\nFinale: Live demos and awards.",
    "overview.eligibility.title": "Eligibility",
    "overview.eligibility.body":
      "Teams of 2–4 people.\nAnyone aged 14 to 29 in Venezuela.\nAdvanced technical experience optional.",
    "overview.dates.title": "Key dates",
    "overview.dates.body":
      "Applications close: October 1, 2025.\nDay 1: October 17, 2025.\nHackathon: October 18–19, 2025.",
    "overview.cost.title": "Cost",
    "overview.cost.body": "Applying is free.\nIf accepted: $20 per person.",
    "overview.prizes.title": "Prizes",
    "overview.prizes.body": "Over $50,000 in prizes.\nExtra software and gear perks.",
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
