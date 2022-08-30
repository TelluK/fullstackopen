const Notification = ({ message, type }) => {
  if (message === null) return null

  console.log('notification message;', message, ', type:', type )

  const style = {
    color: type === 'error' ? 'red' : 'green',
    background: 'lightgrey',
    fontStyle: 'bold',
    fontSize: 20,
    borderStyle: 'solid',
    padding: 10
  }

  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification