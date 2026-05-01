export function Button({
  as: As,
  variant = 'primary',
  size = 'md',
  type,
  className = '',
  disabled,
  children,
  ...props
}) {
  const Comp = As ?? 'button'
  const btnType = Comp === 'button' ? (type ?? 'button') : type

  return (
    <Comp
      type={btnType}
      disabled={disabled}
      className={`btn btn--${variant} btn--${size} ${className}`.trim()}
      {...props}
    >
      {children}
    </Comp>
  )
}
