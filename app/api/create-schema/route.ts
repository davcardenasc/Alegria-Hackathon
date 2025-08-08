import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Create tables using raw SQL based on our Prisma schema
    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "users" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "email" TEXT NOT NULL UNIQUE,
        "passwordHash" TEXT NOT NULL,
        "role" TEXT NOT NULL DEFAULT 'REVIEWER',
        "name" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `

    await prisma.$executeRaw`
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
        "status" TEXT NOT NULL DEFAULT 'PENDING',
        "starred" BOOLEAN NOT NULL DEFAULT false,
        "reviewedBy" TEXT,
        "reviewedAt" TIMESTAMP(3),
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY ("reviewedBy") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE
      );
    `

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "email_templates" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "type" TEXT NOT NULL,
        "subject" TEXT NOT NULL,
        "body" TEXT NOT NULL,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `

    await prisma.$executeRaw`
      CREATE TABLE IF NOT EXISTS "email_logs" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "applicationId" TEXT NOT NULL,
        "type" TEXT NOT NULL,
        "recipientEmail" TEXT NOT NULL,
        "subject" TEXT NOT NULL,
        "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "status" TEXT NOT NULL DEFAULT 'SENT',
        "errorMessage" TEXT,
        FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE ON UPDATE CASCADE
      );
    `

    return NextResponse.json({
      success: true,
      message: "Database schema created successfully",
      tables: ["users", "applications", "email_templates", "email_logs"]
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to create database schema",
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 })
  }
}

export async function POST() {
  return GET()
}