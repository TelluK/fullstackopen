import { Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import Navbar from './components/Navbar'

import blogService from './services/blogs'
import loginService from './services/login'

import { createMessage, deleteMessage } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // notification types: error, info

  const BLOG_USER_IN_STORAGE = 'loggedBlogAppUser'

  const blogFormRef = useRef()

  // hook is executed when app component is rendered for the first time and when user state changes
  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)))
      .catch((error) => {
        console.log('error', error)
      })
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
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(BLOG_USER_IN_STORAGE, JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      showMessage('Logged in', 'info')
      setPassword('')
      setUsername('')
    } catch (error) {
      showMessage(error.response.data.error, 'error')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem(BLOG_USER_IN_STORAGE)
    setUser(null)
  }

  const addBlog = async (newBlogObject) => {
    try {
      const returnedBlog = await blogService.create(newBlogObject)
      setBlogs(blogs.concat(returnedBlog))
      showMessage(
        `new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        'info'
      )
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      showMessage(error.response.data.error, 'error')
    }
  }

  const updateLikes = async (updatedBlog) => {
    try {
      const returnedBlog = await blogService.update(updatedBlog)
      setBlogs(
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
      showMessage(`blog ${returnedBlog.title} updated`, 'info')
    } catch (error) {
      showMessage(error.response.data.error, 'error')
    }
  }

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id)
      showMessage('Removed blog', 'info')
      setBlogs(blogs.filter((blog) => blog.id !== id))
    } catch (error) {
      showMessage(error.response.data.error, 'error')
    }
  }

  const showMessage = (message, type) => {
    dispatch(createMessage(message, type))
    setTimeout(() => {
      dispatch(deleteMessage())
    }, 3000)
  }

  return (
    <div>
      <Navbar user={user} handleLogout={handleLogout} />
      <h2>Blog app</h2>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel='login'>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <br></br>
          <Routes>
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<UserDetails />} />
            <Route
              path='/blogs'
              element={
                <>
                  <h2>Blogs</h2>
                  {blogs.map((blog) => (
                    <p key={blog.id}>
                      <Link to={`${blog.id}`} state={{ blog: blog }}>
                        {blog.title}
                      </Link>
                    </p>
                  ))}
                </>
              }
            />
            <Route
              path='/blogs/:id'
              element={
                <Blog
                  updateLikes={updateLikes}
                  removeBlog={removeBlog}
                  tokenUser={user}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
