import { create } from 'zustand'

export const useUnicafeStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    incrementGood: () => set(state => ({ good: state.good + 1 })),
    incrementNeutral: () => set(state => ({ neutral: state.neutral + 1 })),
    incrementBad: () => set(state => ({ bad: state.bad + 1 })),
    resetStats: () => set({ good: 0, neutral: 0, bad: 0 })
  }
}))

export const useUnicafeActions = () => useUnicafeStore(state => state.actions)