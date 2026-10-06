import { useMutation } from "@tanstack/react-query";
import { api } from "@/api/client";
import { Endpoint } from "@/api/endpoints";
import type { AuthResponse, LoginInput } from "@/api/types";
import { useStoreSession } from "./useStoreSession";

export function useLogin() {
  const storeSession = useStoreSession();
  return useMutation({
    mutationFn: async (input: LoginInput) =>
      (await api.post<{ data: AuthResponse }>(Endpoint.Login, input)).data,
    onSuccess: storeSession,
  });
}
