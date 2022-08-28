import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // notification types: error, info
  const [notificationType, setNotificationType] = useState(null)
  const [message, setMessage] = useState(null)

  const BLOG_USER_IN_STORAGE = 'loggedBlogAppUser'

  const blogFormRef = useRef()

  // hook is executed when app component is rendered for the first time and when user state changes
  useEffect(() => {
    // console.log('useEffect, blogService.getAll()')
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(BLOG_USER_IN_STORAGE)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
   }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('handle Login')
    try {
      const user = await loginService.login( { username, password })
      window.localStorage.setItem( BLOG_USER_IN_STORAGE, JSON.stringify(user))
      // console.log('USER:', user)
      blogService.setToken(user.token)
      setUser(user)
      showMessage('Logged in', 'info')
      setPassword('')
      setUsername('')
    } catch (error) {
      // console.log('catch (error)', error)
      // console.log('ERROR:', error.response.data.error)
      showMessage(error.response.data.error, 'error')
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem(BLOG_USER_IN_STORAGE)
    setUser(null)
  }

  const addBlog = async (newBlogObject) => {
    console.log('addBlog IN APP', newBlogObject)
    try {
      const returnedBlog = await blogService.create(newBlogObject)
      // console.log('addBlog, response', returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      showMessage(`new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'info')
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      // console.log('catch (error)', error)
      // console.log('ERROR:', error.response.data.error)
      showMessage(error.response.data.error, 'error')
    }
  }

  const showMessage = (message, type) => {
    console.log('showMessage')
    setMessage(message)
    setNotificationType(type)
    setTimeout(() => {
      setMessage(null)
      setNotificationType(null)
    }, 3000);
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} type={notificationType} />
      {user === null ? 
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      : 
        <div>
          <p>
            {user.name} logged in 
            <button onClick={ () => handleLogout() }>Log out</button>
          </p>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
          <br></br>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      }
    </div>
  )
}

export default App
