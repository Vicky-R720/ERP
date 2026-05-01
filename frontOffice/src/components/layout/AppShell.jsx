import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar.jsx'
import { Topbar } from './Topbar.jsx'

export function AppShell() {
  return (
    <div className="app">
      <Sidebar />
      <div className="app__main">
        <Topbar />
        <main className="app__content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
