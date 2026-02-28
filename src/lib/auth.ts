// Simple auth utilities
// No React, just pure TypeScript functions

// Types
export type User = {
  id: string
  name: string
  email: string
  role: 'user' | 'admin'
  createdAt?: string
  lastLogin?: string
}

export type LoginCredentials = {
  email: string
  password: string
}

export type RegisterData = {
  name: string
  email: string
  password: string
}

// Mock users database (in real app, this would be in a real database)
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: '1',
    name: 'Hafiz Sajid Syed',
    email: 'sajid.syed@gmail.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '2',
    name: 'hafiz sajid',
    email: 'hafizsajid@gmail.com',
    password: 'admin123',
    role: 'admin',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  },
  {
    id: '3',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'user123',
    role: 'user',
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }
]

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// ========== AUTH FUNCTIONS ==========

/**
 * Login user with email and password
 */
export async function loginUser(credentials: LoginCredentials): Promise<{ user: User | null; error: string | null }> {
  await delay(800) // Simulate network delay

  const { email, password } = credentials

  // Find user
  const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())

  // Check password
  if (!user || user.password !== password) {
    return { user: null, error: 'Invalid email or password' }
  }

  // Update last login
  user.lastLogin = new Date().toISOString()

  // Return user without password
  const { password: _, ...userWithoutPassword } = user
  return { user: userWithoutPassword, error: null }
}

/**
 * Register new user
 */
export async function registerUser(data: RegisterData): Promise<{ user: User | null; error: string | null }> {
  await delay(1000) // Simulate network delay

  const { name, email, password } = data

  // Validate
  if (!name || !email || !password) {
    return { user: null, error: 'All fields are required' }
  }

  if (password.length < 6) {
    return { user: null, error: 'Password must be at least 6 characters' }
  }

  // Check if user exists
  const exists = MOCK_USERS.some(u => u.email.toLowerCase() === email.toLowerCase())
  if (exists) {
    return { user: null, error: 'User already exists' }
  }

  // Create new user
  const newUser = {
    id: `user-${Date.now()}`,
    name,
    email,
    password, // In real app, hash this!
    role: 'user' as const,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  }

  // In real app, save to database
  MOCK_USERS.push(newUser)

  // Return user without password
  const { password: _, ...userWithoutPassword } = newUser
  return { user: userWithoutPassword, error: null }
}

/**
 * Logout user (client-side only)
 */
export function logoutUser(): void {
  // In real app, might call API to invalidate token
  // For now, just client-side
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('auth_token')
    sessionStorage.removeItem('auth_user')
    sessionStorage.removeItem('auth_token')
  }
}

// ========== TOKEN FUNCTIONS ==========

/**
 * Generate a simple mock token
 */
export function generateToken(userId: string): string {
  return Buffer.from(`${userId}-${Date.now()}-${Math.random()}`).toString('base64')
}

/**
 * Verify token (mock)
 */
export function verifyToken(token: string): { valid: boolean; userId?: string } {
  try {
    // In real app, verify JWT
    // For mock, just check if it exists
    if (!token) return { valid: false }
    
    // Try to decode (very simple mock)
    const decoded = Buffer.from(token, 'base64').toString()
    const parts = decoded.split('-')
    
    return { valid: true, userId: parts[0] }
  } catch {
    return { valid: false }
  }
}

// ========== STORAGE FUNCTIONS ==========

/**
 * Save auth data to storage
 */
export function saveAuthToStorage(user: User, token: string, remember: boolean = false): void {
  if (typeof window === 'undefined') return
  
  const storage = remember ? localStorage : sessionStorage
  storage.setItem('auth_user', JSON.stringify(user))
  storage.setItem('auth_token', token)
}

/**
 * Load auth data from storage
 */
export function loadAuthFromStorage(): { user: User | null; token: string | null } {
  if (typeof window === 'undefined') {
    return { user: null, token: null }
  }

  // Check localStorage first
  let user = localStorage.getItem('auth_user')
  let token = localStorage.getItem('auth_token')

  // Then check sessionStorage
  if (!user || !token) {
    user = sessionStorage.getItem('auth_user')
    token = sessionStorage.getItem('auth_token')
  }

  return {
    user: user ? JSON.parse(user) : null,
    token: token || null
  }
}

/**
 * Clear auth data from storage
 */
export function clearAuthStorage(): void {
  if (typeof window === 'undefined') return
  
  localStorage.removeItem('auth_user')
  localStorage.removeItem('auth_token')
  sessionStorage.removeItem('auth_user')
  sessionStorage.removeItem('auth_token')
}

// ========== USER FUNCTIONS ==========

/**
 * Get user by ID (mock)
 */
export function getUserById(id: string): User | null {
  const user = MOCK_USERS.find(u => u.id === id)
  if (!user) return null
  
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

/**
 * Get user by email (mock)
 */
export function getUserByEmail(email: string): User | null {
  const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) return null
  
  const { password: _, ...userWithoutPassword } = user
  return userWithoutPassword
}

/**
 * Update user profile (mock)
 */
export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<{ user: User | null; error: string | null }> {
  await delay(500)

  const userIndex = MOCK_USERS.findIndex(u => u.id === userId)
  if (userIndex === -1) {
    return { user: null, error: 'User not found' }
  }

  // Update user
  MOCK_USERS[userIndex] = { ...MOCK_USERS[userIndex], ...updates }

  const { password: _, ...userWithoutPassword } = MOCK_USERS[userIndex]
  return { user: userWithoutPassword, error: null }
}

// ========== PASSWORD FUNCTIONS ==========

/**
 * Change password (mock)
 */
export async function changeUserPassword(userId: string, oldPassword: string, newPassword: string): Promise<{ success: boolean; error: string | null }> {
  await delay(500)

  const user = MOCK_USERS.find(u => u.id === userId)
  if (!user) {
    return { success: false, error: 'User not found' }
  }

  if (user.password !== oldPassword) {
    return { success: false, error: 'Current password is incorrect' }
  }

  if (newPassword.length < 6) {
    return { success: false, error: 'New password must be at least 6 characters' }
  }

  user.password = newPassword
  return { success: true, error: null }
}

/**
 * Reset password (mock)
 */
export async function resetUserPassword(email: string): Promise<{ success: boolean; error: string | null }> {
  await delay(1000)

  const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
  if (!user) {
    return { success: false, error: 'User not found' }
  }

  // In real app, send reset email
  console.log(`Password reset email sent to ${email}`)
  
  return { success: true, error: null }
}

// ========== ADMIN FUNCTIONS ==========

/**
 * Get all users (admin only)
 */
export function getAllUsers(): User[] {
  return MOCK_USERS.map(({ password, ...user }) => user)
}

/**
 * Delete user (admin only)
 */
export async function deleteUser(userId: string): Promise<{ success: boolean; error: string | null }> {
  await delay(500)

  const userIndex = MOCK_USERS.findIndex(u => u.id === userId)
  if (userIndex === -1) {
    return { success: false, error: 'User not found' }
  }

  MOCK_USERS.splice(userIndex, 1)
  return { success: true, error: null }
}

/**
 * Update user role (admin only)
 */
export async function updateUserRole(userId: string, role: 'user' | 'admin'): Promise<{ success: boolean; error: string | null }> {
  await delay(500)

  const user = MOCK_USERS.find(u => u.id === userId)
  if (!user) {
    return { success: false, error: 'User not found' }
  }

  user.role = role
  return { success: true, error: null }
}

// ========== UTILITY FUNCTIONS ==========

/**
 * Check if user is admin
 */
export function isAdmin(user: User | null): boolean {
  return user?.role === 'admin'
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(user: User | null): boolean {
  return user !== null
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
  
  const parts = user.name.split(' ')
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

// ========== SESSION FUNCTIONS ==========

/**
 * Check if session is valid (mock)
 */
export function isSessionValid(token: string | null): boolean {
  if (!token) return false
  return verifyToken(token).valid
}

/**
 * Refresh session (mock)
 */
export async function refreshSession(token: string): Promise<{ token: string | null; error: string | null }> {
  await delay(300)

  const { valid, userId } = verifyToken(token)
  if (!valid || !userId) {
    return { token: null, error: 'Invalid token' }
  }

  const newToken = generateToken(userId)
  return { token: newToken, error: null }
}

// ========== EXPORT DEFAULT ==========

export default {
  loginUser,
  registerUser,
  logoutUser,
  generateToken,
  verifyToken,
  saveAuthToStorage,
  loadAuthFromStorage,
  clearAuthStorage,
  getUserById,
  getUserByEmail,
  updateUserProfile,
  changeUserPassword,
  resetUserPassword,
  getAllUsers,
  deleteUser,
  updateUserRole,
  isAdmin,
  isAuthenticated,
  getUserDisplayName,
  getUserInitials,
  isSessionValid,
  refreshSession
}