import { useState } from "react"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)
  const [buttonLabel, setButtonLabel] = useState('view')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const changeVisibility = () => {
    setVisible(!visible)
    buttonLabel === 'view' ? setButtonLabel('hide') : setButtonLabel('view')
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
          <button>like</button>
        </div>
        <div>{blog.user.name}</div>
      </div>
    </>
    )
}

export default Blog