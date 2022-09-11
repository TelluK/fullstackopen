import { useDispatch } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    // console.log('addAnecdote', anecdote)
    dispatch(addNewAnecdote(anecdote))
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