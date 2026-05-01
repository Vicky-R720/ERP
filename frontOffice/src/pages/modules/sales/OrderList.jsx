import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from '../../../components/ui/DataTable.jsx'
import { Button } from '../../../components/ui/Button.jsx'

export function OrderList() {
  const rows = useMemo(
    () => [
      { id: 'SO-2092', date: '2026-04-22', customer: 'Acme Corp', status: 'paid', total: 129.9 },
      { id: 'SO-2099', date: '2026-04-25', customer: 'Globex', status: 'pending', total: 49.9 },
      { id: 'SO-2101', date: '2026-04-29', customer: 'Initech', status: 'paid', total: 229.0 },
    ],
    [],
  )

  return (
    <div className="page">
      <div className="page__actions">
        <Button as={Link} to="/sales/orders/new">
          Create order
        </Button>
      </div>

      <DataTable
        title="Orders"
        rows={rows}
        columns={[
          { key: 'id', header: 'Order #' },
          { key: 'date', header: 'Date' },
          { key: 'customer', header: 'Customer' },
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
        actions={(row) => (
          <>
            <Button as={Link} to={`/sales/invoices?order=${row.id}`} variant="secondary" size="sm">
              Invoice
            </Button>
          </>
        )}
      />
    </div>
  )
}
