import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Input } from '../ui/Input.jsx'
import { Button } from '../ui/Button.jsx'
import { useAuth } from '../../app/auth.jsx'

function pathToTitle(pathname) {
  if (pathname === '/') return 'Dashboard'
  const last = pathname.split('/').filter(Boolean).slice(-1)[0] ?? ''
  return last
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (m) => m.toUpperCase())
}

export function Topbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const title = pathToTitle(location.pathname)

  return (
    <header className="topbar">
      <div className="topbar__left">
        <div className="topbar__title">{title}</div>
      </div>

      <div className="topbar__center" role="search">
        <Input
          aria-label="Global search"
          placeholder="Search…"
          onChange={() => {}}
        />
      </div>

      <div className="topbar__right">
        <Link className="topbar__link" to="/profile">
          {user?.name ?? 'Guest'}
        </Link>
        <Button
          variant="ghost"
          onClick={() => {
            logout()
            navigate('/auth/login')
          }}
        >
          Log out
        </Button>
      </div>
    </header>
  )
}
