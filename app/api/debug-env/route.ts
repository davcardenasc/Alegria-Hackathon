import { NextResponse } from "next/server"

export async function GET() {
  const dbUrl = process.env.DATABASE_URL || ""
  
  return NextResponse.json({
    DATABASE_URL_exists: !!process.env.DATABASE_URL,
    DATABASE_URL_length: dbUrl.length,
    DATABASE_URL_preview: dbUrl.substring(0, 50) + "...",
    DATABASE_URL_has_port: dbUrl.includes(":5432") || dbUrl.includes(":543") || /:\d{4,5}/.test(dbUrl),
    DATABASE_URL_ends_with: dbUrl.slice(-30),
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET_exists: !!process.env.NEXTAUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV
  })
}