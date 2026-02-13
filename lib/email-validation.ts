import validator from 'validator'

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export function validateEmail(email: string): ValidationResult {
  const errors: string[] = []

  if (!email || email.trim().length === 0) {
    errors.push('Email is required')
    return { isValid: false, errors }
  }

  if (email.length > 254) {
    errors.push('Email address is too long (max 254 characters)')
  }

  if (!validator.isEmail(email)) {
    errors.push('Invalid email format')
  }

  // Check for common disposable email domains (optional, can be expanded)
  const disposableDomains = [
    'tempmail.com',
    'guerrillamail.com',
    'mailinator.com',
    '10minutemail.com',
  ]
  const domain = email.split('@')[1]?.toLowerCase()
  if (domain && disposableDomains.includes(domain)) {
    errors.push('Disposable email addresses are not allowed')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export function sanitizeInput(input: string, maxLength: number): string {
  // Remove potentially dangerous characters and trim
  let sanitized = input.trim()
  
  // Remove null bytes and control characters (except newlines and tabs)
  sanitized = sanitized.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '')
  
  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength)
  }
  
  return sanitized
}

export function validateContactForm(data: {
  name: string
  email: string
  projectType: string
  message: string
}): ValidationResult {
  const errors: string[] = []

  // Validate name
  const sanitizedName = sanitizeInput(data.name, 100)
  if (!sanitizedName || sanitizedName.length < 2) {
    errors.push('Name must be at least 2 characters long')
  }
  if (sanitizedName.length > 100) {
    errors.push('Name is too long (max 100 characters)')
  }

  // Validate email
  const emailValidation = validateEmail(data.email)
  if (!emailValidation.isValid) {
    errors.push(...emailValidation.errors)
  }

  // Validate project type (optional field)
  if (data.projectType && data.projectType.length > 50) {
    errors.push('Project type is too long')
  }

  // Validate message
  const sanitizedMessage = sanitizeInput(data.message, 2000)
  if (!sanitizedMessage || sanitizedMessage.length < 10) {
    errors.push('Message must be at least 10 characters long')
  }
  if (sanitizedMessage.length > 2000) {
    errors.push('Message is too long (max 2000 characters)')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
