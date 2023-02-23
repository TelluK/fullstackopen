import { useLocation } from 'react-router-dom'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

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
          <List dense={false}>
            {user.blogs.map((blog) => {
              return (
                <ListItem key={blog.id}>
                  <ListItemText primary={`${blog.title}`} />
                </ListItem>
              )
            })}
          </List>
        </>
      ) : (
        <h4>No added blogs</h4>
      )}
    </>
  )
}

export default UserDetails
