import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";

export function HomePage() {
  const { data } = useQuery({
    queryKey: ["hello"],
    queryFn: async () => "Query works",
  });

  const form = useForm({
    defaultValues: { name: "" },
    onSubmit: ({ value }) => console.log(value),
  });

  return <main className="p-4"></main>;
}
