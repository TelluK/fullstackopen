import axios from "axios"
const baseUrl = 'https://restcountries.com/v3.1/all'

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => {
    return res.data
  })
}

export default { getAll }