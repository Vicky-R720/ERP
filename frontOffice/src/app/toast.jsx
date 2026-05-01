/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'

const ToastContext = createContext(null)

function makeId() {
  return `${Date.now()}_${Math.random().toString(16).slice(2)}`
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  const timers = useRef(new Map())

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
    const timer = timers.current.get(id)
    if (timer) clearTimeout(timer)
    timers.current.delete(id)
  }, [])

  const push = useCallback(
    ({ title, message, tone = 'neutral', durationMs = 3500 }) => {
      const id = makeId()
      const toast = { id, title, message, tone }
      setToasts((t) => [toast, ...t].slice(0, 5))

      const timer = setTimeout(() => dismiss(id), durationMs)
      timers.current.set(id, timer)
      return id
    },
    [dismiss],
  )

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toastHost" aria-live="polite" aria-relevant="additions">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast--${t.tone}`.trim()}>
            <div className="toast__title">{t.title}</div>
            {t.message ? <div className="toast__message">{t.message}</div> : null}
            <button className="toast__close" onClick={() => dismiss(t.id)}>
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
