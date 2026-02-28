// ========== USER CORE TYPES ==========

/**
 * User role types
 */
export type UserRole = 'user' | 'admin' | 'moderator' | 'vendor'

/**
 * User status
 */
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending'

/**
 * Main user type
 */
export type User = {
  id: string                     // Unique user ID
  name: string                   // Full name
  email: string                  // Email address (unique)
  role: UserRole                 // User role
  status: UserStatus             // Account status
  
  // Profile
  avatar?: string                // Profile picture URL
  phone?: string                 // Phone number
  bio?: string                   // Short biography
  dateOfBirth?: string           // Date of birth
  
  // Addresses
  addresses?: Address[]          // Saved addresses
  
  // Account dates
  emailVerified?: string         // Email verification date
  createdAt: string              // Account creation date
  updatedAt: string              // Last update date
  lastLogin?: string             // Last login date
  lastActive?: string            // Last activity date
  
  // Preferences
  preferences?: UserPreferences  // User preferences
  
  // Statistics
  stats?: UserStats              // User statistics
  
  // Metadata
  metadata?: Record<string, any> // Additional data
}

// ========== USER PREFERENCES ==========

/**
 * User preferences
 */
export type UserPreferences = {
  theme?: 'light' | 'dark' | 'system'  // UI theme
  language?: string                     // Preferred language
  currency?: string                     // Preferred currency
  timezone?: string                     // User timezone
  
  // Notifications
  emailNotifications?: boolean          // Receive email notifications
  pushNotifications?: boolean           // Receive push notifications
  smsNotifications?: boolean            // Receive SMS notifications
  
  // Marketing
  newsletter?: boolean                  // Subscribe to newsletter
  promotionalEmails?: boolean           // Receive promotional emails
  
  // Privacy
  profileVisibility?: 'public' | 'private' | 'contacts'  // Profile visibility
  showEmail?: boolean                   // Show email publicly
  
  // Display
  itemsPerPage?: number                 // Items per page in listings
  sortBy?: string                       // Default sort preference
}

// ========== USER ADDRESS ==========

/**
 * Address type
 */
export type Address = {
  id: string
  type: 'shipping' | 'billing' | 'both'
  isDefault: boolean
  
  // Address fields
  fullName: string
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
  
  // Metadata
  createdAt: string
  updatedAt?: string
}

// ========== USER STATISTICS ==========

/**
 * User statistics
 */
export type UserStats = {
  // Orders
  totalOrders: number
  totalSpent: number
  averageOrderValue: number
  lastOrderDate?: string
  
  // Wishlist
  wishlistCount: number
  
  // Reviews
  reviewsCount: number
  averageRating: number
  
  // Account
  accountAge: number              // Days since creation
  loginCount: number              // Number of logins
  sessionCount: number            // Number of sessions (FIXED: Added this field)
  
  // Activity
  lastActive: string
}

// ========== USER SESSION ==========

/**
 * User session
 */
export type UserSession = {
  id: string
  userId: string
  token: string
  ipAddress?: string
  userAgent?: string
  device?: string
  location?: string
  createdAt: string
  expiresAt: string
  lastActive: string
}

// ========== USER SUMMARY ==========

/**
 * User summary (for listings)
 */
export type UserSummary = {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  avatar?: string
  createdAt: string
  lastLogin?: string
  orderCount: number
  totalSpent: number
}

// ========== AUTH TYPES ==========

/**
 * Login credentials
 */
export type LoginCredentials = {
  email: string
  password: string
  remember?: boolean
}

/**
 * Registration data
 */
export type RegisterData = {
  name: string
  email: string
  password: string
  confirmPassword?: string
  acceptTerms?: boolean
}

/**
 * Password reset request
 */
export type PasswordResetRequest = {
  email: string
}

/**
 * Password reset confirmation
 */
export type PasswordResetConfirm = {
  token: string
  newPassword: string
  confirmPassword: string
}

/**
 * Email verification
 */
export type EmailVerification = {
  token: string
}

// ========== USER FILTERS ==========

/**
 * User filter options
 */
export type UserFilters = {
  role?: UserRole | 'all'
  status?: UserStatus | 'all'
  search?: string
  dateFrom?: string
  dateTo?: string
  verified?: boolean
  hasOrders?: boolean
}

// ========== USER SORTING ==========

/**
 * User sort options
 */
export type UserSortOptions = {
  field: 'name' | 'email' | 'role' | 'status' | 'createdAt' | 'lastLogin'
  direction: 'asc' | 'desc'
}

// ========== API RESPONSES ==========

/**
 * API response for single user
 */
export type UserResponse = {
  success: boolean
  user?: User
  error?: string
}

/**
 * API response for multiple users
 */
export type UsersResponse = {
  success: boolean
  users: UserSummary[]
  total: number
  page: number
  limit: number
  totalPages: number
  error?: string
}

/**
 * Auth response
 */
export type AuthResponse = {
  success: boolean
  user?: User
  token?: string
  error?: string
  requiresTwoFactor?: boolean
}

// ========== HELPER FUNCTIONS ==========

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin'
}

/**
 * Check if user is moderator
 */
export function isModerator(user: User | null): boolean {
  return user?.role === 'moderator' || user?.role === 'admin'
}

/**
 * Check if user is vendor
 */
export function isVendor(user: User | null): boolean {
  return user?.role === 'vendor'
}

/**
 * Check if user is active
 */
export function isActive(user: User | null): boolean {
  return user?.status === 'active'
}

/**
 * Get user display name
 */
export function getUserDisplayName(user: User | null): string {
  if (!user) return 'Guest'
  return user.name || user.email.split('@')[0]
}

/**
 * Get user initials
 */
export function getUserInitials(user: User | null): string {
  if (!user || !user.name) return '?'
  
  const parts = user.name.split(' ').filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

/**
 * Get user avatar URL
 */
export function getUserAvatar(user: User | null, size: number = 40): string {
  if (!user) return `https://ui-avatars.com/api/?name=Guest&size=${size}`
  
  const name = encodeURIComponent(user.name || 'User')
  return `https://ui-avatars.com/api/?name=${name}&size=${size}&background=random`
}

/**
 * Format user role for display
 */
export function formatUserRole(role: UserRole): string {
  const roles: Record<UserRole, string> = {
    user: 'User',
    admin: 'Administrator',
    moderator: 'Moderator',
    vendor: 'Vendor'
  }
  return roles[role] || role
}

/**
 * Format user status for display
 */
export function formatUserStatus(status: UserStatus): string {
  const statuses: Record<UserStatus, string> = {
    active: 'Active',
    inactive: 'Inactive',
    suspended: 'Suspended',
    pending: 'Pending Verification'
  }
  return statuses[status] || status
}

/**
 * Get status color
 */
export function getUserStatusColor(status: UserStatus): string {
  switch(status) {
    case 'active': return 'green'
    case 'inactive': return 'gray'
    case 'suspended': return 'red'
    case 'pending': return 'yellow'
    default: return 'gray'
  }
}

/**
 * Get role color
 */
export function getUserRoleColor(role: UserRole): string {
  switch(role) {
    case 'admin': return 'purple'
    case 'moderator': return 'blue'
    case 'vendor': return 'orange'
    case 'user': return 'green'
    default: return 'gray'
  }
}

/**
 * Filter users by criteria
 */
export function filterUsers(users: User[], filters: UserFilters): User[] {
  return users.filter(user => {
    // Role filter
    if (filters.role && filters.role !== 'all' && user.role !== filters.role) {
      return false
    }

    // Status filter
    if (filters.status && filters.status !== 'all' && user.status !== filters.status) {
      return false
    }

    // Search filter
    if (filters.search) {
      const search = filters.search.toLowerCase()
      const matches = 
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.phone?.toLowerCase().includes(search)
      
      if (!matches) return false
    }

    // Date range filter
    if (filters.dateFrom && new Date(user.createdAt) < new Date(filters.dateFrom)) {
      return false
    }
    if (filters.dateTo && new Date(user.createdAt) > new Date(filters.dateTo)) {
      return false
    }

    // Verified filter
    if (filters.verified !== undefined) {
      const isVerified = !!user.emailVerified
      if (isVerified !== filters.verified) return false
    }

    // Has orders filter
    if (filters.hasOrders !== undefined) {
      const hasOrders = (user.stats?.totalOrders || 0) > 0
      if (hasOrders !== filters.hasOrders) return false
    }

    return true
  })
}

/**
 * Sort users
 */
export function sortUsers(users: User[], { field, direction }: UserSortOptions): User[] {
  return [...users].sort((a, b) => {
    let comparison = 0
    
    switch(field) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'email':
        comparison = a.email.localeCompare(b.email)
        break
      case 'role':
        comparison = a.role.localeCompare(b.role)
        break
      case 'status':
        comparison = a.status.localeCompare(b.status)
        break
      case 'createdAt':
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        break
      case 'lastLogin':
        const aTime = a.lastLogin ? new Date(a.lastLogin).getTime() : 0
        const bTime = b.lastLogin ? new Date(b.lastLogin).getTime() : 0
        comparison = aTime - bTime
        break
      default:
        comparison = 0
    }
    
    return direction === 'asc' ? comparison : -comparison
  })
}

/**
 * Calculate user statistics
 */
export function calculateUserStats(user: User, orders: any[] = []): UserStats {
  const totalOrders = orders.length
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0)
  const lastOrderDate = orders.length > 0 
    ? orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
    : undefined

  const accountAge = Math.floor(
    (new Date().getTime() - new Date(user.createdAt).getTime()) / (1000 * 60 * 60 * 24)
  )

  return {
    totalOrders,
    totalSpent,
    averageOrderValue: totalOrders > 0 ? totalSpent / totalOrders : 0,
    lastOrderDate,
    wishlistCount: 0, // Would come from wishlist data
    reviewsCount: 0, // Would come from reviews data
    averageRating: 0,
    accountAge,
    loginCount: 0, // Would come from session data
    sessionCount: 0, // FIXED: Added sessionCount
    lastActive: user.lastActive || user.lastLogin || user.createdAt
  }
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Validate password strength
 */
export function isStrongPassword(password: string): {
  isValid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// ========== CONSTANTS ==========

/**
 * User roles
 */
export const USER_ROLES: UserRole[] = ['user', 'admin', 'moderator', 'vendor']

/**
 * User statuses
 */
export const USER_STATUSES: UserStatus[] = ['active', 'inactive', 'suspended', 'pending']

/**
 * Role labels
 */
export const ROLE_LABELS: Record<UserRole, string> = {
  user: 'User',
  admin: 'Administrator',
  moderator: 'Moderator',
  vendor: 'Vendor'
}

/**
 * Status labels
 */
export const STATUS_LABELS: Record<UserStatus, string> = {
  active: 'Active',
  inactive: 'Inactive',
  suspended: 'Suspended',
  pending: 'Pending Verification'
}

/**
 * Role icons
 */
export const ROLE_ICONS: Record<UserRole, string> = {
  user: '👤',
  admin: '👑',
  moderator: '🛡️',
  vendor: '🏪'
}

/**
 * Status icons
 */
export const STATUS_ICONS: Record<UserStatus, string> = {
  active: '✅',
  inactive: '⏸️',
  suspended: '🚫',
  pending: '⏳'
}

/**
 * Default user preferences
 */
export const DEFAULT_PREFERENCES: UserPreferences = {
  theme: 'system',
  language: 'en',
  currency: 'USD',
  emailNotifications: true,
  pushNotifications: true,
  smsNotifications: false,
  newsletter: false,
  promotionalEmails: false,
  profileVisibility: 'private',
  showEmail: false,
  itemsPerPage: 20,
  sortBy: 'newest'
}

// ========== EXPORT ALL ==========

export default {
  // Functions
  isAdmin,
  isModerator,
  isVendor,
  isActive,
  getUserDisplayName,
  getUserInitials,
  getUserAvatar,
  formatUserRole,
  formatUserStatus,
  getUserStatusColor,
  getUserRoleColor,
  filterUsers,
  sortUsers,
  calculateUserStats,
  isValidEmail,
  isStrongPassword,
  
  // Constants
  USER_ROLES,
  USER_STATUSES,
  ROLE_LABELS,
  STATUS_LABELS,
  ROLE_ICONS,
  STATUS_ICONS,
  DEFAULT_PREFERENCES
}