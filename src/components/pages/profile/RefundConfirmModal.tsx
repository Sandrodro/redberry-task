import type { Order } from '@/api/types'
import { Button } from '@/components/core/Button'
import { Modal } from '@/components/core/Modal'
import { Typography } from '@/components/core/Typography'

type RefundConfirmModalProps = {
  order: Order | null
  isPending: boolean
  onConfirm: () => void
  onClose: () => void
}

export function RefundConfirmModal({
  order,
  isPending,
  onConfirm,
  onClose,
}: RefundConfirmModalProps) {
  return (
    <Modal open={order !== null} onClose={onClose} className="w-100.75">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <Typography variant="h2">Refund this order?</Typography>
          <Typography variant="bodyM" className="text-muted">
            Order #{order?.reference} (₾{order?.totalPrice}) will be refunded and the seats
            released. This cannot be undone.
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button variant="tertiary" onClick={onClose} disabled={isPending} className="flex-1">
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isPending} className="flex-1">
            Refund
          </Button>
        </div>
      </div>
    </Modal>
  )
}
