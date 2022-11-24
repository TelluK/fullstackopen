import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          {' '}
          username
          <input
            id='username'
            type='text'
            value={username}
            name='username'
            onChange={handleUsernameChange}
          ></input>
        </div>
        <div>
          {' '}
          password
          <input
            id='password'
            type='text'
            value={password}
            name='password'
            onChange={handlePasswordChange}
          ></input>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
