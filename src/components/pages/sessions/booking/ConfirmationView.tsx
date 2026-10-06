import { useNavigate } from '@tanstack/react-router'
import type { Order } from '@/api/types'
import CheckIcon from '@/assets/icons/check.svg?react'
import { Badge } from '@/components/core/Badge'
import { Button } from '@/components/core/Button'
import { Typography } from '@/components/core/Typography'
import { OrderSummary } from './OrderSummary'

type ConfirmationViewProps = {
  order: Order
  onClose: () => void
}

export function ConfirmationView({ order, onClose }: ConfirmationViewProps) {
  const navigate = useNavigate()

  return (
    <div className="mx-auto flex w-110 flex-col items-center gap-6 py-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="flex size-14 items-center justify-center rounded-full bg-success text-white">
          <CheckIcon className="size-7" />
        </span>
        <Typography variant="h1" as="h2">
          Booking confirmed!
        </Typography>
        <Typography variant="bodyM" className="text-muted">
          Your tickets are ready. We&apos;ve sent the confirmation to your email.
        </Typography>
        <Badge tone="elevated" className="uppercase">
          Order #{order.reference}
        </Badge>
      </div>
      <div className="w-full">
        <OrderSummary
          session={order.session}
          seats={order.tickets.map((ticket) => ({ code: ticket.seatCode, ticketType: ticket.ticketType }))}
          total={{ label: 'Total paid', value: order.totalPrice }}
          showPoster
        />
      </div>
      <div className="flex gap-3">
        <Button
          onClick={() => {
            onClose()
            navigate({ to: '/profile' })
          }}
        >
          My Tickets
        </Button>
        <Button variant="tertiary" onClick={onClose}>
          Close
        </Button>
      </div>
    </div>
  )
}
