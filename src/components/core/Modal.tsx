import { useEffect, useRef, type MouseEvent, type ReactNode } from 'react'
import CloseIcon from '@/assets/icons/close.svg?react'

type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

/** A click on the backdrop lands on the dialog, outside its box. Clicks that start on a child are
 * ignored, since a programmatic click (file input) reports 0,0 coordinates. */
function isBackdropEvent(e: MouseEvent<HTMLDialogElement>) {
  if (e.target !== e.currentTarget) return false
  const { top, bottom, left, right } = e.currentTarget.getBoundingClientRect()
  const { clientX: x, clientY: y } = e
  return x < left || x > right || y < top || y > bottom
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const pressStartedOnBackdrop = useRef(false)

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
      onPointerDown={(e) => {
        pressStartedOnBackdrop.current = isBackdropEvent(e)
      }}
      onClick={(e) => {
        // A drag that starts inside the dialog and ends on the backdrop also clicks the dialog,
        // so the press must have started on the backdrop too.
        if (pressStartedOnBackdrop.current && isBackdropEvent(e)) onClose()
      }}
      className={`no-scrollbar m-auto rounded-[28px] border border-elevated bg-background p-7.75 text-white shadow-[0px_20px_50px_-10px_var(--shadow)] backdrop:bg-black/30 backdrop:backdrop-blur-[5px] ${className ?? ''}`}
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-7.75 top-7.75 cursor-pointer text-white"
      >
        <CloseIcon className="size-6" />
      </button>
      {children}
    </dialog>
  )
}
