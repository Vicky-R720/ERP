import { NavLink } from 'react-router-dom'
import { NAV } from '../../app/nav.js'

export function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand">
        <div className="sidebar__logo" aria-hidden="true">
          ERP
        </div>
        <div className="sidebar__brandText">
          <div className="sidebar__title">Template</div>
          <div className="sidebar__subtitle">Frontend starter</div>
        </div>
      </div>

      <nav className="sidebar__nav">
        {NAV.map((section) => (
          <div className="sidebar__section" key={section.group}>
            <div className="sidebar__sectionTitle">{section.group}</div>
            <div className="sidebar__sectionItems">
              {section.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `sidebar__link${isActive ? ' sidebar__link--active' : ''}`
                  }
                  end={item.to === '/'}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  )
}
