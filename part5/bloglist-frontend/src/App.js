import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // for creating new blog:
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // notification types: error, info
  const [notificationType, setNotificationType] = useState(null)
  const [message, setMessage] = useState(null)

  const BLOG_USER_IN_STORAGE = 'loggedBlogAppUser'

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
    console.log('logout')
    window.localStorage.removeItem(BLOG_USER_IN_STORAGE)
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    // console.log('addBlog', title, author, url)

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    try {
      const returnedBlog = await blogService.create(newBlog)
      // console.log('addBlog, response', returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      showMessage(`new blog ${returnedBlog.title} by ${returnedBlog.author} added`, 'info')
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      // console.log('catch (error)', error)
      // console.log('ERROR:', error.response.data.error)
      showMessage(error.response.data.error, 'error')
    }
  }

  const blogForm = () => {
    // console.log('blogForm', title, author, url)
    return (
      <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title: 
          <input
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author: 
          <input
            type='text'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
      <br></br>
      </>
    )
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

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={message} type={notificationType} />
        <form onSubmit={handleLogin}>
          <div> username 
            <input
              type='text'
              value={username}
              name='username'
              onChange={ ({target}) => setUsername(target.value) }
            ></input>
          </div>
          <div> password 
            <input
              type='text'
              value={password}
              name='password'
              onChange={ ({target}) => setPassword(target.value) }
            ></input>
          </div>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={message} type={notificationType} />
      <div>
        <p>
          {user.name} logged in 
          <button onClick={ () => handleLogout() }>Log out</button>
        </p>
        {blogForm()}
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
