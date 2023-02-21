import { useSelector } from 'react-redux'

// const Notification = ({ message, type }) => {
const Notification = () => {
  const { message, type } = useSelector((state) => state)

  if (message === null) return null

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontStyle: 'bold',
    fontSize: 20,
    borderStyle: 'solid',
    padding: 10,
  }

  return (
    <div id='message' style={style}>
      {message}
    </div>
  )
}

export default Notification
