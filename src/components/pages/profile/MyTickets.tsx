import { useState } from 'react'
import { useRefundOrder } from '@/api/queries/tickets/useRefundOrder'
import { useTicketsData } from '@/api/queries/tickets/useTicketsData'
import type { Order, TicketFilter } from '@/api/types'
import { ButtonLink } from '@/components/core/ButtonLink'
import { EmptyState } from '@/components/core/EmptyState'
import { ErrorState } from '@/components/core/ErrorState'
import { Spinner } from '@/components/core/Spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/Tabs'
import { TooltipProvider } from '@/components/core/Tooltip'
import { MyTicketsCard } from './MyTicketsCard'
import { RefundConfirmModal } from './RefundConfirmModal'

type TicketListProps = {
  filter: TicketFilter
  /** Refund error messages by order reference. */
  errors: Record<string, string>
  onRefund: (order: Order) => void
}

function TicketList({ filter, errors, onRefund }: TicketListProps) {
  const { data, isPending, isLoadingError, isFetching, refetch } = useTicketsData(filter)

  if (isPending) return <Spinner className="mx-auto mt-10" />
  if (isLoadingError) {
    return (
      <ErrorState
        message="Could not load your tickets."
        onRetry={() => refetch()}
        isRetrying={isFetching}
      />
    )
  }
  if (data.length === 0) {
    return filter === 'upcoming' ? (
      <EmptyState
        title="No upcoming tickets"
        description="Book a session and your tickets will show up here."
      >
        <ButtonLink to="/sessions" variant="tertiary" size="sm">
          Browse sessions
        </ButtonLink>
      </EmptyState>
    ) : (
      <EmptyState
        title="No past tickets"
        description="Tickets for sessions that already took place will show up here."
      />
    )
  }
  return (
    <div className="flex flex-col gap-5">
      {data.map((order) => (
        <MyTicketsCard
          key={order.id}
          order={order}
          error={errors[order.reference]}
          onRefund={() => onRefund(order)}
        />
      ))}
    </div>
  )
}

export function MyTickets() {
  const upcoming = useTicketsData('upcoming')
  const past = useTicketsData('past')
  const refund = useRefundOrder()
  const [selected, setSelected] = useState<Order | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  function handleConfirm() {
    if (!selected) return
    const { reference } = selected
    setErrors(({ [reference]: _cleared, ...rest }) => rest)
    refund.mutate(reference, {
      // The card shows the message, and its Refund button stays enabled, so the user can try again.
      onError: (error) => setErrors((current) => ({ ...current, [reference]: error.message })),
      onSettled: () => setSelected(null),
    })
  }

  return (
    <TooltipProvider>
      <Tabs defaultValue="upcoming" className="flex flex-col gap-5">
        <TabsList variant="pill">
          <TabsTrigger variant="pill" value="upcoming" count={upcoming.data?.length}>
            Upcoming
          </TabsTrigger>
          <TabsTrigger variant="pill" value="past" count={past.data?.length}>
            Past
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <TicketList filter="upcoming" errors={errors} onRefund={setSelected} />
        </TabsContent>
        <TabsContent value="past">
          <TicketList filter="past" errors={errors} onRefund={setSelected} />
        </TabsContent>
      </Tabs>
      <RefundConfirmModal
        order={selected}
        isPending={refund.isPending}
        onConfirm={handleConfirm}
        onClose={() => setSelected(null)}
      />
    </TooltipProvider>
  )
}
