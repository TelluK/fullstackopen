const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
/* 
With express-async-errors -library used in app.js we can eliminate the try-catch blocks completely in router.
If an exception occurs in an async route, the execution is automatically passed to the error handling middleware we use in app.js.
*/


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  // get token user from request object; middleware userExtractor in use
  const user = request.user

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
  // get token user from request object; middleware userExtractor in use
  const user = request.user

  const blog = await Blog.findById(request.params.id) 
  // console.log('Blog to be removed', blog)
  // console.log('user who added the blog ', blog.user.toString())

  if (blog && blog.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }

  response.status(401).json({ error: 'blog can be deleted only by the user who added the blog'})
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