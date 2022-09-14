import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

export const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    addNewAnecdote(state, action) {
      const anecdote = action.payload
      return [...state, anecdote]
    },
    vote(state, action) {
      const id = action.payload
      return state.map(anecdote => anecdote.id === id 
        ? { ...anecdote, votes: anecdote.votes + 1 } 
        : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, addNewAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// thunk
export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// thunk
export const createAnecdote = (anecdoteContent) => {
  return async dispatch => {
    const newAnecdoteObj = await anecdoteService.create(anecdoteContent)
    dispatch(addNewAnecdote(newAnecdoteObj))
  }
}

// thunk
export const voteAnecdote = (id, obj ) => {
  return async dispatch => {
    const newAnecdoteObj = await anecdoteService.update(id, obj)
    console.log('newAnecdoteObj', newAnecdoteObj)
    dispatch(vote(id))
  }
}
