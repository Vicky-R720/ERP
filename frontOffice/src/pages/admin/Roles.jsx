import { useMemo } from 'react'
import { DataTable } from '../../components/ui/DataTable.jsx'
import { Button } from '../../components/ui/Button.jsx'
import { useToast } from '../../app/toast.jsx'

export function Roles() {
  const { push } = useToast()

  const rows = useMemo(
    () => [
      { id: 'r_admin', name: 'Admin', users: 1, description: 'Full access' },
      { id: 'r_manager', name: 'Manager', users: 3, description: 'Manage business modules' },
      { id: 'r_editor', name: 'Editor', users: 5, description: 'Create/update records' },
      { id: 'r_viewer', name: 'Viewer', users: 12, description: 'Read-only access' },
    ],
    [],
  )

  return (
    <div className="page">
      <DataTable
        title="Roles"
        rows={rows}
        columns={[
          { key: 'name', header: 'Role' },
          { key: 'users', header: 'Users' },
          { key: 'description', header: 'Description', sortable: false },
        ]}
        actions={(row) => (
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => push({ title: 'Edit role (demo)', message: row.name })}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => push({ title: 'Delete role (demo)', message: row.name, tone: 'warning' })}
            >
              Delete
            </Button>
          </>
        )}
      />
    </div>
  )
}
