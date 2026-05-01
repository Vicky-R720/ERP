import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DataTable } from '../../components/ui/DataTable.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { Modal } from '../../components/ui/Modal.jsx'
import { useToast } from '../../app/toast.jsx'

export function Users() {
  const { push } = useToast()
  const [confirm, setConfirm] = useState({ open: false, user: null })

  const rows = useMemo(
    () => [
      { id: 'u_1', name: 'Admin User', email: 'admin@demo.local', role: 'Admin', status: 'active' },
      { id: 'u_2', name: 'Marie Curie', email: 'marie@company.local', role: 'Manager', status: 'active' },
      { id: 'u_3', name: 'Ada Lovelace', email: 'ada@company.local', role: 'Viewer', status: 'disabled' },
      { id: 'u_4', name: 'Alan Turing', email: 'alan@company.local', role: 'Editor', status: 'active' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Users"
        rows={rows}
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'email', header: 'Email' },
          { key: 'role', header: 'Role' },
          { key: 'status', header: 'Status' },
        ]}
        filters={[
          {
            key: 'status',
            label: 'Status',
            options: [
              { label: 'Active', value: 'active' },
              { label: 'Disabled', value: 'disabled' },
            ],
          },
          {
            key: 'role',
            label: 'Role',
            options: [
              { label: 'Admin', value: 'Admin' },
              { label: 'Manager', value: 'Manager' },
              { label: 'Editor', value: 'Editor' },
              { label: 'Viewer', value: 'Viewer' },
            ],
          },
        ]}
        actions={(row) => (
          <>
            <Button as={Link} to={`/admin/users/${row.id}`} variant="secondary" size="sm">
              View
            </Button>
            <Button as={Link} to={`/admin/users/${row.id}/edit`} variant="secondary" size="sm">
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirm({ open: true, user: row })}
            >
              Delete
            </Button>
          </>
        )}
      />

      <Modal
        open={confirm.open}
        title="Delete user"
        onClose={() => setConfirm({ open: false, user: null })}
        footer={
          <>
            <Button
              variant="secondary"
              onClick={() => setConfirm({ open: false, user: null })}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                push({
                  title: 'User deleted (demo)',
                  message: confirm.user?.email,
                  tone: 'warning',
                })
                setConfirm({ open: false, user: null })
              }}
            >
              Confirm
            </Button>
          </>
        }
      >
        This is a demo template. In a real ERP, this would call your backend.
      </Modal>
    </div>
  )
}
