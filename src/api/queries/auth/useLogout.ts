import { useMutation, useQueryClient } from "@tanstack/react-query";
import { storage } from "../../../utils/storage";
import { api, TOKEN_KEY } from "../../client";
import { Endpoint } from "../../endpoints";
import { authKeys, ticketsKeys } from "../../queryKeys";

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => api.post<void>(Endpoint.Logout),
    // Clear the token whether or not the request succeeded.
    onSettled: () => {
      storage.remove(TOKEN_KEY);
      queryClient.setQueryData(authKeys.me.queryKey, null);
      queryClient.removeQueries({ queryKey: ticketsKeys._def });
    },
  });
}
