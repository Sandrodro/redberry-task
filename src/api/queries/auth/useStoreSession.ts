import { useQueryClient } from "@tanstack/react-query";
import { storage } from "../../../utils/storage";
import { TOKEN_KEY } from "../../client";
import { authKeys } from "../../queryKeys";
import type { AuthResponse } from "../../types";

export function useStoreSession() {
  const queryClient = useQueryClient();
  return ({ user, token }: AuthResponse) => {
    storage.set(TOKEN_KEY, token);
    queryClient.setQueryData(authKeys.me.queryKey, user);
  };
}
