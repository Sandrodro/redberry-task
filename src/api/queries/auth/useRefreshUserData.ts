import { useQueryClient } from "@tanstack/react-query";
import { authKeys } from "../../queryKeys";

/** Fields like `isNotified` and `isMine` depend on who is logged in, so refetch everything except auth after a login or logout. */
export function useRefreshUserData() {
  const queryClient = useQueryClient();
  return () =>
    queryClient.invalidateQueries({
      predicate: (query) => query.queryKey[0] !== authKeys._def[0],
    });
}
