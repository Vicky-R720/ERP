import { useMemo } from 'react'
import { DataTable } from '../../../components/ui/DataTable.jsx'
import { Badge } from '../../../components/ui/Badge.jsx'

export function StockAlerts() {
  const rows = useMemo(
    () => [
      { id: 'a1', sku: 'KEY-MK-008', product: 'Mechanical Keyboard', stock: 8, level: 'low' },
      { id: 'a2', sku: 'MON-27-002', product: '27" Monitor', stock: 0, level: 'out' },
      { id: 'a3', sku: 'CAB-USBC-005', product: 'USB-C Cable', stock: 3, level: 'low' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Stockout alerts"
        rows={rows}
        columns={[
          { key: 'sku', header: 'SKU' },
          { key: 'product', header: 'Product' },
          { key: 'stock', header: 'Stock' },
          {
            key: 'level',
            header: 'Level',
            accessor: (r) =>
              r.level === 'out' ? (
                <Badge tone="danger">Out</Badge>
              ) : (
                <Badge tone="warning">Low</Badge>
              ),
            sortable: false,
            searchable: false,
          },
        ]}
        filters={[
          {
            key: 'level',
            label: 'Level',
            options: [
              { label: 'Low', value: 'low' },
              { label: 'Out', value: 'out' },
            ],
          },
        ]}
      />
    </div>
  )
}
