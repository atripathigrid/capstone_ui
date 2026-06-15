import { useQuery } from '@tanstack/react-query';
import { sessionApi } from '@/services/api';

/** Authenticated session. Every other query is scoped to this user (RBAC). */
export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: sessionApi.me,
    staleTime: 5 * 60 * 1000,
  });
}
