import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function Expenses() {
  const rows = useMemo(
    () => [
      { id: 'exp_1', date: '2026-04-12', vendor: 'OfficeParts', amount: 98.0, category: 'Office' },
      { id: 'exp_2', date: '2026-04-16', vendor: 'TechSupply', amount: 420.0, category: 'Equipment' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Expenses"
        rows={rows}
        columns={[
          { key: 'date', header: 'Date' },
          { key: 'vendor', header: 'Vendor' },
          { key: 'category', header: 'Category' },
          { key: 'amount', header: 'Amount', accessor: (r) => `€${r.amount.toFixed(2)}` },
        ]}
      />
    </div>
  )
}
