import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { Card } from '../../components/ui/Card.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useAuth } from '../../app/auth.jsx'

export function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [email, setEmail] = useState('admin@demo.local')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname ?? '/'

  return (
    <div className="auth">
      <Card className="auth__card">
        <h1 className="page__title">Login</h1>
        <p className="page__muted">Sign in to access the ERP.</p>

        <form
          className="form"
          onSubmit={async (e) => {
            e.preventDefault()
            setLoading(true)
            try {
              await login({ email, password, remember })
              navigate(from, { replace: true })
            } finally {
              setLoading(false)
            }
          }}
        >
          <label className="label">
            Email
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              autoComplete="email"
              required
            />
          </label>

          <label className="label">
            Password
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              autoComplete="current-password"
              required
            />
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Remember me
          </label>

          <Button type="submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>

          <div className="auth__links">
            <Link to="/auth/forgot">Forgot password?</Link>
            <span>•</span>
            <Link to="/auth/register">Create account</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
