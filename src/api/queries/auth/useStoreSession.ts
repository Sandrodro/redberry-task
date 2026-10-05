import { useQueryClient } from "@tanstack/react-query";
import { storage } from "../../../utils/storage";
import { TOKEN_KEY } from "../../client";
import { authKeys } from "../../queryKeys";
import type { AuthResponse } from "../../types";
import { useRefreshUserData } from "./useRefreshUserData";

export function useStoreSession() {
  const queryClient = useQueryClient();
  const refreshUserData = useRefreshUserData();
  return ({ user, token }: AuthResponse) => {
    storage.set(TOKEN_KEY, token);
    queryClient.setQueryData(authKeys.me.queryKey, user);
    refreshUserData();
  };
}
