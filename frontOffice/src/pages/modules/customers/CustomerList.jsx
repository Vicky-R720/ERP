import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from '../../../components/ui/DataTable.jsx'
import { Button } from '../../../components/ui/Button.jsx'

export function CustomerList() {
  const rows = useMemo(
    () => [
      { id: 'c_10', name: 'Acme Corp', email: 'billing@acme.local', country: 'FR', status: 'active' },
      { id: 'c_11', name: 'Globex', email: 'finance@globex.local', country: 'DE', status: 'active' },
      { id: 'c_12', name: 'Initech', email: 'ap@initech.local', country: 'US', status: 'inactive' },
    ],
    [],
  )

  return (
    <div className="page">
      <div className="page__actions">
        <Button as={Link} to="/customers/new">
          Add customer
        </Button>
      </div>

      <DataTable
        title="Customers"
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
        actions={(row) => (
          <>
            <Button as={Link} to={`/customers/${row.id}/history`} variant="secondary" size="sm">
              History
            </Button>
          </>
        )}
      />
    </div>
  )
}
