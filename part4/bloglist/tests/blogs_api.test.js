const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  // console.log(response.body)
  expect(response.body).toHaveLength(initialBlogs.length)
})

test('verify that blog object has id property', async () => {
  const response = await api.get('/api/blogs')
  // console.log(response.body)
  response.body.map(blog => {
    // console.log(blog.id)
    expect(blog.id).toBeDefined()
  })
})

test('new blog can be added', async () => {
  const newBlog = {
    title: "Testing the backend",
    author: "Tester",
    url: "https://fullstackopen.com/en/part4/testing_the_backend",
    likes: 42
  }
  
  // save the new blog to database
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // check the state in database
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length +1)

  // check that title of the added blog is in response
  const blogTitles = response.body.map(blog => blog.title)
  // console.log(blogTitles)
  expect(blogTitles).toContain('Testing the backend')
})

test('if likes property is missing, it will default to 0', async () => {
  const newBlog = {
    title: "No likes property",
    author: "Tester",
    url: "https://fullstackopen.com/en/part4/testing_the_backend"
  }

  // save the new blog to database
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  // check the state in database
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialBlogs.length +1)

  // check that likes of the added blog is 0
  const blog = response.body.find(blog => blog.title === newBlog.title)
  // console.log(blog)
  expect(blog.likes).toBe(0)
})


test('if title and url property are missing, respond should be 400 bad request', async () => {
  const newBlog = {
    author: "Tester",
    likes: 42
  }

  // save the new blog to database
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  // check the state in database
  const response = await api.get('/api/blogs')
  // console.log(response.body)
  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})