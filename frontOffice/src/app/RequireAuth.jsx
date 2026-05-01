import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './auth.jsx'

export function RequireAuth() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  return <Outlet />
}
