import { Link } from 'react-router-dom'

const Navbar = ({ user, handleLogout }) => {
  if (user === null) return <></>

  return (
    <>
      <Link to={'/blogs'}>blogs </Link>
      <Link to={'/users'}>users </Link>
      {user.name} logged in{' '}
      <button onClick={() => handleLogout()}> Logout </button>
    </>
  )
}

export default Navbar
