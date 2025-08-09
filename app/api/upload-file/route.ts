import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import path from "path"
import { validateFile } from "@/lib/validation"
import { createErrorResponse, createSuccessResponse, withErrorHandler, FileUploadError, ErrorLogger } from "@/lib/error-handling"

const uploadHandler = async (request: NextRequest) => {
  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file) {
    throw new FileUploadError("No file provided")
  }

  // Use comprehensive validation from validation utilities
  const validationResult = validateFile(file)
  if (!validationResult.isValid) {
    throw new FileUploadError(validationResult.errors.join(", "), {
      validationErrors: validationResult.errors,
      warnings: validationResult.warnings
    })
  }

  // Log warnings if any
  if (validationResult.warnings && validationResult.warnings.length > 0) {
    ErrorLogger.log(
      new Error("File upload warnings"),
      { warnings: validationResult.warnings, fileName: file.name }
    )
  }

  // Generate unique filename with timestamp
  const timestamp = Date.now()
  const originalName = file.name
  const extension = path.extname(originalName)
  const nameWithoutExt = path.basename(originalName, extension)
  const safeFileName = `${nameWithoutExt.replace(/[^a-zA-Z0-9-_]/g, '_')}_${timestamp}${extension}`

  // Upload to Vercel Blob Storage
  const blob = await put(`id-documents/${safeFileName}`, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN
  })

  return createSuccessResponse({
    url: blob.url,
    filename: safeFileName,
    originalName: originalName,
    size: file.size,
    type: file.type,
    downloadUrl: blob.downloadUrl
  }, "File uploaded successfully to Vercel Blob Storage")
}

export const POST = withErrorHandler(uploadHandler)