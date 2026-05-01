import { Link, useNavigate } from 'react-router-dom'
import { Card } from '../../../components/ui/Card.jsx'
import { Input } from '../../../components/ui/Input.jsx'
import { Select } from '../../../components/ui/Select.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { useToast } from '../../../app/toast.jsx'

export function ProductCreate() {
  const navigate = useNavigate()
  const { push } = useToast()

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Add product</h1>
        <p className="page__muted">Create a new product record.</p>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            push({ title: 'Product created (demo)', tone: 'success' })
            navigate('/products')
          }}
        >
          <label className="label">
            Name
            <Input placeholder="Product name" required />
          </label>
          <label className="label">
            SKU
            <Input placeholder="SKU" required />
          </label>
          <label className="label">
            Category
            <Select defaultValue="hardware">
              <option value="hardware">Hardware</option>
              <option value="accessories">Accessories</option>
              <option value="services">Services</option>
            </Select>
          </label>
          <label className="label">
            Price
            <Input type="number" step="0.01" placeholder="0.00" required />
          </label>

          <div className="page__actions">
            <Button type="submit">Create</Button>
            <Button as={Link} to="/products" variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
