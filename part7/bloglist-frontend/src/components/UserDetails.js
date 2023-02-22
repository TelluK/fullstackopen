import { useLocation } from 'react-router-dom'

const UserDetails = () => {
  // get user from location state
  const location = useLocation()
  const user = location.state.user
  return (
    <>
      <h2>User: {user.name}</h2>
      {user.blogs.length > 0 ? (
        <>
          <h4>added blogs:</h4>
          <ul>
            {user.blogs.map((blog) => {
              return <li key={blog.id}>{blog.title}</li>
            })}
          </ul>
        </>
      ) : (
        <h4>No added blogs</h4>
      )}
    </>
  )
}

export default UserDetails
