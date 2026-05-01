import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function StockHistory() {
  const rows = useMemo(
    () => [
      { id: 's1', date: '2026-04-18', sku: 'HUB-UC-001', type: 'Entry', qty: 50, ref: 'PO-1021' },
      { id: 's2', date: '2026-04-22', sku: 'HUB-UC-001', type: 'Exit', qty: 8, ref: 'SO-2092' },
      { id: 's3', date: '2026-04-25', sku: 'KEY-MK-008', type: 'Exit', qty: 2, ref: 'SO-2099' },
      { id: 's4', date: '2026-04-29', sku: 'MOU-WL-014', type: 'Entry', qty: 100, ref: 'PO-1028' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Stock history"
        rows={rows}
        columns={[
          { key: 'date', header: 'Date' },
          { key: 'sku', header: 'SKU' },
          { key: 'type', header: 'Type' },
          { key: 'qty', header: 'Qty' },
          { key: 'ref', header: 'Reference' },
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
