import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from '../../../components/ui/DataTable.jsx'
import { Button } from '../../../components/ui/Button.jsx'

export function ProductList() {
  const rows = useMemo(
    () => [
      { id: 'p_100', name: 'USB-C Hub', sku: 'HUB-UC-001', price: 49.9, stock: 38, status: 'active' },
      { id: 'p_101', name: 'Wireless Mouse', sku: 'MOU-WL-014', price: 24.5, stock: 120, status: 'active' },
      { id: 'p_102', name: 'Mechanical Keyboard', sku: 'KEY-MK-008', price: 99.0, stock: 8, status: 'low' },
      { id: 'p_103', name: '27" Monitor', sku: 'MON-27-002', price: 229.0, stock: 0, status: 'out' },
    ],
    [],
  )

  return (
    <div className="page">
      <div className="page__actions">
        <Button as={Link} to="/products/new">
          Add product
        </Button>
      </div>

      <DataTable
        title="Products"
        rows={rows}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'sku', header: 'SKU' },
          {
            key: 'price',
            header: 'Price',
            accessor: (r) => `€${Number(r.price).toFixed(2)}`,
          },
          { key: 'stock', header: 'Stock' },
          { key: 'status', header: 'Status' },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Low', value: 'low' },
              { label: 'Out', value: 'out' },
            ],
          },
        ]}
        actions={(row) => (
          <>
            <Button as={Link} to={`/products/${row.id}`} variant="secondary" size="sm">
              View
            </Button>
            <Button as={Link} to={`/products/${row.id}/edit`} variant="secondary" size="sm">
              Edit
            </Button>
          </>
        )}
      />
    </div>
  )
}
