import { useDispatch } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"
import { createNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    // console.log('addAnecdote', anecdote)
    const newAnecdoteObj = await anecdoteService.create(anecdote)
    dispatch(addNewAnecdote(newAnecdoteObj))
    dispatch(createNotification(`you created new: ${anecdote}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit' >create</button>
    </form>
    </>
  )
}

export default AnecdoteForm