import { Card } from '../components/ui/Card.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Button } from '../components/ui/Button.jsx'
import { useAuth } from '../app/auth.jsx'

export function Profile() {
  const { user } = useAuth()

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">User profile</h1>
        <div className="form">
          <label className="label">
            Name
            <Input defaultValue={user?.name ?? ''} placeholder="Your name" />
          </label>
          <label className="label">
            Email
            <Input defaultValue={user?.email ?? ''} placeholder="email@company.com" />
          </label>
          <div className="page__actions">
            <Button>Save</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
