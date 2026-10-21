import { useAnecdotes } from '../hooks/useAnecdotes'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const { newAnecdoteMutation } = useAnecdotes()
  const notify = useNotify()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          event.target.anecdote.value = ''
          notify(`anecdote '${content}' created`)
        },
        onError: () => {
          notify(`too short anecdote, must have length 5 or more`)
        }
      }
    )
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm