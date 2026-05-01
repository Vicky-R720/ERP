import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card.jsx'
import { Button } from '../components/ui/Button.jsx'

export function NotFound() {
  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Page not found</h1>
        <p className="page__muted">The page you requested does not exist.</p>
        <div className="page__actions">
          <Button as={Link} to="/">
            Go to dashboard
          </Button>
        </div>
      </Card>
    </div>
  )
}
