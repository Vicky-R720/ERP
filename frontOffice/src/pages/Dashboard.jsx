import { Card } from '../components/ui/Card.jsx'
import { Badge } from '../components/ui/Badge.jsx'

export function Dashboard() {
  return (
    <div className="page">
      <div className="grid grid--3">
        <Card>
          <div className="kpi">
            <div className="kpi__label">Revenue</div>
            <div className="kpi__value">€128,430</div>
            <Badge tone="success">+12%</Badge>
          </div>
        </Card>
        <Card>
          <div className="kpi">
            <div className="kpi__label">Orders</div>
            <div className="kpi__value">1,284</div>
            <Badge tone="neutral">Last 30 days</Badge>
          </div>
        </Card>
        <Card>
          <div className="kpi">
            <div className="kpi__label">Stock alerts</div>
            <div className="kpi__value">7</div>
            <Badge tone="warning">Needs review</Badge>
          </div>
        </Card>
      </div>

      <div className="grid grid--2">
        <Card>
          <h2 className="card__title">Global statistics</h2>
          <div className="placeholder">Charts placeholder (sales, stock, users)</div>
        </Card>
        <Card>
          <h2 className="card__title">Recent activity</h2>
          <ul className="list">
            <li>Order #1042 created</li>
            <li>Product “USB-C Hub” updated</li>
            <li>Stock entry recorded</li>
          </ul>
        </Card>
      </div>
    </div>
  )
}
