export function Badge({ tone = 'neutral', className = '', children }) {
  return (
    <span className={`badge badge--${tone} ${className}`.trim()}>
      {children}
    </span>
  )
}
