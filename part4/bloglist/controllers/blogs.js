const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
/* 
With express-async-errors -library used in app.js we can eliminate the try-catch blocks completely in router.
If an exception occurs in an async route, the execution is automatically passed to the error handling middleware we use in app.js.
*/

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // console.log("---------blogRouter.post-----decodedToken:", decodedToken)

  // if token is verified to be valid:
  // decodedToken object contains the username and id fields, now server knows who made the request

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)
  // console.log(user)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  // console.log('BLOGS IS:', user.blogs)
  await user.save()
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body
    // console.log('request.body', request.body)
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

 let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  // console.log('updatedBlog: ', updatedBlog)
  response.json(updatedBlog)
})

module.exports = blogRouter