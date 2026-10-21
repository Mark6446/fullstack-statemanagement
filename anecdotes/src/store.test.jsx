import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAnecdoteStore, useAnecdotes, useAnecdoteActions } from './store'
import anecdoteService from './services/anecdotes'

vi.mock('./services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn(),
    remove: vi.fn()
  }
}))

describe('Anecdote Store', () => {
  const mockAnecdotes = [
    { id: '1', content: 'First anecdote', votes: 1 },
    { id: '2', content: 'Second anecdote', votes: 10 },
    { id: '3', content: 'Third anecdote', votes: 5 }
  ]

  beforeEach(() => {
    useAnecdoteStore.setState({ anecdotes: [], filter: '' })
    vi.clearAllMocks()
  })

  // Inicialización
  it('initializes state with anecdotes from backend', async () => {
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)
    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.initialize()
    })

    const state = useAnecdoteStore.getState()
    expect(state.anecdotes).toEqual(mockAnecdotes)
  })

  // Ordenación por votos
  it('returns anecdotes sorted by votes', () => {
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes })
    const { result } = renderHook(() => useAnecdotes())
    
    // Debería devolver 10 votos, luego 5, luego 1
    expect(result.current[0].content).toBe('Second anecdote')
    expect(result.current[1].content).toBe('Third anecdote')
    expect(result.current[2].content).toBe('First anecdote')
  })

  // Filtrado correcto
  it('returns properly filtered list of anecdotes', () => {
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: 'third' })
    const { result } = renderHook(() => useAnecdotes())
    
    expect(result.current).toHaveLength(1)
    expect(result.current[0].content).toBe('Third anecdote')
  })

  // Votar incrementa el contador
  it('voting increases the number of votes for an anecdote', async () => {
    // Empezamos con una anécdota que tiene 1 voto
    useAnecdoteStore.setState({ anecdotes: [mockAnecdotes[0]] })
    
    // Le decimos al mock que el servidor devolverá la anécdota con 2 votos
    const updatedAnecdote = { ...mockAnecdotes[0], votes: 2 }
    anecdoteService.update.mockResolvedValue(updatedAnecdote)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => {
      await result.current.vote('1')
    })

    const state = useAnecdoteStore.getState()
    expect(state.anecdotes[0].votes).toBe(2)
  })
})