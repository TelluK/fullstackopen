import axios from "axios";
const baseUrl = '/api/persons'

/**
 * @returns promise that contains response data
 */
const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}


/**
 * 
 * @param {*} newObject 
 * @returns promise that contains response data
 */
const create = (newObject) => {
  const req = axios.post(baseUrl, newObject)
  return req.then(res => res.data)
}

const deletePerson = (id) => {
  console.log('baseurl + id: ', `${baseUrl}/${id}`)
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(res => res)
}

const update = (id, newObject) => {
  const req = axios.put(`${baseUrl}/${id}`, newObject)
  return req.then(res => res)
}

export default { getAll, create, deletePerson, update}