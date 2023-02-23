import { useState, useEffect } from 'react'
import userService from '../services/users'
import { Link } from 'react-router-dom'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService
      .getAll()
      .then((users) => setUsers(users))
      .catch((error) => {
        console.log('error', error)
      })
  }, [])

  return (
    <>
      <Typography variant='h5' align='left'>
        Users
      </Typography>
      <TableContainer component={Paper} elevation={10}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>name</TableCell>
              <TableCell align='left'>blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='left'>
                  <Link to={`${user.id}`} state={{ user: user }}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell align='left'>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Users
