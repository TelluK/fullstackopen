import { useDispatch, useSelector } from "react-redux"
import { vote } from "../reducers/anecdoteReducer"
import { createNotification, removeNotification } from "../reducers/notificationReducer"


const AnecdoteList = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)

  const anecdotes = useSelector(state => {
    if (filter === '')  return state.anecdotes
    // example: want only anecdotes with 5 votes
    // return state.anecdotes.filter(anecdote => anecdote.votes === 5)
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
  })
  anecdotes.sort((a, b) => b.votes -a.votes )

  console.log('whole state', useSelector(state => state))

  const handleVote = (id, content) => {
    dispatch(vote(id))
    dispatch(createNotification(`you voted: '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000);
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
            <button onClick={() => handleVote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList