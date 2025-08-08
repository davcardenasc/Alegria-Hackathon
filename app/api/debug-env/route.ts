import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    DATABASE_URL_exists: !!process.env.DATABASE_URL,
    DATABASE_URL_starts_with: process.env.DATABASE_URL?.substring(0, 20) + "...",
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET_exists: !!process.env.NEXTAUTH_SECRET,
    NODE_ENV: process.env.NODE_ENV
  })
}