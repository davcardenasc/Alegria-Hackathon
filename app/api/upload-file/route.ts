import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import path from "path"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file provided" },
        { status: 400 }
      )
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, message: "File too large. Maximum size is 5MB." },
        { status: 400 }
      )
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg", 
      "image/png",
      "image/gif",
      "image/webp",
      "application/pdf"
    ]
    
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, message: "Invalid file type. Only images and PDFs are allowed." },
        { status: 400 }
      )
    }

    // Generate unique filename with timestamp
    const timestamp = Date.now()
    const originalName = file.name
    const extension = path.extname(originalName)
    const nameWithoutExt = path.basename(originalName, extension)
    const safeFileName = `${nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '_')}_${timestamp}${extension}`

    // Upload to Vercel Blob Storage
    console.log(`Uploading file to Vercel Blob: ${safeFileName}`)
    
    const blob = await put(`id-documents/${safeFileName}`, file, {
      access: 'public',
      token: process.env.BLOB_READ_WRITE_TOKEN
    })

    console.log(`File uploaded successfully to Vercel Blob: ${blob.url}`)

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully to Vercel Blob Storage",
      url: blob.url,
      filename: safeFileName,
      originalName: originalName,
      size: file.size,
      type: file.type,
      downloadUrl: blob.downloadUrl
    })

  } catch (error) {
    console.error("Vercel Blob upload error:", error)
    return NextResponse.json(
      { 
        success: false, 
        message: "Error uploading file to Vercel Blob Storage",
        error: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    )
  }
}