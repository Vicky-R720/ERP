import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function Leave() {
  const rows = useMemo(
    () => [
      { id: 'l1', employee: 'Jane Doe', from: '2026-05-04', to: '2026-05-07', status: 'approved' },
      { id: 'l2', employee: 'John Smith', from: '2026-05-10', to: '2026-05-12', status: 'pending' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Leave management"
        rows={rows}
        columns={[
          { key: 'employee', header: 'Employee' },
          { key: 'from', header: 'From' },
          { key: 'to', header: 'To' },
          { key: 'status', header: 'Status' },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Pending', value: 'pending' },
              { label: 'Approved', value: 'approved' },
            ],
          },
        ]}
      />
    </div>
  )
}
