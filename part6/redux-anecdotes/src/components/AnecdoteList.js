import { useDispatch, useSelector } from "react-redux"
import { voteAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const anecdotesSate = useSelector(state => {
    if (filter === '')  return state.anecdotes
    // example: want only anecdotes with 5 votes
    // return state.anecdotes.filter(anecdote => anecdote.votes === 5)
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })

  const anecdotes = [...anecdotesSate]
  anecdotes.sort((a, b) => b.votes -a.votes )

  console.log('whole state', useSelector(state => state))

  const handleVote = (anecdote) => {
    const newAnecdoteObj = {...anecdote, votes: anecdote.votes + 1}
    dispatch(voteAnecdote(anecdote.id, newAnecdoteObj))
    dispatch(setNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList