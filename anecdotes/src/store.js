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
    // Eliminar con backend
    remove: async (id) => {
      await anecdoteService.remove(id)
      set(state => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },
    setFilter: (value) => set({ filter: value })
  }
}))

export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore(state => state.anecdotes)
  const filter = useAnecdoteStore(state => state.filter)
  
  const filteredAnecdotes = filter 
    ? anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
    : anecdotes

  return filteredAnecdotes.toSorted((a, b) => b.votes - a.votes)
}

export const useAnecdoteActions = () => useAnecdoteStore(state => state.actions)