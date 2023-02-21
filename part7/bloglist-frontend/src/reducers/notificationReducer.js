const notificationReducer = (state = { message: null, type: null }, action) => {
  switch (action.type) {
    case 'NEW_MESSAGE':
      return action.payload
    case 'DELETE_MESSAGE':
      return action.payload
    default:
      return state
  }
}

export default notificationReducer

// ACTION CREATORS:

export const createMessage = (message, notificationType) => {
  return {
    type: 'NEW_MESSAGE',
    payload: {
      message,
      type: notificationType,
    },
  }
}

export const deleteMessage = () => {
  return {
    type: 'DELETE_MESSAGE',
    payload: { message: null, type: null },
  }
}
