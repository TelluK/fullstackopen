import axios from 'axios'
import { getId } from '../reducers/anecdoteReducer'

const baseUrl =  'http://localhost:3001/anecdotes'

/**
 * Start json Server with command: npm run server
 * Json server uses db.json file, that has initial anecdote values 
*/

const getAll = async () => {
   const response = await axios.get(baseUrl)
  return response.data
}

const create = async (anecdoteContent) => {
  // console.log('create', anecdoteContent)
  const newObject = {
    content: anecdoteContent,
    id: getId(),
    votes : 0
  }
  const response = await axios.post(baseUrl, newObject)
  return  response.data
}

export default { getAll, create}