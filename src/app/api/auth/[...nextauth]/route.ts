// Mock NextAuth types - No actual dependency needed

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare module 'next-auth' {
  interface User {
    id?: string
    name?: string | null
    email?: string | null
    role?: string
  }
  
  interface Session {
    user: {
      id?: string
      name?: string | null
      email?: string | null
      role?: string
    }
    expires?: string
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    id?: string
    name?: string
    email?: string
  }
}