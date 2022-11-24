// import dependencies
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// import react-testing methods
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// the component to test
import Blog from './Blog'

describe('Blog component', () => {
  const blog = {
    title: 'Fullstack open',
    author: 'University',
    likes: 42,
    url: 'https://fullstackopen.com/',
    user: {
      name: 'blog tester',
    },
  }
  const updateLikesMock = jest.fn()
  const removeBlogMock = jest.fn()
  const tokenUserMock = {}

  test('renders title and author, but does not render url or likes by default', () => {
    render(
      <Blog
        blog={blog}
        updateLikes={updateLikesMock}
        removeBlog={removeBlogMock}
        tokenUser={tokenUserMock}
      />
    )

    // screen.debug()
    const text = `${blog.title} ${blog.author}`
    // console.log('text:', text)
    const element = screen.getByText(text)
    // screen.debug(element)
    expect(element).toBeDefined()

    const element2 = screen.getByText(`${blog.url}`, { exact: false })
    // screen.debug(element2)
    expect(element2).toHaveStyle('display: none')
  })

  test('shows blog url and likes, when view button is clicked', async () => {
    render(
      <Blog
        blog={blog}
        updateLikes={updateLikesMock}
        removeBlog={removeBlogMock}
        tokenUser={tokenUserMock}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText(`${blog.url}`, { exact: false })
    // screen.debug(element)
    expect(element).toHaveStyle('display: block')

    const elementWithLikes = screen.getByText(`${blog.likes}`, { exact: false })
    expect(elementWithLikes).toHaveStyle('display: block')
  })

  test('when like button is clicked twice, event handler is called twice ', async () => {
    render(
      <Blog
        blog={blog}
        updateLikes={updateLikesMock}
        removeBlog={removeBlogMock}
        tokenUser={tokenUserMock}
      />
    )

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const element = screen.getByText(`${blog.url}`, { exact: false })
    // screen.debug(element)
    expect(element).toHaveStyle('display: block')

    await user.click(screen.getByText('like'))
    await user.click(screen.getByText('like'))

    expect(updateLikesMock.mock.calls).toHaveLength(2)
  })
})
