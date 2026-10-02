import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { storage } from "../../utils/storage";
import { ApiError, api, toFormData, TOKEN_KEY } from "../client";
import { Endpoint } from "../endpoints";
import type { AuthResponse, LoginInput, RegisterInput, User } from "../types";

export const meQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: async () => {
    try {
      return (await api.get<{ data: User }>(Endpoint.Me)).data;
    } catch (error) {
      // A 401 means the stored token is stale. Drop it and act as a guest.
      if (error instanceof ApiError && error.status === 401)
        storage.remove(TOKEN_KEY);
      throw error;
    }
  },
});

/** The signed in user. Does not fetch when no token is stored. */
export function useMe() {
  return useQuery({ ...meQueryOptions, enabled: !!storage.get(TOKEN_KEY) });
}

function useStoreSession() {
  const queryClient = useQueryClient();
  return ({ user, token }: AuthResponse) => {
    storage.set(TOKEN_KEY, token);
    queryClient.setQueryData(meQueryOptions.queryKey, user);
  };
}

export function useLogin() {
  const storeSession = useStoreSession();
  return useMutation({
    mutationFn: async (input: LoginInput) =>
      (await api.post<{ data: AuthResponse }>(Endpoint.Login, input)).data,
    onSuccess: storeSession,
  });
}

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

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post<void>(Endpoint.Logout),
    // Clear the token whether or not the request succeeded.
    onSettled: () => {
      storage.remove(TOKEN_KEY);
      queryClient.removeQueries({ queryKey: meQueryOptions.queryKey });
      queryClient.removeQueries({ queryKey: ["tickets"] });
    },
  });
}
