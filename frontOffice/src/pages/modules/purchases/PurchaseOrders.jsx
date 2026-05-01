import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function PurchaseOrders() {
  const rows = useMemo(
    () => [
      { id: 'PO-1021', date: '2026-04-18', supplier: 'TechSupply', status: 'received', total: 2490.0 },
      { id: 'PO-1028', date: '2026-04-29', supplier: 'OfficeParts', status: 'pending', total: 980.0 },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Purchase orders"
        rows={rows}
        columns={[
          { key: 'id', header: 'PO #' },
          { key: 'date', header: 'Date' },
          { key: 'supplier', header: 'Supplier' },
          { key: 'status', header: 'Status' },
          { key: 'total', header: 'Total', accessor: (r) => `€${r.total.toFixed(2)}` },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Pending', value: 'pending' },
              { label: 'Received', value: 'received' },
            ],
          },
        ]}
      />
    </div>
  )
}
