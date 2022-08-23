const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)

const bcrypt = require('bcrypt')
const User = require('../models/user')

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

describe('delete blog post', () => {
  test('if id is valid, status code 204', async () => {
    const res = await api.get('/api/blogs')
    const blogsAtStart = res.body
  
    await api
      .delete(`/api/blogs/${blogsAtStart[0].id}`)
      .expect(204)
  
    // check the state in database
    const response = await api.get('/api/blogs')
    // console.log(response.body)
    expect(response.body).toHaveLength(initialBlogs.length -1)
  })
})

describe('update blog post', () => {
  test('update likes amount to be 42', async () => {
    const res = await api.get('/api/blogs')
    const blogsAtStart = res.body

    const blog = {
      title: blogsAtStart[0].title,
      author: blogsAtStart[0].author,
      url: blogsAtStart[0].url,
      likes: 42
    }
    // console.log('blog:', blog)

    const update = await api.put(`/api/blogs/${blogsAtStart[0].id}`).send(blog)
    expect(update.body.likes).toBe(blog.likes)
  })
})

describe('users in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test.only('can add new user', async () => {
    const usersAtStart = await api.get('/api/users')
    // console.log(usersAtStart.body)

    const newUser = {
      username: 'testUser',
      name: 'Tester',
      password: 'testerPassword',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await api.get('/api/users')
    // console.log(usersAtEnd.body)
    expect(usersAtEnd.body).toHaveLength(usersAtStart.body.length + 1)
  })

  test(`can't add new user with username that allready exists in db`, async () => {
    const usersAtStart = await api.get('/api/users')
    // console.log(usersAtStart.body)

    const newUser = {
      username: 'root',
      name: 'root user',
      password: 'rootUsersPassword',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      console.log(result.body.error)
      expect(result.body.error).toContain('username allready taken')
  })

  test(`can't add new user with too short username`, async () => {
    const usersAtStart = await api.get('/api/users')
    // console.log(usersAtStart.body)

    const newUser = {
      username: 'no',
      name: 'short username',
      password: 'Password',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      console.log(result.body.error)
      expect(result.body.error).toContain('username too short, min length is 3 char')
  })

  test(`can't add new user with too short password`, async () => {
    const usersAtStart = await api.get('/api/users')
    // console.log(usersAtStart.body)

    const newUser = {
      username: 'username',
      name: 'short password',
      password: 'no',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

      console.log(result.body.error)
      expect(result.body.error).toContain('password too short, min length is 3 char')
  })
})


afterAll(() => {
  mongoose.connection.close()
})