import { useMutation } from "@tanstack/react-query";
import { api } from "../../client";
import { Endpoint } from "../../endpoints";
import type { AuthResponse, LoginInput } from "../../types";
import { useStoreSession } from "./useStoreSession";

export function useLogin() {
  const storeSession = useStoreSession();
  return useMutation({
    mutationFn: async (input: LoginInput) =>
      (await api.post<{ data: AuthResponse }>(Endpoint.Login, input)).data,
    onSuccess: storeSession,
  });
}
