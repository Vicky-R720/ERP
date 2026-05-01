import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Card } from '../../components/ui/Card.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Button } from '../../components/ui/Button.jsx'

export function ResetPassword() {
  const [password, setPassword] = useState('')

  return (
    <div className="auth">
      <Card className="auth__card">
        <h1 className="page__title">Reset password</h1>
        <p className="page__muted">Choose a new password (demo only).</p>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            alert('Demo: password would be updated.')
          }}
        >
          <label className="label">
            New password
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
            />
          </label>
          <Button type="submit">Update password</Button>

          <div className="auth__links">
            <Link to="/auth/login">Back to login</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
