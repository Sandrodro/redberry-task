import { useForm } from '@tanstack/react-form'
import { useQuery } from '@tanstack/react-query'

export function HomePage() {
  const { data } = useQuery({
    queryKey: ['hello'],
    queryFn: async () => 'Query works',
  })

  const form = useForm({
    defaultValues: { name: '' },
    onSubmit: ({ value }) => console.log(value),
  })

  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold">{data}</h1>
      <form
        className="mt-4 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.Field name="name">
          {(field) => (
            <input
              className="rounded border px-2 py-1"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        </form.Field>
        <button className="rounded bg-blue-600 px-3 py-1 text-white" type="submit">
          Submit
        </button>
      </form>
    </main>
  )
}
