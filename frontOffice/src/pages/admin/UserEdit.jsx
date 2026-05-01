import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card } from '../../components/ui/Card.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Select } from '../../components/ui/Select.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useToast } from '../../app/toast.jsx'

export function UserEdit() {
  const { userId } = useParams()
  const navigate = useNavigate()
  const { push } = useToast()

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Edit user</h1>
        <p className="page__muted">User ID: {userId}</p>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            push({ title: 'User updated (demo)', message: userId, tone: 'success' })
            navigate(`/admin/users/${userId}`)
          }}
        >
          <label className="label">
            Name
            <Input defaultValue="User" required />
          </label>
          <label className="label">
            Email
            <Input type="email" defaultValue="user@company.local" required />
          </label>
          <label className="label">
            Role
            <Select defaultValue="Viewer">
              <option>Admin</option>
              <option>Manager</option>
              <option>Editor</option>
              <option>Viewer</option>
            </Select>
          </label>

          <div className="page__actions">
            <Button type="submit">Save</Button>
            <Button as={Link} to={`/admin/users/${userId}`} variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
