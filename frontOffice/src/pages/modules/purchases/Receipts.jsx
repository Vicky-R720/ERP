import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function Receipts() {
  const rows = useMemo(
    () => [
      { id: 'GR-5001', date: '2026-04-18', po: 'PO-1021', status: 'booked' },
      { id: 'GR-5002', date: '2026-04-29', po: 'PO-1028', status: 'draft' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Receipts"
        rows={rows}
        columns={[
          { key: 'id', header: 'Receipt #' },
          { key: 'date', header: 'Date' },
          { key: 'po', header: 'Purchase order' },
          { key: 'status', header: 'Status' },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Draft', value: 'draft' },
              { label: 'Booked', value: 'booked' },
            ],
          },
        ]}
      />
    </div>
  )
}
