// Configuration management for environment variables
export const config = {
  email: {
    apiKey: process.env.RESEND_API_KEY!,
    fromEmail: process.env.FROM_EMAIL || 'noreply@alegriahackaton.com',
    toEmail: process.env.TO_EMAIL || 'info@alegriahackaton.com',
  },
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://alegriahackaton.com',
    deadlineDate: process.env.DEADLINE_DATE || '2024-02-15',
  },
  security: {
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '5'),
    rateLimitWindow: parseInt(process.env.RATE_LIMIT_WINDOW || '3600000'),
  },
} as const

// Validate required environment variables
if (!config.email.apiKey) {
  throw new Error('RESEND_API_KEY is required')
}

export default config