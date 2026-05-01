import { Card } from '../../../components/ui/Card.jsx'
import { Input } from '../../../components/ui/Input.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { useToast } from '../../../app/toast.jsx'

export function StockExit() {
  const { push } = useToast()

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Stock exit</h1>
        <p className="page__muted">Record outgoing stock.</p>

        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault()
            push({ title: 'Stock exit recorded (demo)', tone: 'warning' })
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
            <Input placeholder="SO-2092" />
          </label>

          <div className="page__actions">
            <Button type="submit">Save</Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
