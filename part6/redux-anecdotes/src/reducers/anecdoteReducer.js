// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

export const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  // console.log('state now: ', state)
  // console.log('action', action)
  switch (action.type) {
    case 'VOTE':
      const id = action.payload
      return state.map(anecdote => anecdote.id === id 
        ? { ...anecdote, votes: anecdote.votes + 1 } 
        : anecdote
      )
    case 'ADD_NEW':
      const anecdote = action.payload
      return [...state, anecdote]
    case 'SET_ANECDOTES':
      return action.payload
    default: 
      return state
  }
}

// action creator
export const addNewAnecdote = (anecdote) => {
  return {
    type: 'ADD_NEW',
    payload: anecdote
  }
}

// action creator
export const vote = (id) => {
  return {
    type: 'VOTE',
    payload: id
  }
}

// action creator
export const setAnecdotes = (anecdotes) => {
  return {
    type: 'SET_ANECDOTES',
    payload: anecdotes
  }
}

export default reducer