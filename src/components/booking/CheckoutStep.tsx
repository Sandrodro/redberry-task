import { ApiError } from '@/api/client'
import { useCreateOrder } from '@/api/queries/orders/useCreateOrder'
import type { Order, SeatHold, Session, User } from '@/api/types'
import { useAppForm } from '@/hooks/useAppForm'
import { getServerErrors } from '@/utils/form/getServerErrors'
import { checkoutSchema, type CheckoutValues } from '@/utils/schemas/checkoutSchema'
import { ErrorMessage } from '@/components/core/ErrorMessage'
import { Typography } from '@/components/core/Typography'
import { OrderSummary } from './OrderSummary'
import { StepLayout } from './StepLayout'
import { BookingStep } from './types'

const FORM_ID = 'checkout-form'

type CheckoutStepProps = {
  session: Session
  hold: SeatHold
  user: User
  onBackToSeats: () => void
  onPaid: (order: Order) => void
  onHoldExpired: () => void
  onSeatsLost: (codes: string[]) => void
}

export function CheckoutStep({
  session,
  hold,
  user,
  onBackToSeats,
  onPaid,
  onHoldExpired,
  onSeatsLost,
}: CheckoutStepProps) {
  const createOrder = useCreateOrder()
  const { fieldErrors } = getServerErrors(createOrder.error)
  const error = createOrder.error instanceof ApiError ? createOrder.error : null
  // A 422 with `errors` is shown on the fields. Everything else without a booking rule handler is shown here.
  const formMessage =
    error && !error.errors && ![409, 422].includes(error.status) ? error.message : null

  const form = useAppForm({
    defaultValues: {
      fullName: user.fullName ?? '',
      email: user.email,
      mobileNumber: user.mobileNumber ?? '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    } satisfies CheckoutValues,
    validators: { onMount: checkoutSchema, onChange: checkoutSchema },
    onSubmit: ({ value }) => submit(checkoutSchema.parse(value)),
  })

  function submit(input: ReturnType<typeof checkoutSchema.parse>) {
    if (createOrder.isPending) return
    createOrder.mutate(
      { holdId: hold.holdId, ...input },
      {
        onSuccess: onPaid,
        onError: (failure) => {
          if (!(failure instanceof ApiError)) return
          if (failure.status === 409) onSeatsLost(failure.contested ?? [])
          else if (failure.status === 422 && !failure.errors) onHoldExpired()
        },
      },
    )
  }

  return (
    <StepLayout
      step={BookingStep.Checkout}
      onSeatsClick={onBackToSeats}
      main={
        <form
          id={FORM_ID}
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
        >
          <form.AppField name="fullName">
            {(field) => <field.Input label="Full name" serverError={fieldErrors.fullName} />}
          </form.AppField>
          <div className="grid grid-cols-2 gap-6">
            <form.AppField name="email">
              {(field) => (
                <field.Input label="Email" type="email" serverError={fieldErrors.email} />
              )}
            </form.AppField>
            <form.AppField name="mobileNumber">
              {(field) => (
                <field.Input
                  label="Mobile number"
                  type="tel"
                  serverError={fieldErrors.mobileNumber}
                />
              )}
            </form.AppField>
          </div>
          <hr className="h-px border-0 bg-card" />
          <form.AppField name="cardNumber">
            {(field) => (
              <field.Input
                label="Card number"
                inputMode="numeric"
                placeholder="e.g. 1234 4567 8901 2345"
                serverError={fieldErrors.cardNumber}
              />
            )}
          </form.AppField>
          <div className="grid grid-cols-2 gap-6">
            <form.AppField name="expiry">
              {(field) => (
                <field.Input
                  label="Expiry"
                  placeholder="e.g. 12/34"
                  serverError={fieldErrors.expiry}
                />
              )}
            </form.AppField>
            <form.AppField name="cvv">
              {(field) => (
                <field.Input
                  label="CVV"
                  inputMode="numeric"
                  placeholder="e.g. 123"
                  serverError={fieldErrors.cvv}
                />
              )}
            </form.AppField>
          </div>
          <ErrorMessage message={formMessage} />
        </form>
      }
      aside={
        <>
          <Typography variant="button">Summary</Typography>
          <OrderSummary session={session} seats={hold.seats} />
          <div className="mt-auto flex flex-col gap-3 pt-2.5">
            <div className="flex items-center justify-between px-1.25">
              <Typography variant="labelS">SUBTOTAL</Typography>
              <Typography variant="h1" as="span">
                ₾ {hold.subtotal}
              </Typography>
            </div>
            <form.AppForm>
              <form.SubmitButton
                form={FORM_ID}
                isPending={createOrder.isPending}
                pendingLabel="Processing..."
                className="w-full"
              >
                Pay & Complete Order
              </form.SubmitButton>
            </form.AppForm>
          </div>
        </>
      }
    />
  )
}
