import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'

export function Suppliers() {
  const rows = useMemo(
    () => [
      { id: 's_1', name: 'TechSupply', email: 'sales@techsupply.local', country: 'FR', status: 'active' },
      { id: 's_2', name: 'OfficeParts', email: 'orders@officeparts.local', country: 'DE', status: 'active' },
      { id: 's_3', name: 'BulkScreens', email: 'hello@bulkscreens.local', country: 'CN', status: 'inactive' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Suppliers"
        rows={rows}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'country', header: 'Country' },
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
