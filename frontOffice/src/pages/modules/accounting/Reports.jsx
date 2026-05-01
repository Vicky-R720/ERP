import { Card } from '../../../components/ui/Card.jsx'
import { Alert } from '../../../components/ui/Alert.jsx'

export function Reports() {
  return (
    <div className="page">
      <Card>
        <h1 className="page__title">Reports</h1>
        <p className="page__muted">P&L, balances, and summaries (template).</p>
      </Card>

      <Alert title="Demo" tone="neutral">
        This section is intentionally minimal. Typically you’d implement filters (date range, entity), export (CSV/PDF), and
        chart widgets.
      </Alert>

      <div className="grid grid--2">
        <Card>
          <h2 className="card__title">Profit & Loss</h2>
          <div className="placeholder">Report placeholder</div>
        </Card>
        <Card>
          <h2 className="card__title">Balance summary</h2>
          <div className="placeholder">Report placeholder</div>
        </Card>
      </div>
    </div>
  )
}
