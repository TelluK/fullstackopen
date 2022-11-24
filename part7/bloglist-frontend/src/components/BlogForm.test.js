// import dependencies
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
// import react-testing methods
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// the component to test
import BlogForm from './BlogForm'

describe('BlogForm component', () => {
  const createBlogMock = jest.fn()

  test('when form is submitted, event handler is called with right details', async () => {
    const { container } = render(<BlogForm createBlog={createBlogMock} />)
    // screen.debug()

    const titleInput = container.querySelector('#title-input')
    await userEvent.type(titleInput, 'new title')

    const authorInput = container.querySelector('#author-input')
    await userEvent.type(authorInput, 'new author')

    const urlInput = container.querySelector('#url-input')
    await userEvent.type(urlInput, 'www')

    const submitButton = screen.getByText('Create')
    await userEvent.click(submitButton)

    expect(createBlogMock.mock.calls).toHaveLength(1)
    expect(createBlogMock.mock.calls[0][0].title).toBe('new title')
    expect(createBlogMock.mock.calls[0][0].author).toBe('new author')
    expect(createBlogMock.mock.calls[0][0].url).toBe('www')
  })
})
