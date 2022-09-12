import { useSelector } from "react-redux"

const Notification = () => {
  const notification = useSelector( state => state.notification)
  // const state = useSelector(state => state)
  // console.log('STATE:', state)
  // console.log('notification:', notification)

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification