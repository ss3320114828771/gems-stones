// ========== EMAIL VALIDATORS ==========

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate email domain
 */
export function hasValidEmailDomain(email: string, allowedDomains: string[] = []): boolean {
  if (!isValidEmail(email)) return false
  if (allowedDomains.length === 0) return true
  
  const domain = email.split('@')[1]
  return allowedDomains.includes(domain)
}

/**
 * Check if email is disposable/temporary
 */
export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    'tempmail.com', 'throwaway.com', 'mailinator.com',
    'guerrillamail.com', 'sharklasers.com', 'spam4.me',
    'yopmail.com', '10minutemail.com', 'temp-mail.org'
  ]
  
  const domain = email.split('@')[1]
  return disposableDomains.includes(domain)
}

// ========== PASSWORD VALIDATORS ==========

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): {
  isValid: boolean
  errors: string[]
  score: number
} {
  const errors: string[] = []
  let score = 0

  if (!password) {
    errors.push('Password is required')
    return { isValid: false, errors, score }
  }

  // Length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  } else {
    score += 25
  }

  // Uppercase check
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  } else {
    score += 25
  }

  // Lowercase check
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  } else {
    score += 25
  }

  // Number check
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  } else {
    score += 15
  }

  // Special character check
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  } else {
    score += 10
  }

  return {
    isValid: errors.length === 0,
    errors,
    score
  }
}

/**
 * Validate password match
 */
export function doPasswordsMatch(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}

/**
 * Check if password is common/weak
 */
export function isCommonPassword(password: string): boolean {
  const commonPasswords = [
    'password', '123456', '12345678', '1234', 'qwerty',
    'admin', 'letmein', 'welcome', 'monkey', 'password1',
    '12345', 'abc123', 'admin123', 'password123'
  ]
  return commonPasswords.includes(password.toLowerCase())
}

// ========== PHONE VALIDATORS ==========

/**
 * Validate phone number (US format)
 */
export function isValidPhone(phone: string): boolean {
  if (!phone) return false
  
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '')
  
  // Check length (US: 10 digits)
  return cleaned.length === 10
}

/**
 * Format phone number
 */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0,3)}) ${cleaned.slice(3,6)}-${cleaned.slice(6,10)}`
  }
  return phone
}

// ========== URL VALIDATORS ==========

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  if (!url) return false
  
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Validate image URL
 */
export function isValidImageUrl(url: string): boolean {
  if (!isValidUrl(url)) return false
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp']
  const lowerUrl = url.toLowerCase()
  return imageExtensions.some(ext => lowerUrl.endsWith(ext))
}

// ========== NUMBER VALIDATORS ==========

/**
 * Validate if value is a number
 */
export function isNumber(value: any): boolean {
  return typeof value === 'number' && !isNaN(value)
}

/**
 * Validate if value is integer
 */
export function isInteger(value: any): boolean {
  return Number.isInteger(value)
}

/**
 * Validate number range
 */
export function isInRange(value: number, min: number, max: number): boolean {
  return value >= min && value <= max
}

/**
 * Validate positive number
 */
export function isPositive(value: number): boolean {
  return value > 0
}

/**
 * Validate negative number
 */
export function isNegative(value: number): boolean {
  return value < 0
}

// ========== TEXT VALIDATORS ==========

/**
 * Validate required field
 */
export function isRequired(value: any): boolean {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim().length > 0
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.keys(value).length > 0
  return true
}

/**
 * Validate minimum length
 */
export function hasMinLength(value: string, min: number): boolean {
  return value.length >= min
}

/**
 * Validate maximum length
 */
export function hasMaxLength(value: string, max: number): boolean {
  return value.length <= max
}

/**
 * Validate exact length
 */
export function hasExactLength(value: string, length: number): boolean {
  return value.length === length
}

/**
 * Validate matches pattern
 */
export function matchesPattern(value: string, pattern: RegExp): boolean {
  return pattern.test(value)
}

/**
 * Validate alphanumeric only
 */
export function isAlphanumeric(value: string): boolean {
  return /^[a-zA-Z0-9]+$/.test(value)
}

/**
 * Validate letters only
 */
export function isLettersOnly(value: string): boolean {
  return /^[a-zA-Z]+$/.test(value)
}

/**
 * Validate numbers only
 */
export function isNumbersOnly(value: string): boolean {
  return /^\d+$/.test(value)
}

// ========== DATE VALIDATORS ==========

/**
 * Validate if valid date
 */
export function isValidDate(date: any): boolean {
  if (!date) return false
  const d = new Date(date)
  return d instanceof Date && !isNaN(d.getTime())
}

/**
 * Validate if date is in the past
 */
export function isPastDate(date: string | Date): boolean {
  const d = new Date(date)
  const now = new Date()
  return d < now
}

/**
 * Validate if date is in the future
 */
export function isFutureDate(date: string | Date): boolean {
  const d = new Date(date)
  const now = new Date()
  return d > now
}

/**
 * Validate if date is today
 */
export function isToday(date: string | Date): boolean {
  const d = new Date(date)
  const today = new Date()
  return d.toDateString() === today.toDateString()
}

/**
 * Validate age (minimum age)
 */
export function hasMinAge(date: string | Date, minAge: number): boolean {
  const birthDate = new Date(date)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()
  const dayDiff = today.getDate() - birthDate.getDate()
  
  // Adjust age if birthday hasn't occurred this year
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--
  }
  
  return age >= minAge
}