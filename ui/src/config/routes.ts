// Route constants — the single source of truth for in-app navigation paths.
export const ROUTES = {
  dashboard: "/",
  opportunities: "/opportunities",
  opportunityDetail: (opportunityId: string) => `/opportunities/${opportunityId}`,
  activity: "/activity",
} as const;

// Pattern strings for <Route path> definitions.
export const ROUTE_PATTERNS = {
  dashboard: "/",
  opportunities: "/opportunities",
  opportunityDetail: "/opportunities/:opportunityId",
  activity: "/activity",
} as const;
