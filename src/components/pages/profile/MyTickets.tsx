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

  function renderList(filter: TicketFilter, query: typeof upcoming) {
    if (query.isPending) return <Spinner className="mx-auto mt-10" />
    if (query.isLoadingError) {
      return (
        <ErrorState
          message="Could not load your tickets."
          onRetry={() => query.refetch()}
          isRetrying={query.isFetching}
        />
      )
    }
    if (query.data.length === 0) {
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
        {query.data.map((order) => (
          <MyTicketsCard
            key={order.id}
            order={order}
            error={errors[order.reference]}
            onRefund={() => setSelected(order)}
          />
        ))}
      </div>
    )
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
        <TabsContent value="upcoming">{renderList('upcoming', upcoming)}</TabsContent>
        <TabsContent value="past">{renderList('past', past)}</TabsContent>
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
