'use client'

import { useState, useEffect } from 'react'

// Simple user type
type User = {
  id: string
  name: string
  email: string
  isAdmin: boolean
}

// Hardcoded users for demo
const DEMO_USERS = [
  { id: '1', name: 'Hafiz Sajid Syed', email: 'sajid.syed@gmail.com', password: 'admin123', isAdmin: true },
  { id: '2', name: 'John Doe', email: 'john@example.com', password: 'user123', isAdmin: false },
]

// Main auth hook
export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('auth_user')
    if (saved) {
      setUser(JSON.parse(saved))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true)
    
    // Simulate API delay
    await new Promise(r => setTimeout(r, 800))
    
    const found = DEMO_USERS.find(u => u.email === email && u.password === password)
    
    if (found) {
      const { password: _, ...userData } = found
      setUser(userData)
      localStorage.setItem('auth_user', JSON.stringify(userData))
      setLoading(false)
      return { success: true, error: null }
    }
    
    setLoading(false)
    return { success: false, error: 'Invalid email or password' }
  }

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true)
    
    await new Promise(r => setTimeout(r, 800))
    
    const exists = DEMO_USERS.some(u => u.email === email)
    if (exists) {
      setLoading(false)
      return { success: false, error: 'Email already exists' }
    }
    
    const newUser = { id: Date.now().toString(), name, email, isAdmin: false }
    setUser(newUser)
    localStorage.setItem('auth_user', JSON.stringify(newUser))
    setLoading(false)
    return { success: true, error: null }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    login,
    register,
    logout
  }
}