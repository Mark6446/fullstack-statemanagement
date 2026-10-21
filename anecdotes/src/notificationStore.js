import { create } from 'zustand'

export const useNotificationStore = create((set, get) => ({
  message: null,
  timer: null,
  actions: {
    setNotification: (text) => {
      // Limpiamos el temporizador anterior si existe
      const currentTimer = get().timer
      if (currentTimer) clearTimeout(currentTimer)

      // Creamos el nuevo temporizador de 5 segundos
      const newTimer = setTimeout(() => {
        set({ message: null, timer: null })
      }, 5000)

      // Actualizamos el estado con el nuevo mensaje y el nuevo temporizador
      set({ message: text, timer: newTimer })
    }
  }
}))

export const useNotification = () => useNotificationStore(state => state.message)
export const useNotificationActions = () => useNotificationStore(state => state.actions)