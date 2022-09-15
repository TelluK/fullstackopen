import { createSlice } from "@reduxjs/toolkit";

const initialState =  'Welcome!'

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action) {
      // console.log('new notification:', action.payload)
      return action.payload
    },
    removeNotification() {
      return ''
    }
  }
})

let timeoutId = 0
// thunk
export const setNotification = (notification, seconds ) => {
  return async dispatch => {
    dispatch(createNotification(notification))
    if (timeoutId !== 0 ) {
      // console.log('clearTimeout, id:', timeoutId)
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = 0
      dispatch(removeNotification())
    }, seconds*1000);
    // console.log('timeoutId:', timeoutId)
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer