import { useState } from 'react'
import { ApiError } from '@/api/client'
import { useRefundOrder } from '@/api/queries/tickets/useRefundOrder'
import { useTicketsData } from '@/api/queries/tickets/useTicketsData'
import type { Order } from '@/api/types'
import { Spinner } from '@/components/core/Spinner'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/core/Tabs'
import { TooltipProvider } from '@/components/core/Tooltip'
import { Typography } from '@/components/core/Typography'
import { MyTicketsCard } from './MyTicketsCard'
import { RefundConfirmModal } from './RefundConfirmModal'

type Filter = 'upcoming' | 'past'

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
      onError: (error) => {
        if (error instanceof ApiError && error.status === 422) {
          setErrors((current) => ({ ...current, [reference]: error.message }))
        }
      },
      onSettled: () => setSelected(null),
    })
  }

  function renderList(filter: Filter, query: typeof upcoming) {
    if (query.isPending) return <Spinner className="mx-auto mt-10" />
    if (!query.data?.length) {
      return (
        <Typography variant="bodyM" className="text-muted">
          No {filter} tickets
        </Typography>
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
