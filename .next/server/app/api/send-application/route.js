"use strict";(()=>{var e={};e.id=607,e.ids=[607],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1212:e=>{e.exports=require("async_hooks")},4770:e=>{e.exports=require("crypto")},6162:e=>{e.exports=require("stream")},1764:e=>{e.exports=require("util")},3757:e=>{e.exports=import("prettier/plugins/html")},5747:e=>{e.exports=import("prettier/standalone")},4492:e=>{e.exports=require("node:stream")},2887:(e,r,a)=>{a.r(r),a.d(r,{originalPathname:()=>f,patchFetch:()=>h,requestAsyncStorage:()=>d,routeModule:()=>l,serverHooks:()=>g,staticGenerationAsyncStorage:()=>u});var o={};a.r(o),a.d(o,{POST:()=>c});var i=a(3278),s=a(5002),n=a(4877),t=a(1309);let p=new(a(4425)).R("re_jo94ZKQX_2aFDDKvNwSNYYQC3qBnsJsn5");async function c(e){try{let r=await e.json(),a=function(e){let r=e.participantes.map(e=>`<li>${e}</li>`).join("");return`
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
        .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border: 1px solid #ddd; border-radius: 5px; }
        .header { color: #00162D; font-size: 24px; text-align: center; padding-bottom: 10px; border-bottom: 2px solid #4A5EE7; }
        .subheading { color: #4A5EE7; font-size: 18px; margin-top: 20px; margin-bottom: 10px; }
        .field { margin-bottom: 10px; font-size: 16px; line-height: 1.6; color: #333; }
        .field strong { color: #00162D; }
        ul { padding-left: 20px; margin: 0; }
        hr { border: 0; border-top: 1px solid #cccccc; margin: 20px 0; }
        .file-info { background-color: #f8f9fa; padding: 10px; border-radius: 5px; margin: 10px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="header">Nueva Aplicaci\xf3n - AlegrIA Hackathon</h1>
        <p class="field"><strong>Fecha de aplicaci\xf3n:</strong> ${e.fecha_aplicacion}</p>
        <hr />
        <h2 class="subheading">Informaci\xf3n del Equipo</h2>
        <p class="field"><strong>Nombre del equipo:</strong> ${e.nombre_equipo}</p>
        <p class="field"><strong># de participantes:</strong> ${e.numero_participantes}</p>
        <div class="field">
          <strong>Participantes:</strong>
          <ul>${r}</ul>
        </div>
        <p class="field"><strong>Colegio/Universidad:</strong> ${e.colegio}</p>
        <p class="field"><strong>A\xf1o escolar:</strong> ${e.ano_escolar}</p>
        <p class="field"><strong>Correo de contacto:</strong> ${e.correo}</p>
        <hr />
        <h2 class="subheading">Documentos</h2>
        <div class="file-info">
          <p class="field"><strong>Archivo de c\xe9dula:</strong> ${e.cedula_filename||"No se subi\xf3 archivo"}</p>
          ${e.cedula_filename?'<p class="field" style="font-size: 12px; color: #666;">Nota: El archivo fue enviado junto con esta aplicaci\xf3n.</p>':""}
        </div>
        <hr />
        <h2 class="subheading">Experiencia Previa</h2>
        <p class="field">${e.experiencia||"No especificada"}</p>
        <hr />
        <h2 class="subheading">Motivaci\xf3n</h2>
        <p class="field">${e.motivacion}</p>
        <hr />
        <h2 class="subheading">Ideas Preliminares</h2>
        <p class="field">${e.ideas||"No especificadas"}</p>
      </div>
    </body>
    </html>
  `}(r),{data:o,error:i}=await p.emails.send({from:"AlegrIA Aplicaciones <onboarding@resend.dev>",to:["cursos.alegria.labs@gmail.com"],subject:`Nueva Aplicaci\xf3n AlegrIA - Equipo: ${r.nombre_equipo}`,html:a});if(i)return console.error("Resend error:",i),t.NextResponse.json({success:!1,message:"Error al enviar el correo"},{status:500});return t.NextResponse.json({success:!0,message:"Aplicaci\xf3n enviada exitosamente"})}catch(e){return console.error("Error processing application:",e),t.NextResponse.json({success:!1,message:"Error al procesar la aplicaci\xf3n"},{status:500})}}let l=new i.AppRouteRouteModule({definition:{kind:s.x.APP_ROUTE,page:"/api/send-application/route",pathname:"/api/send-application",filename:"route",bundlePath:"app/api/send-application/route"},resolvedPagePath:"/Users/davidcardenas/Downloads/hackathon alegria/alegria-landing/app/api/send-application/route.ts",nextConfigOutput:"",userland:o}),{requestAsyncStorage:d,staticGenerationAsyncStorage:u,serverHooks:g}=l,f="/api/send-application/route";function h(){return(0,n.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:u})}}};var r=require("../../../webpack-runtime.js");r.C(e);var a=e=>r(r.s=e),o=r.X(0,[379,756],()=>a(2887));module.exports=o})();