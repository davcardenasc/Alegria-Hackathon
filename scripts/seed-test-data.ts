import { prisma } from "../lib/prisma"

async function main() {
  try {
    console.log("Creating test applications...")
    
    const testApplications = [
      {
        teamName: "Los Innovadores",
        participantsCount: 3,
        participants: JSON.stringify(["Juan Pérez", "María García", "Carlos López"]),
        school: "Escuela Campo Alegre",
        gradeOrYear: "5to año",
        contactEmail: "juan.perez@example.com",
        experienceText: "Tenemos experiencia en programación web con JavaScript y Python. Juan ha participado en competencias de programación, María tiene conocimientos de diseño UX/UI, y Carlos ha desarrollado pequeñas aplicaciones móviles.",
        motivationText: "Queremos participar en AlegrIA porque creemos que es una oportunidad única para desarrollar nuestras habilidades emprendedoras y tecnológicas. Esperamos crear una solución innovadora que tenga impacto real en nuestra comunidad.",
        ideasText: "Tenemos una idea preliminar para una aplicación que ayude a estudiantes a encontrar compañeros de estudio basado en sus horarios y materias. También estamos considerando una plataforma de intercambio de libros usados.",
        status: "PENDING" as const,
        starred: false
      },
      {
        teamName: "Tech Vision",
        participantsCount: 4,
        participants: JSON.stringify(["Ana Rodríguez", "Miguel Torres", "Sofía Chen", "David Kim"]),
        school: "Universidad Católica Andrés Bello",
        gradeOrYear: "2do semestre",
        contactEmail: "ana.rodriguez@ucab.edu.ve",
        experienceText: "Somos estudiantes de ingeniería de sistemas con experiencia en desarrollo de software. Ana se especializa en backend, Miguel en frontend, Sofía en bases de datos y David en inteligencia artificial.",
        motivationText: "Buscamos aplicar nuestros conocimientos técnicos en un proyecto real que pueda generar valor. El hackathon representa la oportunidad perfecta para trabajar en equipo bajo presión y crear algo innovador en poco tiempo.",
        ideasText: "Estamos interesados en desarrollar una solución de AI para optimizar rutas de transporte público en Caracas, utilizando datos en tiempo real y machine learning.",
        status: "ACCEPTED" as const,
        starred: true,
        reviewedAt: new Date()
      },
      {
        teamName: "Digital Dreams",
        participantsCount: 2,
        participants: JSON.stringify(["Isabella Martínez", "Alejandro Suárez"]),
        school: "Instituto Universitario de Tecnología",
        gradeOrYear: "6to semestre",
        contactEmail: "isabella.martinez@iut.edu.ve",
        experienceText: "Isabella es diseñadora gráfica con conocimientos de HTML/CSS y Alejandro es programador con experiencia en Python y JavaScript. Hemos trabajado juntos en proyectos freelance.",
        motivationText: "Queremos demostrar que un equipo pequeño puede crear soluciones impactantes. Este hackathon es nuestra oportunidad de competir con equipos más grandes y mostrar nuestra creatividad.",
        ideasText: null,
        status: "REJECTED" as const,
        starred: false,
        reviewedAt: new Date()
      },
      {
        teamName: "Code Warriors",
        participantsCount: 3,
        participants: JSON.stringify(["Roberto Silva", "Carmen Delgado", "Luis Mendoza"]),
        school: "Universidad Simón Bolívar",
        gradeOrYear: "8vo semestre",
        contactEmail: "roberto.silva@usb.ve",
        experienceText: "Equipo con sólida formación en ciencias de la computación. Roberto es experto en algoritmos, Carmen en desarrollo web fullstack, y Luis en arquitectura de software y DevOps.",
        motivationText: "Vemos en AlegrIA la oportunidad de poner a prueba nuestros conocimientos en un ambiente competitivo y colaborativo. Queremos crear una startup que realmente resuelva problemas locales.",
        ideasText: "Pensamos en una plataforma que conecte pequeños productores agrícolas directamente con consumidores, eliminando intermediarios y usando blockchain para garantizar trazabilidad.",
        status: "PENDING" as const,
        starred: true
      },
      {
        teamName: "Future Builders",
        participantsCount: 4,
        participants: JSON.stringify(["Valentina Morales", "Eduardo Ramos", "Gabriela Vega", "Andrés Herrera"]),
        school: "Universidad Central de Venezuela",
        gradeOrYear: "4to año",
        contactEmail: "valentina.morales@ucv.ve",
        experienceText: "Somos estudiantes de diferentes carreras: ingeniería, administración y diseño. Esta diversidad nos permite abordar problemas desde múltiples perspectivas.",
        motivationText: "Creemos que la innovación surge cuando se combinan diferentes disciplinas. AlegrIA nos permitirá demostrar que equipos multidisciplinarios pueden crear soluciones más completas y viables.",
        ideasText: "Queremos desarrollar una app que ayude a las PYMES a digitalizar sus procesos de facturación y inventario de manera simple y económica.",
        status: "PENDING" as const,
        starred: false
      }
    ]

    for (const app of testApplications) {
      await prisma.application.create({
        data: {
          ...app,
          submittedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random date within last 7 days
        }
      })
    }

    console.log("✅ Test data created successfully!")
    
  } catch (error) {
    console.error("❌ Error creating test data:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()