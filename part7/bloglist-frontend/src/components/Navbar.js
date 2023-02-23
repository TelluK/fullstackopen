import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

const Navbar = ({ user, handleLogout }) => {
  if (user === null) return <></>

  const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'left',
  })

  const StyledBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })

  const StyledButton = styled(Button)({
    backgroundColor: '#008394',
    '&:hover': {
      backgroundColor: '#008394',
    },
    padding: '6px 12px',
    textTransform: 'none',
    fontSize: 16,
  })

  return (
    <AppBar position={'static'} style={{ background: '#618833' }}>
      <StyledToolbar>
        <StyledBox>
          <MenuItem component={Link} to='/blogs'>
            blogs
          </MenuItem>
          <MenuItem component={Link} to='/users'>
            users
          </MenuItem>
          <Typography>
            {user.name} logged in{' '}
            <StyledButton variant='contained' onClick={() => handleLogout()}>
              Logout
            </StyledButton>
          </Typography>
        </StyledBox>
      </StyledToolbar>
    </AppBar>
  )
}

export default Navbar
