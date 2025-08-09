/**
 * Error handling utilities for AlegrIA Hackathon application
 * 
 * This module provides standardized error handling patterns for:
 * - API route error responses
 * - Client-side error management
 * - User-friendly error messages
 * - Security error logging
 * - Development vs production error handling
 */

import { NextResponse } from "next/server"

/**
 * Standard error response interface
 */
export interface ErrorResponse {
  success: false
  error: {
    code: string
    message: string
    details?: any
    timestamp: string
    requestId?: string
  }
}

/**
 * Standard success response interface
 */
export interface SuccessResponse<T = any> {
  success: true
  data?: T
  message?: string
  timestamp: string
  requestId?: string
}

/**
 * Error severity levels
 */
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium', 
  HIGH = 'high',
  CRITICAL = 'critical'
}

/**
 * Error categories for better organization
 */
export enum ErrorCategory {
  VALIDATION = 'validation',
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  DATABASE = 'database',
  FILE_UPLOAD = 'file_upload',
  EMAIL = 'email',
  EXTERNAL_API = 'external_api',
  INTERNAL = 'internal',
  RATE_LIMIT = 'rate_limit',
  NETWORK = 'network'
}

/**
 * Application error class with enhanced metadata
 */
export class AppError extends Error {
  public readonly code: string
  public readonly statusCode: number
  public readonly severity: ErrorSeverity
  public readonly category: ErrorCategory
  public readonly isOperational: boolean
  public readonly timestamp: string
  public readonly context?: Record<string, any>

  constructor(
    message: string,
    code: string,
    statusCode: number = 500,
    severity: ErrorSeverity = ErrorSeverity.MEDIUM,
    category: ErrorCategory = ErrorCategory.INTERNAL,
    isOperational: boolean = true,
    context?: Record<string, any>
  ) {
    super(message)
    
    this.name = 'AppError'
    this.code = code
    this.statusCode = statusCode
    this.severity = severity
    this.category = category
    this.isOperational = isOperational
    this.timestamp = new Date().toISOString()
    this.context = context

    // Maintains proper stack trace for V8 engines
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AppError)
    }
  }
}

/**
 * Predefined error types for common scenarios
 */
export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(
      message,
      'VALIDATION_ERROR',
      400,
      ErrorSeverity.LOW,
      ErrorCategory.VALIDATION,
      true,
      details
    )
  }
}

export class AuthenticationError extends AppError {
  constructor(message: string = 'Authentication required') {
    super(
      message,
      'AUTHENTICATION_ERROR',
      401,
      ErrorSeverity.MEDIUM,
      ErrorCategory.AUTHENTICATION
    )
  }
}

export class AuthorizationError extends AppError {
  constructor(message: string = 'Insufficient permissions') {
    super(
      message,
      'AUTHORIZATION_ERROR',
      403,
      ErrorSeverity.MEDIUM,
      ErrorCategory.AUTHORIZATION
    )
  }
}

export class DatabaseError extends AppError {
  constructor(message: string, originalError?: Error) {
    super(
      message,
      'DATABASE_ERROR',
      500,
      ErrorSeverity.HIGH,
      ErrorCategory.DATABASE,
      true,
      { originalError: originalError?.message }
    )
  }
}

export class FileUploadError extends AppError {
  constructor(message: string, details?: any) {
    super(
      message,
      'FILE_UPLOAD_ERROR',
      400,
      ErrorSeverity.MEDIUM,
      ErrorCategory.FILE_UPLOAD,
      true,
      details
    )
  }
}

export class RateLimitError extends AppError {
  constructor(message: string = 'Rate limit exceeded') {
    super(
      message,
      'RATE_LIMIT_ERROR',
      429,
      ErrorSeverity.MEDIUM,
      ErrorCategory.RATE_LIMIT
    )
  }
}

/**
 * Error logger with different handling for development vs production
 */
export class ErrorLogger {
  private static isDevelopment = process.env.NODE_ENV === 'development'
  
  /**
   * Log error with appropriate level of detail
   */
  static log(error: Error | AppError, additionalContext?: Record<string, any>) {
    const logData: Record<string, any> = {
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack,
      ...additionalContext
    }

    if (error instanceof AppError) {
      logData.code = error.code
      logData.statusCode = error.statusCode
      logData.severity = error.severity
      logData.category = error.category
      logData.context = error.context
    }

    if (this.isDevelopment) {
      // Detailed logging in development
      console.error('🚨 Application Error:', logData)
    } else {
      // Structured logging for production
      console.error(JSON.stringify(logData))
    }

    // In production, you might want to send to external logging service
    // this.sendToExternalLogger(logData)
  }

  /**
   * Log security-related events
   */
  static logSecurityEvent(event: string, details: Record<string, any>) {
    const logData = {
      timestamp: new Date().toISOString(),
      event,
      severity: ErrorSeverity.HIGH,
      category: 'SECURITY',
      ...details
    }

    console.warn('🔐 Security Event:', JSON.stringify(logData))
    
    // In production, always send security events to monitoring system
    // this.sendToSecurityMonitoring(logData)
  }
}

/**
 * Create standardized error response for API routes
 */
export function createErrorResponse(
  error: Error | AppError,
  requestId?: string
): NextResponse<ErrorResponse> {
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  let statusCode = 500
  let code = 'INTERNAL_SERVER_ERROR'
  let message = 'An internal server error occurred'
  let details: any = undefined

  if (error instanceof AppError) {
    statusCode = error.statusCode
    code = error.code
    message = error.message
    if (isDevelopment) {
      details = {
        severity: error.severity,
        category: error.category,
        context: error.context,
        stack: error.stack
      }
    }
  } else {
    // Handle standard JavaScript errors
    if (isDevelopment) {
      message = error.message
      details = { stack: error.stack }
    }
  }

  // Log the error
  ErrorLogger.log(error, { requestId })

  const response: ErrorResponse = {
    success: false,
    error: {
      code,
      message,
      details,
      timestamp: new Date().toISOString(),
      requestId
    }
  }

  return NextResponse.json(response, { status: statusCode })
}

/**
 * Create standardized success response for API routes
 */
export function createSuccessResponse<T>(
  data?: T,
  message?: string,
  requestId?: string
): NextResponse<SuccessResponse<T>> {
  const response: SuccessResponse<T> = {
    success: true,
    data,
    message,
    timestamp: new Date().toISOString(),
    requestId
  }

  return NextResponse.json(response)
}

/**
 * Async error handler wrapper for API routes
 */
export function withErrorHandler<T extends any[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R | NextResponse<ErrorResponse>> => {
    try {
      return await handler(...args)
    } catch (error) {
      if (error instanceof AppError) {
        return createErrorResponse(error)
      }
      
      // Handle unexpected errors
      const unexpectedError = new AppError(
        'An unexpected error occurred',
        'UNEXPECTED_ERROR',
        500,
        ErrorSeverity.CRITICAL,
        ErrorCategory.INTERNAL,
        false,
        { originalError: error instanceof Error ? error.message : String(error) }
      )
      
      return createErrorResponse(unexpectedError)
    }
  }
}

/**
 * Client-side error handler for fetch requests
 */
export async function handleFetchResponse(response: Response) {
  if (!response.ok) {
    let errorData: any = { message: 'Network error occurred' }
    
    try {
      errorData = await response.json()
    } catch {
      // Response is not JSON, use status text
      errorData = { message: response.statusText || 'Unknown error' }
    }

    throw new Error(errorData.error?.message || errorData.message || 'Request failed')
  }

  return response.json()
}

/**
 * User-friendly error messages for common scenarios
 */
export const USER_ERROR_MESSAGES = {
  NETWORK: 'Unable to connect. Please check your internet connection and try again.',
  TIMEOUT: 'The request took too long. Please try again.',
  SERVER: 'Our servers are experiencing issues. Please try again in a few minutes.',
  VALIDATION: 'Please check your input and try again.',
  FILE_TOO_LARGE: 'The file you selected is too large. Please choose a smaller file.',
  FILE_INVALID_TYPE: 'The file type is not supported. Please select a different file.',
  AUTHENTICATION: 'Please log in to continue.',
  AUTHORIZATION: 'You don\'t have permission to perform this action.',
  RATE_LIMIT: 'Too many requests. Please wait a few minutes before trying again.',
  DEADLINE_PASSED: 'The application deadline has passed.',
  FORM_INCOMPLETE: 'Please fill in all required fields.',
  EMAIL_INVALID: 'Please enter a valid email address.'
} as const

/**
 * Get user-friendly error message
 */
export function getUserFriendlyErrorMessage(error: Error | AppError): string {
  if (error instanceof AppError) {
    switch (error.category) {
      case ErrorCategory.VALIDATION:
        return USER_ERROR_MESSAGES.VALIDATION
      case ErrorCategory.AUTHENTICATION:
        return USER_ERROR_MESSAGES.AUTHENTICATION
      case ErrorCategory.AUTHORIZATION:
        return USER_ERROR_MESSAGES.AUTHORIZATION
      case ErrorCategory.FILE_UPLOAD:
        return error.message // File upload errors are already user-friendly
      case ErrorCategory.RATE_LIMIT:
        return USER_ERROR_MESSAGES.RATE_LIMIT
      default:
        return USER_ERROR_MESSAGES.SERVER
    }
  }

  return USER_ERROR_MESSAGES.SERVER
}