import { Card } from '../components/ui/Card.jsx'
import { Input } from '../components/ui/Input.jsx'
import { Button } from '../components/ui/Button.jsx'

export function Settings() {
  return (
    <div className="page">
      <div className="grid grid--2">
        <Card>
          <h1 className="page__title">Settings</h1>
          <p className="page__muted">Profile preferences and security.</p>
        </Card>

        <Card>
          <h2 className="card__title">Change password</h2>
          <div className="form">
            <label className="label">
              Current password
              <Input type="password" placeholder="••••••••" />
            </label>
            <label className="label">
              New password
              <Input type="password" placeholder="••••••••" />
            </label>
            <div className="page__actions">
              <Button>Update</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
