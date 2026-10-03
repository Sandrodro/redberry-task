import { useEffect, useRef, type ReactNode } from 'react'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function Modal({ open, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // A click on the backdrop lands outside the dialog box.
        const { top, bottom, left, right } = e.currentTarget.getBoundingClientRect()
        const { clientX: x, clientY: y } = e
        if (x < left || x > right || y < top || y > bottom) onClose()
      }}
      className="relative m-auto rounded-[28px] bg-background p-8 text-white shadow-[0px_20px_50px_-10px_var(--shadow)] backdrop:bg-black/50"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-8 top-8 cursor-pointer text-white"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      {children}
    </dialog>
  )
}
