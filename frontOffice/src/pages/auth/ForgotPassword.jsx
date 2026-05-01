import { Link } from 'react-router-dom'
import { useState } from 'react'
import { Card } from '../../components/ui/Card.jsx'
import { Input } from '../../components/ui/Input.jsx'
import { Button } from '../../components/ui/Button.jsx'

export function ForgotPassword() {
  const [email, setEmail] = useState('')

  return (
    <div className="auth">
      <Card className="auth__card">
        <h1 className="page__title">Forgot password</h1>
        <p className="page__muted">Enter your email to receive a reset link.</p>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            // demo only
            alert('Demo: reset link would be sent.')
          }}
        >
          <label className="label">
            Email
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />
          </label>
          <Button type="submit">Send reset link</Button>

          <div className="auth__links">
            <Link to="/auth/login">Back to login</Link>
          </div>
        </form>
      </Card>
    </div>
  )
}
