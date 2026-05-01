import { Link, useParams } from 'react-router-dom'
import { Card } from '../../components/ui/Card.jsx'
import { Button } from '../../components/ui/Button.jsx'

export function UserDetails() {
  const { userId } = useParams()

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">User details</h1>
        <p className="page__muted">User ID: {userId}</p>

        <div className="page__actions">
          <Button as={Link} to={`/admin/users/${userId}/edit`}>
            Edit
          </Button>
          <Button as={Link} to="/admin/users" variant="secondary">
            Back
          </Button>
        </div>
      </Card>
    </div>
  )
}
