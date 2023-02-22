import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

const Blog = ({ updateLikes, removeBlog, tokenUser }) => {
  // get blog from location state
  const location = useLocation()
  const blog = location.state.blog

  const handleUpdate = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    updateLikes(updatedBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <>
      <div className='blog-div1'>
        <h2>
          {blog.title} {blog.author}
        </h2>
      </div>
      <div className='blog-div2'>
        {blog.url}
        <div>
          {' '}
          likes: {blog.likes}{' '}
          <button className='like-button' onClick={handleUpdate}>
            like
          </button>
        </div>
        <div>added by {blog.user.name}</div>
        {tokenUser.username === blog.user.username ? (
          <button className='remove-button' onClick={handleRemove}>
            remove
          </button>
        ) : (
          <></>
        )}
      </div>
    </>
  )
}

Blog.propTypes = {
  updateLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  tokenUser: PropTypes.object.isRequired,
}

export default Blog
