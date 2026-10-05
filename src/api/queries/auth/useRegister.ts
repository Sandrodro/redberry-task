import { useMutation } from "@tanstack/react-query";
import { api, toFormData } from "../../client";
import { Endpoint } from "../../endpoints";
import type { AuthResponse, RegisterInput } from "../../types";
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
