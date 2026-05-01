import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function Payroll() {
  const rows = useMemo(
    () => [
      { id: 'pay_2026_03', period: '2026-03', employees: 12, total: 48250.0, status: 'closed' },
      { id: 'pay_2026_04', period: '2026-04', employees: 12, total: 49110.0, status: 'draft' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Payroll"
        rows={rows}
        columns={[
          { key: 'period', header: 'Period' },
          { key: 'employees', header: 'Employees' },
          { key: 'total', header: 'Total', accessor: (r) => `€${r.total.toFixed(2)}` },
          { key: 'status', header: 'Status' },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Draft', value: 'draft' },
              { label: 'Closed', value: 'closed' },
            ],
          },
        ]}
      />
    </div>
  )
}
