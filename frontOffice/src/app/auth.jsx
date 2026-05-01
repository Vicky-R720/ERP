/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from 'react'

const AuthContext = createContext(null)

const STORAGE_KEY = 'templ.erp.auth'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw)
      return parsed?.user ?? null
    } catch {
      return null
    }
  })

  const value = useMemo(() => {
    return {
      user,
      isAuthenticated: Boolean(user),
      login: async ({ email }) => {
        const nextUser = { id: 'demo', name: email?.split('@')[0] || 'User', email }
        setUser(nextUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser }))
      },
      logout: () => {
        setUser(null)
        localStorage.removeItem(STORAGE_KEY)
      },
    }
  }, [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
