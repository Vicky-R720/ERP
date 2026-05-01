import { Link, useParams } from 'react-router-dom'
import { Card } from '../../../components/ui/Card.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function ProductDetails() {
  const { productId } = useParams()

  const movements = [
    { id: 'm1', date: '2026-04-18', type: 'Entry', quantity: 50, reference: 'PO-1021' },
    { id: 'm2', date: '2026-04-22', type: 'Exit', quantity: 8, reference: 'SO-2092' },
    { id: 'm3', date: '2026-04-29', type: 'Exit', quantity: 4, reference: 'SO-2101' },
  ]

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Product details</h1>
        <p className="page__muted">Product ID: {productId}</p>

        <div className="page__actions">
          <Button as={Link} to={`/products/${productId}/edit`}>
            Edit
          </Button>
          <Button as={Link} to="/products" variant="secondary">
            Back to list
          </Button>
        </div>
      </Card>

      <DataTable
        title="Stock movements"
        rows={movements}
        columns={[
          { key: 'date', header: 'Date' },
          { key: 'type', header: 'Type' },
          { key: 'quantity', header: 'Qty' },
          { key: 'reference', header: 'Reference' },
        ]}
        filters={[
          {
            key: 'type',
            label: 'Type',
            options: [
              { label: 'Entry', value: 'Entry' },
              { label: 'Exit', value: 'Exit' },
            ],
          },
        ]}
      />
    </div>
  )
}
