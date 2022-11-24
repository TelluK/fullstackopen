describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const newUser = {
      name: 'Cypress tester',
      username: 'cypTest',
      password: 'CypressPass'
    }
    cy.request('POST', 'http://localhost:3003/api/users', newUser)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('login').click()
  })

  it('front page can be opened', function() {
    cy.contains('Blogs')
    cy.contains('login').click()
  })


  describe('Login', function() {
    const user = {
      name: 'Cypress tester',
      username: 'cypTest',
      password: 'CypressPass'
    }
    it('succeeds with correct credentials', function() {
      cy.contains('Blogs')
      cy.contains('login').click()
      cy.get('#username').type(`${user.username}`)
      cy.get('#password').type(`${user.password}`)
      cy.contains('Login').click()
      cy.contains('Log out')
      cy.contains(`${user.name} logged in`)
    })

    it('fails with wrong credentials', function() {
      cy.contains('login').click()
      cy.get('#username').type('wrong username')
      cy.get('#password').type('wrong password')
      cy.contains('Login').click()

      cy.get('#message')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)') // red color when error
    })


    describe('When logged in', function() {
      beforeEach(function() {
        const user = {
          name: 'Cypress tester',
          username: 'cypTest',
          password: 'CypressPass'
        }
        cy.login({ username: user.username, password: user.password })
      })

      it('a blog can be created', function() {
        cy.contains(`${user.name} logged in`)
        cy.contains('create new blog').click()
        cy.get('#title-input').type('cypress title')
        cy.get('#author-input').type('cypress author')
        cy.get('#url-input').type('url with cypress')
        cy.get('#submit-button').click()

        cy.get('.blog-div1')
          .should('contain', 'cypress title')
          .and('contain', 'cypress author')
      })

      describe('and 2 blogs already has been added', function() {
        beforeEach( function () {
          cy.createBlog({ title: 'cypress title', author: 'cypress author', url: 'url with cypress' })
          cy.createBlog({ title: 'cypress2', author: 'cypress2', url: 'url2' })
        })
        it('a blog can be liked', function() {
          cy.get('.blog-div1')
            .should('contain', 'cypress title')
            .and('contain', 'cypress author')

          cy.get('button:contains("view")').then( buttons => {
            console.log('number of view buttons', buttons.length)
          })

          cy.get('.view-button').click({ multiple: true })
          cy.get('.like-button').click({ multiple: true })

          cy.wait(1000)

          cy.get('button:contains("hide")').then( buttons => {
            console.log('number of hide buttons', buttons.length)
          })
        })

        it('user who created blog, can delete it', function() {
          cy.get('.view-button').click({ multiple: true })
          cy.get('.remove-button').click({ multiple: true })

          cy.wait(1000)

          cy.get('#message')
            .should('contain', 'Removed blog')
            .and('have.css', 'color', 'rgb(0, 128, 0)') // green color when ok
        })
      })
    })
  })
})