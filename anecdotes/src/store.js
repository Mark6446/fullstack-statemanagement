import { create } from 'zustand'
import anecdoteService from './services/anecdotes'

export const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',
  actions: {
    // Inicializar
    initialize: async () => {
      const anecdotes = await anecdoteService.getAll()
      set({ anecdotes })
    },
    // Añadir con backend
    add: async (content) => {
      const newAnecdote = await anecdoteService.createNew(content)
      set(state => ({
        anecdotes: state.anecdotes.concat(newAnecdote)
      }))
    },
    // Votar con backend
    vote: async (id) => {
      // Obtenemos la anécdota actual
      const anecdoteToChange = get().anecdotes.find(a => a.id === id)
      
      // La mandamos actualizada al servidor
      const updatedAnecdote = await anecdoteService.update(id, {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      })
      
      // Actualizamos el estado de Zustand
      set(state => ({
        anecdotes: state.anecdotes.map(a => a.id === id ? updatedAnecdote : a)
      }))
    },
    setFilter: (value) => set({ filter: value })
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  
  if (!filter) return anecdotes
  
  return anecdotes.filter(anecdote => 
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )
}

export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)