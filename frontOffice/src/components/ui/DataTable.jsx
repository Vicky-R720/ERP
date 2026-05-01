import { useMemo, useState } from 'react'
import { Input } from './Input.jsx'
import { Select } from './Select.jsx'
import { Button } from './Button.jsx'

function defaultGetRowId(row, index) {
  return row?.id ?? index
}

function toText(value) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number') return String(value)
  if (typeof value === 'boolean') return value ? 'true' : 'false'
  return String(value)
}

function compareValues(a, b) {
  if (a == null && b == null) return 0
  if (a == null) return 1
  if (b == null) return -1
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return toText(a).localeCompare(toText(b))
}

/**
 * columns: [{ key, header, accessor?: (row)=>any, sortable?: boolean, searchable?: boolean, width?: string }]
 * filters: [{ key, label, options: [{label, value}] }]
 */
export function DataTable({
  title,
  rows,
  columns,
  getRowId = defaultGetRowId,
  actions,
  filters = [],
  initialPageSize = 10,
}) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState({ key: null, dir: 'asc' })
  const [pageSize, setPageSize] = useState(initialPageSize)
  const [page, setPage] = useState(1)
  const [filterState, setFilterState] = useState(() => {
    const initial = {}
    for (const f of filters) initial[f.key] = ''
    return initial
  })

  const searchableKeys = useMemo(() => {
    const keys = columns.filter((c) => c.searchable !== false).map((c) => c.key)
    return new Set(keys)
  }, [columns])

  const normalizedRows = useMemo(() => rows ?? [], [rows])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()

    return normalizedRows.filter((row) => {
      for (const f of filters) {
        const v = filterState[f.key]
        if (!v) continue
        const cell = row?.[f.key]
        if (String(cell) !== String(v)) return false
      }

      if (!q) return true
      return columns.some((c) => {
        if (!searchableKeys.has(c.key)) return false
        const value = c.accessor ? c.accessor(row) : row?.[c.key]
        return toText(value).toLowerCase().includes(q)
      })
    })
  }, [normalizedRows, query, columns, filters, filterState, searchableKeys])

  const sorted = useMemo(() => {
    if (!sort.key) return filtered
    const col = columns.find((c) => c.key === sort.key)
    if (!col) return filtered

    const items = [...filtered]
    items.sort((ra, rb) => {
      const a = col.accessor ? col.accessor(ra) : ra?.[col.key]
      const b = col.accessor ? col.accessor(rb) : rb?.[col.key]
      const delta = compareValues(a, b)
      return sort.dir === 'asc' ? delta : -delta
    })
    return items
  }, [filtered, sort, columns])

  const total = sorted.length
  const pageCount = Math.max(1, Math.ceil(total / pageSize))
  const safePage = Math.min(Math.max(1, page), pageCount)

  const paged = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return sorted.slice(start, start + pageSize)
  }, [sorted, safePage, pageSize])

  return (
    <div className="table">
      <div className="table__top">
        <div className="table__title">
          <div className="table__titleText">{title}</div>
          <div className="table__meta">
            {total} row{total === 1 ? '' : 's'}
          </div>
        </div>

        <div className="table__controls">
          <Input
            placeholder="Search…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setPage(1)
            }}
          />

          {filters.map((f) => (
            <Select
              key={f.key}
              value={filterState[f.key]}
              onChange={(e) => {
                setFilterState((s) => ({ ...s, [f.key]: e.target.value }))
                setPage(1)
              }}
            >
              <option value="">{f.label}</option>
              {f.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </Select>
          ))}

          <Select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value))
              setPage(1)
            }}
            aria-label="Rows per page"
          >
            {[5, 10, 20, 50].map((n) => (
              <option key={n} value={n}>
                {n}/page
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="table__wrap">
        <table className="table__table">
          <thead>
            <tr>
              {columns.map((c) => {
                const sortable = c.sortable !== false
                const active = sort.key === c.key
                const dir = active ? sort.dir : null
                return (
                  <th key={c.key} style={{ width: c.width }}>
                    <button
                      className={`table__thBtn${sortable ? '' : ' table__thBtn--disabled'}`}
                      onClick={() => {
                        if (!sortable) return
                        setSort((s) => {
                          if (s.key !== c.key) return { key: c.key, dir: 'asc' }
                          return { key: c.key, dir: s.dir === 'asc' ? 'desc' : 'asc' }
                        })
                      }}
                      type="button"
                    >
                      {c.header}
                      {sortable ? (
                        <span className="table__sort">
                          {dir === 'asc' ? '▲' : dir === 'desc' ? '▼' : '↕'}
                        </span>
                      ) : null}
                    </button>
                  </th>
                )
              })}
              {actions ? <th className="table__actionsHead">Actions</th> : null}
            </tr>
          </thead>

          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td
                  className="table__empty"
                  colSpan={columns.length + (actions ? 1 : 0)}
                >
                  No results
                </td>
              </tr>
            ) : (
              paged.map((row, index) => (
                <tr key={getRowId(row, index)}>
                  {columns.map((c) => {
                    const value = c.accessor ? c.accessor(row) : row?.[c.key]
                    return <td key={c.key}>{value ?? ''}</td>
                  })}
                  {actions ? (
                    <td className="table__actions">{actions(row)}</td>
                  ) : null}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="table__bottom">
        <div className="table__pagination">
          <Button
            variant="secondary"
            size="sm"
            disabled={safePage <= 1}
            onClick={() => setPage(1)}
          >
            First
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={safePage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </Button>
          <div className="table__pageInfo">
            Page {safePage} / {pageCount}
          </div>
          <Button
            variant="secondary"
            size="sm"
            disabled={safePage >= pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          >
            Next
          </Button>
          <Button
            variant="secondary"
            size="sm"
            disabled={safePage >= pageCount}
            onClick={() => setPage(pageCount)}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  )
}
