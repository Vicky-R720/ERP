import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function Revenue() {
  const rows = useMemo(
    () => [
      { id: 'rev_1', date: '2026-04-22', source: 'Invoice INV-9001', amount: 129.9, category: 'Sales' },
      { id: 'rev_2', date: '2026-04-29', source: 'Invoice INV-9003', amount: 229.0, category: 'Sales' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Revenue"
        rows={rows}
        columns={[
          { key: 'date', header: 'Date' },
          { key: 'source', header: 'Source' },
          { key: 'category', header: 'Category' },
          { key: 'amount', header: 'Amount', accessor: (r) => `€${r.amount.toFixed(2)}` },
        ]}
      />
    </div>
  )
}
