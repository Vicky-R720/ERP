export function Alert({ tone = 'neutral', title, children }) {
  return (
    <div className={`alert alert--${tone}`.trim()} role="status">
      {title ? <div className="alert__title">{title}</div> : null}
      <div className="alert__body">{children}</div>
    </div>
  )
}
