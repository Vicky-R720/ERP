export function Spinner({ size = 18, className = '', ...props }) {
  return (
    <span
      className={`spinner ${className}`.trim()}
      style={{ width: size, height: size }}
      aria-label="Loading"
      role="status"
      {...props}
    />
  )
}
