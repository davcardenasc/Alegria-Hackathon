"use strict";(()=>{var e={};e.id=480,e.ids=[480],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1212:e=>{e.exports=require("async_hooks")},4770:e=>{e.exports=require("crypto")},6162:e=>{e.exports=require("stream")},1764:e=>{e.exports=require("util")},3757:e=>{e.exports=import("prettier/plugins/html")},5747:e=>{e.exports=import("prettier/standalone")},4492:e=>{e.exports=require("node:stream")},3709:(e,o,r)=>{r.r(o),r.d(o,{originalPathname:()=>h,patchFetch:()=>m,requestAsyncStorage:()=>p,routeModule:()=>d,serverHooks:()=>g,staticGenerationAsyncStorage:()=>u});var s={};r.r(s),r.d(s,{POST:()=>c});var a=r(3278),i=r(5002),n=r(4877),t=r(1309);let l=new(r(4425)).R("re_jo94ZKQX_2aFDDKvNwSNYYQC3qBnsJsn5");async function c(e){try{let o=await e.json(),r=function(e){let o=e.fechas_seleccionadas&&e.fechas_seleccionadas.length>0?`<ul>${e.fechas_seleccionadas.map(e=>`<li>${e}</li>`).join("")}</ul>`:"<p>No se seleccionaron fechas espec\xedficas.</p>";return`
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
      </style>
    </head>
    <body>
      <div class="container">
        <h1 class="header">Nueva Solicitud de Workshop - AlegrIA</h1>
        <p class="field"><strong>Fecha de solicitud:</strong> ${e.fecha_aplicacion}</p>
        <hr />
        <h2 class="subheading">Informaci\xf3n del Colegio</h2>
        <p class="field"><strong>Nombre del colegio:</strong> ${e.nombre_colegio}</p>
        <p class="field"><strong>Coordinador/Docente:</strong> ${e.coordinador}</p>
        <p class="field"><strong>Correo del coordinador:</strong> ${e.correo_coordinador}</p>
        <p class="field"><strong>Tel\xe9fono:</strong> ${e.telefono}</p>
        <p class="field"><strong># de alumnos interesados:</strong> ${e.num_alumnos}</p>
        <hr />
        <h2 class="subheading">Fechas Preferidas</h2>
        ${o}
        <hr />
        <h2 class="subheading">Comentarios Adicionales</h2>
        <p class="field">${e.comentarios||"No se proporcionaron comentarios."}</p>
      </div>
    </body>
    </html>
  `}(o),{data:s,error:a}=await l.emails.send({from:"AlegrIA Aplicaciones <onboarding@resend.dev>",to:["cursos.alegria.labs@gmail.com"],subject:`Nueva Solicitud de Workshop - ${o.nombre_colegio}`,html:r});if(a)return console.error("Resend error:",a),t.NextResponse.json({success:!1,message:"Error al enviar el correo"},{status:500});return t.NextResponse.json({success:!0,message:"Aplicaci\xf3n de colegio enviada exitosamente"})}catch(e){return console.error("Error processing school application:",e),t.NextResponse.json({success:!1,message:"Error al procesar la aplicaci\xf3n del colegio"},{status:500})}}let d=new a.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/send-school-application/route",pathname:"/api/send-school-application",filename:"route",bundlePath:"app/api/send-school-application/route"},resolvedPagePath:"/Users/davidcardenas/Downloads/hackathon alegria/alegria-landing/app/api/send-school-application/route.ts",nextConfigOutput:"",userland:s}),{requestAsyncStorage:p,staticGenerationAsyncStorage:u,serverHooks:g}=d,h="/api/send-school-application/route";function m(){return(0,n.patchFetch)({serverHooks:g,staticGenerationAsyncStorage:u})}}};var o=require("../../../webpack-runtime.js");o.C(e);var r=e=>o(o.s=e),s=o.X(0,[379,756],()=>r(3709));module.exports=s})();