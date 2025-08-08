"use strict";(()=>{var e={};e.id=476,e.ids=[476],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},84770:e=>{e.exports=require("crypto")},89502:(e,a,t)=>{t.r(a),t.d(a,{originalPathname:()=>f,patchFetch:()=>A,requestAsyncStorage:()=>g,routeModule:()=>m,serverHooks:()=>x,staticGenerationAsyncStorage:()=>h});var o={};t.r(o),t.d(o,{GET:()=>u,POST:()=>c});var r=t(49303),i=t(88716),n=t(60670),s=t(87070),d=t(98691),p=t(83493);async function l(){let e="davidcardecodri@gmail.com",a="KodaCodriansky123!",t=await p._.user.findUnique({where:{email:e}});if(t)return console.log("Admin user already exists"),t;let o=await d.ZP.hash(a,12),r=await p._.user.create({data:{email:e,name:"Administrator",passwordHash:o,role:"ADMINISTRATOR"}});return console.log("Admin user created:",{email:e,password:a}),r}async function c(e){try{let{searchParams:a}=new URL(e.url);if(a.get("token")!==process.env.SETUP_TOKEN)return s.NextResponse.json({error:"Unauthorized"},{status:401});let t=await l();return await p._.emailTemplate.upsert({where:{id:"acceptance-template"},update:{},create:{id:"acceptance-template",type:"ACCEPTANCE",subject:"\uD83C\uDF89 \xa1Felicidades, {{teamName}}! Tu aplicaci\xf3n ha sido aceptada",body:`
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #4A5EE7; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🎉 \xa1Felicitaciones!</h1>
                </div>
                <div class="content">
                  <p>Hola equipo <strong>{{teamName}}</strong>,</p>
                  
                  <p>\xa1Nos alegra informarte que tu equipo ha sido aceptado en el Hackathon AlegrIA (17–19 Oct)!</p>
                  
                  <p><strong>Pr\xf3ximos pasos:</strong></p>
                  <ol>
                    <li>Asistir al workshop de lanzamiento el 17 de octubre a las 11 AM en ECA</li>
                    <li>Confirmar la asistencia de todos los miembros del equipo</li>
                    <li>Revisar las bases y condiciones del hackathon</li>
                  </ol>
                  
                  <p>Si tienes dudas, contesta a este correo.</p>
                  
                  <p>\xa1Nos vemos pronto!</p>
                  
                  <p><strong>Equipo AlegrIA</strong></p>
                </div>
                <div class="footer">
                  <p>Hackathon AlegrIA • Escuela Campo Alegre</p>
                </div>
              </div>
            </body>
          </html>
        `,isActive:!0}}),await p._.emailTemplate.upsert({where:{id:"rejection-template"},update:{},create:{id:"rejection-template",type:"REJECTION",subject:"Tu aplicaci\xf3n al Hackathon AlegrIA",body:`
          <html>
            <head>
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background-color: #00162D; color: white; padding: 20px; text-align: center; }
                .content { padding: 20px; }
                .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>Gracias por tu inter\xe9s</h1>
                </div>
                <div class="content">
                  <p>Hola equipo <strong>{{teamName}}</strong>,</p>
                  
                  <p>Gracias por tu inter\xe9s en el Hackathon AlegrIA.</p>
                  
                  <p>Lamentablemente en esta ocasi\xf3n no podemos avanzar con tu aplicaci\xf3n debido al alto n\xfamero de participantes que hemos recibido.</p>
                  
                  <p>Te animamos a seguir explorando y desarrollando tus ideas, y esperamos verte en futuros eventos.</p>
                  
                  <p>\xa1\xc1nimo y \xe9xito en tus proyectos!</p>
                  
                  <p><strong>Equipo AlegrIA</strong></p>
                </div>
                <div class="footer">
                  <p>Hackathon AlegrIA • Escuela Campo Alegre</p>
                </div>
              </div>
            </body>
          </html>
        `,isActive:!0}}),s.NextResponse.json({success:!0,message:"Admin user and templates created successfully",admin:{email:t.email,name:t.name}})}catch(e){return console.error("Setup error:",e),s.NextResponse.json({error:"Setup failed",details:e instanceof Error?e.message:"Unknown error"},{status:500})}}async function u(e){return c(e)}let m=new r.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/setup-admin/route",pathname:"/api/setup-admin",filename:"route",bundlePath:"app/api/setup-admin/route"},resolvedPagePath:"/Users/davidcardenas/Downloads/hackathon alegria/alegria-landing/app/api/setup-admin/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:g,staticGenerationAsyncStorage:h,serverHooks:x}=m,f="/api/setup-admin/route";function A(){return(0,n.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:h})}},83493:(e,a,t)=>{t.d(a,{_:()=>r});let o=require("@prisma/client"),r=globalThis.prisma??new o.PrismaClient}};var a=require("../../../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),o=a.X(0,[948,972,691],()=>t(89502));module.exports=o})();