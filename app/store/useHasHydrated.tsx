import { useShortlistStore } from './useShortlistStore'

export function useShortlistHydrated() {
  return useShortlistStore((s) => s.hasHydrated)
}