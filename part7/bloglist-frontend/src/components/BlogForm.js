import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    // console.log('addBlog in BlogForm')
    const newBlog = {
      title: title,
      author: author,
      url: url,
    }
    createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title-input'
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author-input'
            type='text'
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url-input'
            type='text'
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id='submit-button' type='submit'>
          Create
        </button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
