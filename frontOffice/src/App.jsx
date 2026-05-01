import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './app/auth.jsx'
import { RequireAuth } from './app/RequireAuth.jsx'
import { ToastProvider } from './app/toast.jsx'
import { AppShell } from './components/layout/AppShell.jsx'

import { Login } from './pages/auth/Login.jsx'
import { Register } from './pages/auth/Register.jsx'
import { ForgotPassword } from './pages/auth/ForgotPassword.jsx'
import { ResetPassword } from './pages/auth/ResetPassword.jsx'

import { Dashboard } from './pages/Dashboard.jsx'
import { Profile } from './pages/Profile.jsx'
import { Settings } from './pages/Settings.jsx'
import { NotFound } from './pages/NotFound.jsx'

import { Users } from './pages/admin/Users.jsx'
import { Roles } from './pages/admin/Roles.jsx'
import { Permissions } from './pages/admin/Permissions.jsx'
import { UserDetails } from './pages/admin/UserDetails.jsx'
import { UserEdit } from './pages/admin/UserEdit.jsx'

import { ProductList } from './pages/modules/products/ProductList.jsx'
import { ProductCreate } from './pages/modules/products/ProductCreate.jsx'
import { ProductEdit } from './pages/modules/products/ProductEdit.jsx'
import { ProductDetails } from './pages/modules/products/ProductDetails.jsx'

import { StockEntry } from './pages/modules/stock/StockEntry.jsx'
import { StockExit } from './pages/modules/stock/StockExit.jsx'
import { StockHistory } from './pages/modules/stock/StockHistory.jsx'
import { StockAlerts } from './pages/modules/stock/StockAlerts.jsx'

import { CustomerList } from './pages/modules/customers/CustomerList.jsx'
import { CustomerCreate } from './pages/modules/customers/CustomerCreate.jsx'
import { CustomerHistory } from './pages/modules/customers/CustomerHistory.jsx'

import { OrderList } from './pages/modules/sales/OrderList.jsx'
import { CreateOrder } from './pages/modules/sales/CreateOrder.jsx'
import { Invoices } from './pages/modules/sales/Invoices.jsx'

import { Suppliers } from './pages/modules/purchases/Suppliers.jsx'
import { PurchaseOrders } from './pages/modules/purchases/PurchaseOrders.jsx'
import { Receipts } from './pages/modules/purchases/Receipts.jsx'

import { Revenue } from './pages/modules/accounting/Revenue.jsx'
import { Expenses } from './pages/modules/accounting/Expenses.jsx'
import { Reports } from './pages/modules/accounting/Reports.jsx'

import { Employees } from './pages/modules/hr/Employees.jsx'
import { Leave } from './pages/modules/hr/Leave.jsx'
import { Payroll } from './pages/modules/hr/Payroll.jsx'

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/forgot" element={<ForgotPassword />} />
            <Route path="/auth/reset" element={<ResetPassword />} />

            <Route element={<RequireAuth />}>
              <Route element={<AppShell />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/settings" element={<Settings />} />

                <Route path="/admin" element={<Navigate to="/admin/users" replace />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/users/:userId" element={<UserDetails />} />
                <Route path="/admin/users/:userId/edit" element={<UserEdit />} />
                <Route path="/admin/roles" element={<Roles />} />
                <Route path="/admin/permissions" element={<Permissions />} />

                <Route path="/products" element={<ProductList />} />
                <Route path="/products/new" element={<ProductCreate />} />
                <Route path="/products/:productId" element={<ProductDetails />} />
                <Route path="/products/:productId/edit" element={<ProductEdit />} />

                <Route path="/stock" element={<Navigate to="/stock/history" replace />} />
                <Route path="/stock/entry" element={<StockEntry />} />
                <Route path="/stock/exit" element={<StockExit />} />
                <Route path="/stock/history" element={<StockHistory />} />
                <Route path="/stock/alerts" element={<StockAlerts />} />

                <Route path="/customers" element={<CustomerList />} />
                <Route path="/customers/new" element={<CustomerCreate />} />
                <Route path="/customers/:customerId/history" element={<CustomerHistory />} />

                <Route path="/sales" element={<Navigate to="/sales/orders" replace />} />
                <Route path="/sales/orders" element={<OrderList />} />
                <Route path="/sales/orders/new" element={<CreateOrder />} />
                <Route path="/sales/invoices" element={<Invoices />} />

                <Route path="/purchases" element={<Navigate to="/purchases/suppliers" replace />} />
                <Route path="/purchases/suppliers" element={<Suppliers />} />
                <Route path="/purchases/orders" element={<PurchaseOrders />} />
                <Route path="/purchases/receipts" element={<Receipts />} />

                <Route path="/accounting" element={<Navigate to="/accounting/revenue" replace />} />
                <Route path="/accounting/revenue" element={<Revenue />} />
                <Route path="/accounting/expenses" element={<Expenses />} />
                <Route path="/accounting/reports" element={<Reports />} />

                <Route path="/hr" element={<Navigate to="/hr/employees" replace />} />
                <Route path="/hr/employees" element={<Employees />} />
                <Route path="/hr/leave" element={<Leave />} />
                <Route path="/hr/payroll" element={<Payroll />} />
              </Route>
            </Route>

            <Route path="/auth" element={<Navigate to="/auth/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
