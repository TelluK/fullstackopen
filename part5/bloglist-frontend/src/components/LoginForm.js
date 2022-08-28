const LoginForm = ({
  username, 
  password,
  handleSubmit,
  handleUsernameChange,
  handlePasswordChange 
  }) => {
  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={ handleSubmit }>
        <div> username 
          <input
            type='text'
            value={username}
            name='username'
            onChange={ handleUsernameChange }
          ></input>
        </div>
        <div> password 
          <input
            type='text'
            value={password}
            name='password'
            onChange={ handlePasswordChange }
          ></input>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default LoginForm