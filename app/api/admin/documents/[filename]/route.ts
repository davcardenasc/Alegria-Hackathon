import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth-config"
import { head } from "@vercel/blob"

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Only allow admins and reviewers to access documents
    if (!session.user.role || !['ADMINISTRATOR', 'REVIEWER'].includes(session.user.role)) {
      return new NextResponse("Forbidden", { status: 403 })
    }

    const filename = params.filename

    // Validate filename to prevent path traversal
    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
      return new NextResponse("Invalid filename", { status: 400 })
    }

    // Get the blob info from Vercel Blob Storage
    const blobPath = `id-documents/${filename}`
    const blob = await head(blobPath, {
      token: process.env.BLOB_READ_WRITE_TOKEN
    })

    if (!blob) {
      return new NextResponse("Document not found", { status: 404 })
    }

    // Return a redirect to the secure signed URL
    // Note: For private blobs, Vercel automatically provides signed URLs
    return NextResponse.redirect(blob.downloadUrl)

  } catch (error) {
    console.error("Error accessing document:", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}