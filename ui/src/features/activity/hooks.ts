import { useQuery } from "@tanstack/react-query";
import { getActivity } from "@/services/activity.api";
import { useAuthStore } from "@/store/authStore";

export function useActivity() {
  const userId = useAuthStore((s) => s.user?.id ?? "anon");
  return useQuery({
    queryKey: ["activity", userId],
    queryFn: () => getActivity(userId),
  });
}
