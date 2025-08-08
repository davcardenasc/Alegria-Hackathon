import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export async function GET() {
  try {
    // Run prisma db push to create the database schema
    const { stdout, stderr } = await execAsync("npx prisma db push --accept-data-loss")
    
    return NextResponse.json({
      success: true,
      message: "Database schema created successfully",
      output: stdout,
      errors: stderr
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