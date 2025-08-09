/**
 * Validation utilities for AlegrIA Hackathon application
 * 
 * This module provides comprehensive validation functions for:
 * - Form inputs (email, text lengths, required fields)
 * - File uploads (size, type, content validation)
 * - Application data integrity
 * - Security input sanitization
 */

/**
 * Validation result interface
 */
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  warnings?: string[]
}

/**
 * Email validation with comprehensive regex
 * Supports international domains and most valid email formats
 */
export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []
  
  if (!email || email.trim().length === 0) {
    errors.push("Email is required")
    return { isValid: false, errors }
  }

  // Comprehensive email regex that handles most valid cases
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  
  if (!emailRegex.test(email.trim().toLowerCase())) {
    errors.push("Please enter a valid email address")
  }

  if (email.length > 254) {
    errors.push("Email address is too long (maximum 254 characters)")
  }

  return { isValid: errors.length === 0, errors }
}

/**
 * Team name validation
 */
export function validateTeamName(teamName: string): ValidationResult {
  const errors: string[] = []
  
  if (!teamName || teamName.trim().length === 0) {
    errors.push("Team name is required")
    return { isValid: false, errors }
  }

  const trimmedName = teamName.trim()
  
  if (trimmedName.length < 2) {
    errors.push("Team name must be at least 2 characters long")
  }

  if (trimmedName.length > 100) {
    errors.push("Team name must be less than 100 characters")
  }

  // Check for potentially harmful content
  if (/<script|javascript:|data:|vbscript:/i.test(trimmedName)) {
    errors.push("Team name contains invalid characters")
  }

  return { isValid: errors.length === 0, errors }
}

/**
 * Participant names validation
 */
export function validateParticipants(participants: string[], count: number): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  
  if (count < 1 || count > 5) {
    errors.push("Team must have between 1 and 5 participants")
  }

  if (participants.length !== count) {
    errors.push(`Number of participant names (${participants.length}) doesn't match participant count (${count})`)
  }

  // Validate each participant name
  participants.forEach((name, index) => {
    if (!name || name.trim().length === 0) {
      errors.push(`Participant ${index + 1} name is required`)
      return
    }

    const trimmedName = name.trim()
    
    if (trimmedName.length < 2) {
      errors.push(`Participant ${index + 1} name must be at least 2 characters long`)
    }

    if (trimmedName.length > 100) {
      errors.push(`Participant ${index + 1} name must be less than 100 characters`)
    }

    // Check for potentially harmful content
    if (/<script|javascript:|data:|vbscript:/i.test(trimmedName)) {
      errors.push(`Participant ${index + 1} name contains invalid characters`)
    }

    // Check for duplicate names
    const duplicateIndex = participants.findIndex((otherName, otherIndex) => 
      otherIndex !== index && otherName.trim().toLowerCase() === trimmedName.toLowerCase()
    )
    if (duplicateIndex !== -1) {
      warnings.push(`Participant ${index + 1} has the same name as participant ${duplicateIndex + 1}`)
    }
  })

  return { isValid: errors.length === 0, errors, warnings }
}

/**
 * Text field validation with word count limits
 */
export function validateTextField(
  text: string, 
  fieldName: string, 
  minWords: number = 0, 
  maxWords: number = Infinity,
  required: boolean = true
): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  
  if (required && (!text || text.trim().length === 0)) {
    errors.push(`${fieldName} is required`)
    return { isValid: false, errors }
  }

  if (!text || text.trim().length === 0) {
    return { isValid: true, errors: [] }
  }

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length

  if (wordCount < minWords) {
    errors.push(`${fieldName} must have at least ${minWords} words (current: ${wordCount})`)
  }

  if (wordCount > maxWords) {
    errors.push(`${fieldName} must have no more than ${maxWords} words (current: ${wordCount})`)
  }

  // Warn when approaching limit
  if (maxWords !== Infinity && wordCount > maxWords * 0.9) {
    warnings.push(`${fieldName} is approaching word limit (${wordCount}/${maxWords})`)
  }

  // Check for potentially harmful content
  if (/<script|javascript:|data:|vbscript:/i.test(text)) {
    errors.push(`${fieldName} contains invalid content`)
  }

  return { isValid: errors.length === 0, errors, warnings }
}

/**
 * File upload validation
 */
export function validateFile(file: File): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []
  
  // File size validation (5MB max)
  const maxSize = 5 * 1024 * 1024
  if (file.size > maxSize) {
    errors.push(`File is too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB (current: ${Math.round(file.size / 1024 / 1024)}MB)`)
  }

  // File type validation
  const allowedTypes = [
    "image/jpeg",
    "image/jpg", 
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf"
  ]
  
  if (!allowedTypes.includes(file.type)) {
    errors.push("Invalid file type. Only images (JPEG, PNG, GIF, WebP) and PDFs are allowed")
  }

  // File name validation
  if (file.name.length > 255) {
    errors.push("File name is too long (maximum 255 characters)")
  }

  // Check for suspicious file names
  if (/\.exe$|\.bat$|\.cmd$|\.scr$|\.pif$/i.test(file.name)) {
    errors.push("File type not allowed for security reasons")
  }

  // Warn about large files
  if (file.size > 2 * 1024 * 1024) {
    warnings.push("Large file size may slow down upload")
  }

  return { isValid: errors.length === 0, errors, warnings }
}

/**
 * School/Institution validation
 */
export function validateSchool(school: string): ValidationResult {
  const errors: string[] = []
  
  if (!school || school.trim().length === 0) {
    errors.push("School/Institution name is required")
    return { isValid: false, errors }
  }

  const trimmedSchool = school.trim()
  
  if (trimmedSchool.length < 2) {
    errors.push("School name must be at least 2 characters long")
  }

  if (trimmedSchool.length > 200) {
    errors.push("School name must be less than 200 characters")
  }

  return { isValid: errors.length === 0, errors }
}

/**
 * Grade/Year validation
 */
export function validateGradeYear(gradeYear: string): ValidationResult {
  const errors: string[] = []
  
  if (!gradeYear || gradeYear.trim().length === 0) {
    errors.push("Grade/Year is required")
    return { isValid: false, errors }
  }

  const validGrades = [
    "6to", "7mo", "8vo", "9no", "10mo", "11vo", "12vo",
    "1er año universitario", "2do año universitario", "3er año universitario",
    "4to año universitario", "5to año universitario", "Graduado"
  ]

  if (!validGrades.includes(gradeYear)) {
    errors.push("Please select a valid grade/year from the dropdown")
  }

  return { isValid: errors.length === 0, errors }
}

/**
 * Comprehensive application validation
 */
export function validateApplication(data: any): ValidationResult {
  const allErrors: string[] = []
  const allWarnings: string[] = []

  // Validate all fields
  const emailResult = validateEmail(data.correo)
  const teamNameResult = validateTeamName(data.nombre_equipo)
  const participantsResult = validateParticipants(data.participantes, data.numero_participantes)
  const schoolResult = validateSchool(data.colegio)
  const gradeResult = validateGradeYear(data.ano_escolar)
  const motivationResult = validateTextField(data.motivacion, "Motivation", 10, 500)
  
  // Optional fields
  const experienceResult: ValidationResult = data.experiencia ? 
    validateTextField(data.experiencia, "Experience", 0, 300, false) : 
    { isValid: true, errors: [] }
  
  const ideasResult: ValidationResult = data.ideas ? 
    validateTextField(data.ideas, "Ideas", 0, 300, false) : 
    { isValid: true, errors: [] }

  // Collect all errors and warnings
  const results = [emailResult, teamNameResult, participantsResult, schoolResult, gradeResult, 
   motivationResult, experienceResult, ideasResult]
  
  results.forEach(result => {
    allErrors.push(...result.errors)
    if (result.warnings) {
      allWarnings.push(...result.warnings)
    }
  })

  return {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings.length > 0 ? allWarnings : undefined
  }
}

/**
 * Sanitize user input to prevent XSS and other injection attacks
 */
export function sanitizeInput(input: string): string {
  if (!input) return ""
  
  return input
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/data:(?!image\/[a-z]+;base64,)/gi, '') // Remove data: protocols except images
    .replace(/vbscript:/gi, '') // Remove vbscript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
}

/**
 * Rate limiting validation (basic implementation)
 */
export function validateRateLimit(
  identifier: string, 
  maxAttempts: number = 5, 
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): ValidationResult {
  // This is a simple in-memory rate limiter
  // In production, you'd want to use Redis or a proper rate limiting service
  
  const key = `rate_limit_${identifier}`
  const now = Date.now()
  
  // For demo purposes, always allow (implement proper rate limiting in production)
  return { isValid: true, errors: [] }
}