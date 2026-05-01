export const NAV = [
  {
    group: 'Core',
    items: [
      { label: 'Dashboard', to: '/' },
      { label: 'Profile', to: '/profile' },
      { label: 'Settings', to: '/settings' },
    ],
  },
  {
    group: 'Administration',
    items: [
      { label: 'Users', to: '/admin/users' },
      { label: 'Roles', to: '/admin/roles' },
      { label: 'Permissions', to: '/admin/permissions' },
    ],
  },
  {
    group: 'Products',
    items: [
      { label: 'Product list', to: '/products' },
      { label: 'Add product', to: '/products/new' },
    ],
  },
  {
    group: 'Stock',
    items: [
      { label: 'History', to: '/stock/history' },
      { label: 'Entry', to: '/stock/entry' },
      { label: 'Exit', to: '/stock/exit' },
      { label: 'Alerts', to: '/stock/alerts' },
    ],
  },
  {
    group: 'Customers',
    items: [
      { label: 'Customer list', to: '/customers' },
      { label: 'Add customer', to: '/customers/new' },
    ],
  },
  {
    group: 'Sales',
    items: [
      { label: 'Orders', to: '/sales/orders' },
      { label: 'Create order', to: '/sales/orders/new' },
      { label: 'Invoices', to: '/sales/invoices' },
    ],
  },
  {
    group: 'Purchases',
    items: [
      { label: 'Suppliers', to: '/purchases/suppliers' },
      { label: 'Purchase orders', to: '/purchases/orders' },
      { label: 'Receipts', to: '/purchases/receipts' },
    ],
  },
  {
    group: 'Accounting',
    items: [
      { label: 'Revenue', to: '/accounting/revenue' },
      { label: 'Expenses', to: '/accounting/expenses' },
      { label: 'Reports', to: '/accounting/reports' },
    ],
  },
  {
    group: 'HR',
    items: [
      { label: 'Employees', to: '/hr/employees' },
      { label: 'Leave', to: '/hr/leave' },
      { label: 'Payroll', to: '/hr/payroll' },
    ],
  },
]
