"use strict";(()=>{var e={};e.id=5816,e.ids=[5816],e.modules={20399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},30517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},64087:(e,T,E)=>{E.r(T),E.d(T,{originalPathname:()=>p,patchFetch:()=>U,requestAsyncStorage:()=>n,routeModule:()=>c,serverHooks:()=>o,staticGenerationAsyncStorage:()=>u});var a={};E.r(a),E.d(a,{GET:()=>L,POST:()=>A});var t=E(49303),N=E(88716),s=E(60670),i=E(87070),r=E(83493);async function L(){try{return await r._.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `,await r._.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "UserRole" AS ENUM ('REVIEWER', 'ADMINISTRATOR');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `,await r._.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "EmailType" AS ENUM ('ACCEPTANCE', 'REJECTION');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `,await r._.$executeRaw`
      DO $$ BEGIN
        CREATE TYPE "EmailStatus" AS ENUM ('SENT', 'FAILED', 'PENDING');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `,await r._.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "passwordHash" TEXT NOT NULL,
        "role" "UserRole" NOT NULL DEFAULT 'REVIEWER',
        "name" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `,await r._.$executeRaw`
      CREATE TABLE IF NOT EXISTS "applications" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "teamName" TEXT NOT NULL,
        "participantsCount" INTEGER NOT NULL,
        "participants" TEXT NOT NULL,
        "school" TEXT NOT NULL,
        "gradeOrYear" TEXT NOT NULL,
        "contactEmail" TEXT NOT NULL,
        "idDocumentUrl" TEXT,
        "experienceText" TEXT,
        "motivationText" TEXT NOT NULL,
        "ideasText" TEXT,
        "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
        "starred" BOOLEAN NOT NULL DEFAULT false,
        "reviewedBy" TEXT,
        "reviewedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("reviewedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE
      );
    `,await r._.$executeRaw`
      CREATE TABLE IF NOT EXISTS "email_templates" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "type" "EmailType" NOT NULL,
        "subject" TEXT NOT NULL,
        "body" TEXT NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `,await r._.$executeRaw`
      CREATE TABLE IF NOT EXISTS "email_logs" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "applicationId" TEXT NOT NULL,
        "type" "EmailType" NOT NULL,
        "recipientEmail" TEXT NOT NULL,
        "subject" TEXT NOT NULL,
        "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "status" "EmailStatus" NOT NULL DEFAULT 'SENT',
        "errorMessage" TEXT,
        FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `,i.NextResponse.json({success:!0,message:"Database schema created successfully",enums:["ApplicationStatus","UserRole","EmailType","EmailStatus"],tables:["users","applications","email_templates","email_logs"]})}catch(e){return i.NextResponse.json({success:!1,message:"Failed to create database schema",error:e instanceof Error?e.message:"Unknown error"},{status:500})}}async function A(){return L()}let c=new t.AppRouteRouteModule({definition:{kind:N.x.APP_ROUTE,page:"/api/create-schema/route",pathname:"/api/create-schema",filename:"route",bundlePath:"app/api/create-schema/route"},resolvedPagePath:"/Users/davidcardenas/Downloads/hackathon alegria/alegria-landing/app/api/create-schema/route.ts",nextConfigOutput:"",userland:a}),{requestAsyncStorage:n,staticGenerationAsyncStorage:u,serverHooks:o}=c,p="/api/create-schema/route";function U(){return(0,s.patchFetch)({serverHooks:o,staticGenerationAsyncStorage:u})}},83493:(e,T,E)=>{E.d(T,{_:()=>t});let a=require("@prisma/client"),t=globalThis.prisma??new a.PrismaClient}};var T=require("../../../webpack-runtime.js");T.C(e);var E=e=>T(T.s=e),a=T.X(0,[8948,5972],()=>E(64087));module.exports=a})();