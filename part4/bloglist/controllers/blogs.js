const blogRouter = require('express').Router()
const Blog = require('../models/blog')

/* 
With express-async-errors -library used in app.js we can eliminate the try-catch blocks completely in router.
If an exception occurs in an async route, the execution is automatically passed to the error handling middleware we use in app.js.
*/

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogRouter