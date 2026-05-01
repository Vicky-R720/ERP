import { Card } from '../../../components/ui/Card.jsx'
import { Input } from '../../../components/ui/Input.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { useToast } from '../../../app/toast.jsx'

export function StockEntry() {
  const { push } = useToast()

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Stock entry</h1>
        <p className="page__muted">Record incoming stock.</p>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            push({ title: 'Stock entry recorded (demo)', tone: 'success' })
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
            Reference
            <Input placeholder="PO-1021" />
          </label>

          <div className="page__actions">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
