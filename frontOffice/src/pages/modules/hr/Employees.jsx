import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function Employees() {
  const rows = useMemo(
    () => [
      { id: 'e1', name: 'Jane Doe', department: 'Sales', status: 'active' },
      { id: 'e2', name: 'John Smith', department: 'Warehouse', status: 'active' },
      { id: 'e3', name: 'Sam Lee', department: 'Finance', status: 'inactive' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Employees"
        rows={rows}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'department', header: 'Department' },
          { key: 'status', header: 'Status' },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Inactive', value: 'inactive' },
            ],
          },
        ]}
      />
    </div>
  )
}
