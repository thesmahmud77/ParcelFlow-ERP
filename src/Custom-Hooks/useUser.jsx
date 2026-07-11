"use client";

import { useSession } from "@/lib/auth-client";

export const useUser = () => {
  const { data: session, isPending, error, refetch } = useSession();

  return {
    user: session?.user || null,
    session: session || null,
    isLoading: isPending,
    isLoggedIn: !!session,
    role: session?.user?.role || "user",
    error,
    refetch,
  };
};
