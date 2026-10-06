import { useMutation } from "@tanstack/react-query";
import { api, toFormData } from "@/api/client";
import { Endpoint } from "@/api/endpoints";
import type { AuthResponse, RegisterInput } from "@/api/types";
import { useStoreSession } from "./useStoreSession";

export function useRegister() {
  const storeSession = useStoreSession();
  return useMutation({
    mutationFn: async (input: RegisterInput) =>
      (
        await api.post<{ data: AuthResponse }>(
          Endpoint.Register,
          toFormData({ ...input }),
        )
      ).data,
    onSuccess: storeSession,
  });
}
