import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function Invoices() {
  const [params] = useSearchParams()
  const order = params.get('order')

  const rows = useMemo(
    () => [
      { id: 'INV-9001', date: '2026-04-22', order: 'SO-2092', status: 'sent', total: 129.9 },
      { id: 'INV-9002', date: '2026-04-25', order: 'SO-2099', status: 'draft', total: 49.9 },
      { id: 'INV-9003', date: '2026-04-29', order: 'SO-2101', status: 'sent', total: 229.0 },
    ],
    [],
  )

  const filtered = order ? rows.filter((r) => r.order === order) : rows

  return (
    <div className="page">
      <DataTable
        title={order ? `Invoices for ${order}` : 'Invoices'}
        rows={filtered}
        columns={[
          { key: 'id', header: 'Invoice #' },
          { key: 'date', header: 'Date' },
          { key: 'order', header: 'Order' },
          { key: 'status', header: 'Status' },
          { key: 'total', header: 'Total', accessor: (r) => `€${r.total.toFixed(2)}` },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Draft', value: 'draft' },
              { label: 'Sent', value: 'sent' },
            ],
          },
        ]}
      />
    </div>
  )
}
