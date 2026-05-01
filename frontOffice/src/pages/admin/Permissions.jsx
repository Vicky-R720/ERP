import { useMemo } from 'react'
import { DataTable } from '../../components/ui/DataTable.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useToast } from '../../app/toast.jsx'

export function Permissions() {
  const { push } = useToast()

  const rows = useMemo(
    () => [
      { id: 'p_products_read', key: 'products.read', module: 'Products', description: 'View products' },
      { id: 'p_products_write', key: 'products.write', module: 'Products', description: 'Create/update products' },
      { id: 'p_stock_write', key: 'stock.write', module: 'Stock', description: 'Record stock movements' },
      { id: 'p_sales_write', key: 'sales.write', module: 'Sales', description: 'Create and update orders' },
      { id: 'p_admin_users', key: 'admin.users', module: 'Administration', description: 'Manage users' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Permissions"
        rows={rows}
        columns={[
          { key: 'key', header: 'Key' },
          { key: 'module', header: 'Module' },
          { key: 'description', header: 'Description', sortable: false },
        ]}
        filters={[
          {
            key: 'module',
            label: 'Module',
            options: [
              { label: 'Products', value: 'Products' },
              { label: 'Stock', value: 'Stock' },
              { label: 'Sales', value: 'Sales' },
              { label: 'Administration', value: 'Administration' },
            ],
          },
        ]}
        actions={(row) => (
          <>
            <Button variant="secondary" size="sm" onClick={() => push({ title: 'Assign (demo)', message: row.key })}>
              Assign
            </Button>
          </>
        )}
      />
    </div>
  )
}
