import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  // console.log('setToken')
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log('create, response.data', response.data)
  return response.data
}

export default { getAll, setToken, create }