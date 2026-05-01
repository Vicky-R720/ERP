import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Card } from '../../../components/ui/Card.jsx'
import { Input } from '../../../components/ui/Input.jsx'
import { Select } from '../../../components/ui/Select.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { useToast } from '../../../app/toast.jsx'

export function CreateOrder() {
  const navigate = useNavigate()
  const { push } = useToast()
  const [step, setStep] = useState(1)

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Create order</h1>
        <p className="page__muted">Step {step} / 2 (demo wizard)</p>

        {step === 1 ? (
          <div className="form">
            <label className="label">
              Customer
              <Select defaultValue="Acme Corp">
                <option>Acme Corp</option>
                <option>Globex</option>
                <option>Initech</option>
              </Select>
            </label>
            <label className="label">
              Order date
              <Input type="date" required />
            </label>

            <div className="page__actions">
              <Button onClick={() => setStep(2)}>Next</Button>
              <Button as={Link} to="/sales/orders" variant="secondary">
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault()
              push({ title: 'Order created (demo)', tone: 'success' })
              navigate('/sales/orders')
            }}
          >
            <label className="label">
              Product SKU
              <Input placeholder="HUB-UC-001" required />
            </label>
            <label className="label">
              Quantity
              <Input type="number" min={1} defaultValue={1} required />
            </label>
            <label className="label">
              Unit price
              <Input type="number" step="0.01" defaultValue={49.9} required />
            </label>

            <div className="page__actions">
              <Button type="button" variant="secondary" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button type="submit">Create</Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  )
}
