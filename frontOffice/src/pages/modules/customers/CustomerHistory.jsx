import { Link, useParams } from 'react-router-dom'
import { Card } from '../../../components/ui/Card.jsx'
import { Button } from '../../../components/ui/Button.jsx'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function CustomerHistory() {
  const { customerId } = useParams()

  const orders = [
    { id: 'o1', date: '2026-04-10', status: 'paid', total: 129.9 },
    { id: 'o2', date: '2026-04-19', status: 'pending', total: 49.9 },
    { id: 'o3', date: '2026-04-28', status: 'paid', total: 229.0 },
  ]

  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Customer history</h1>
        <p className="page__muted">Customer ID: {customerId}</p>
        <div className="page__actions">
          <Button as={Link} to="/customers" variant="secondary">
            Back to customers
          </Button>
        </div>
      </Card>

      <DataTable
        title="Orders"
        rows={orders}
        columns={[
          { key: 'date', header: 'Date' },
          { key: 'status', header: 'Status' },
          { key: 'total', header: 'Total', accessor: (r) => `€${r.total.toFixed(2)}` },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Paid', value: 'paid' },
              { label: 'Pending', value: 'pending' },
            ],
          },
        ]}
      />
    </div>
  )
}
