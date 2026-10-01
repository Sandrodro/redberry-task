import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { tokenStorage } from "../../utils/tokenStorage";
import { ApiError, apiData } from "../client";
import { Endpoint } from "../endpoints";
import type { AuthResponse, LoginInput, RegisterInput, User } from "../types";

export const meQueryOptions = queryOptions({
  queryKey: ["me"],
  queryFn: async () => {
    try {
      return await apiData<User>(Endpoint.Me);
    } catch (error) {
      // A 401 means the stored token is stale. Drop it and act as a guest.
      if (error instanceof ApiError && error.status === 401)
        tokenStorage.clear();
      throw error;
    }
  },
});

/** The signed in user. Does not fetch when no token is stored. */
export function useMe() {
  return useQuery({ ...meQueryOptions, enabled: !!tokenStorage.get() });
}

function useStoreSession() {
  const queryClient = useQueryClient();
  return ({ user, token }: AuthResponse) => {
    tokenStorage.set(token);
    queryClient.setQueryData(meQueryOptions.queryKey, user);
  };
}

export function useLogin() {
  const storeSession = useStoreSession();
  return useMutation({
    mutationFn: (input: LoginInput) =>
      apiData<AuthResponse>(Endpoint.Login, { method: "POST", json: input }),
    onSuccess: storeSession,
  });
}

export function useRegister() {
  const storeSession = useStoreSession();
  return useMutation({
    mutationFn: (input: RegisterInput) =>
      apiData<AuthResponse>(Endpoint.Register, {
        method: "POST",
        form: { ...input },
      }),
    onSuccess: storeSession,
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => apiData<void>(Endpoint.Logout, { method: "POST" }),
    // Clear the token whether or not the request succeeded.
    onSettled: () => {
      tokenStorage.clear();
      queryClient.removeQueries({ queryKey: meQueryOptions.queryKey });
      queryClient.removeQueries({ queryKey: ["tickets"] });
    },
  });
}
