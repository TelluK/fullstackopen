import { useState, useEffect } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then((users) => setUsers(users))
      .catch((error) => {
        console.log('error', error)
      })
  }, [])

  return (
    <>
      <h2>Users</h2>
      {users ? (
        <table>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>
                  <Link to={`${user.id}`} state={{ user: user }}>
                    {user.name}
                  </Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            )
          })}
        </table>
      ) : (
        <></>
      )}
    </>
  )
}

export default Users
