import { Link, useNavigate, useParams } from 'react-router-dom'
import { Card } from '../../../components/ui/Card.jsx'
import { Input } from '../../../components/ui/Input.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { useToast } from '../../../app/toast.jsx'

export function ProductEdit() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { push } = useToast()

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Edit product</h1>
        <p className="page__muted">Product ID: {productId}</p>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            push({ title: 'Product updated (demo)', message: productId, tone: 'success' })
            navigate(`/products/${productId}`)
          }}
        >
          <label className="label">
            Name
            <Input defaultValue="USB-C Hub" required />
          </label>
          <label className="label">
            SKU
            <Input defaultValue="HUB-UC-001" required />
          </label>
          <label className="label">
            Price
            <Input type="number" step="0.01" defaultValue={49.9} required />
          </label>

          <div className="page__actions">
            <Button type="submit">Save</Button>
            <Button as={Link} to={`/products/${productId}`} variant="secondary">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
