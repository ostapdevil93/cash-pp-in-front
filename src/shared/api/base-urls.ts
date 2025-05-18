/** Базовые URL микросервисов */
export const BASE_URLS = {
  CBS: import.meta.env.VITE_API_CBS,
  LINKS: import.meta.env.VITE_API_LINKS,
  NSI: import.meta.env.VITE_API_NSI,
  ORGANIZATIONS: import.meta.env.VITE_API_ORGANIZATIONS,
} as const;
