import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../../../components/ui/Card.jsx'
import { Input } from '../../../components/ui/Input.jsx'
import { Select } from '../../../components/ui/Select.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { useToast } from '../../../app/toast.jsx'

export function CustomerCreate() {
  const navigate = useNavigate()
  const { push } = useToast()

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Add customer</h1>
        <p className="page__muted">Create a new customer profile.</p>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            push({ title: 'Customer created (demo)', tone: 'success' })
            navigate('/customers')
          }}
        >
          <label className="label">
            Company / Name
            <Input placeholder="Acme Corp" required />
          </label>
          <label className="label">
            Email
            <Input type="email" placeholder="billing@acme.local" required />
          </label>
          <label className="label">
            Country
            <Select defaultValue="FR">
              <option value="FR">France</option>
              <option value="DE">Germany</option>
              <option value="US">United States</option>
            </Select>
          </label>

          <div className="page__actions">
            <Button type="submit">Create</Button>
            <Button as={Link} to="/customers" variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
