import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button } from './Button.jsx'

export function Modal({ open, title, children, onClose, footer }) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      className="modal__backdrop"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose?.()
      }}
    >
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal__header">
          <div className="modal__title">{title}</div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="modal__body">{children}</div>
        <div className="modal__footer">{footer}</div>
      </div>
    </div>,
    document.body,
  )
}
