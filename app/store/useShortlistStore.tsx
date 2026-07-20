// store/useShortlistStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ShortlistState {
  shortlisted: Record<string, boolean>
  hasHydrated: boolean
  toggle: (talentId: string) => void
  isShortlisted: (talentId: string) => boolean
  setHasHydrated: (state: boolean) => void
}

export const useShortlistStore = create<ShortlistState>()(
  persist(
    (set, get) => ({
      shortlisted: {},
      hasHydrated: false,
      toggle: (talentId) =>
        set((state) => {
          const next = { ...state.shortlisted }
          if (next[talentId]) {
            delete next[talentId]
          } else {
            next[talentId] = true
          }
          return { shortlisted: next }
        }),
      isShortlisted: (talentId) => !!get().shortlisted[talentId],
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: 'talent-shortlist',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)