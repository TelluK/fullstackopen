import { useState } from "react"

const Blog = ({blog, updateLikes, removeBlog, tokenUser}) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const changeVisibility = () => {
    setVisible(!visible)
    buttonLabel === 'view' ? setButtonLabel('hide') : setButtonLabel('view')
  }

  const handleUpdate = () => {
    // console.log('handleUpdate; blog details before update:', blog)
    const updatedBlog = { ...blog, likes : blog.likes +1}
    updateLikes(updatedBlog)
  }

  const handleRemove = () => {
    // console.log('handle remove blog', blog)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      removeBlog(blog.id)
    }
  }

  // console.log('BLOG:', blog)

  return (
    <>
      <div>
        <br></br>
        {blog.title} {blog.author}
        <button onClick={changeVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <div> likes: 
          {blog.likes}
          <button onClick={handleUpdate}>like</button>
        </div>
        <div>{blog.user.name}</div>
        {tokenUser.username === blog.user.username ? 
          <button onClick={handleRemove}>remove</button>
          : <></>
        }
      </div>
    </>
    )
}

export default Blog