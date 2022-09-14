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

// thunk
export const setNotification = (notification, seconds ) => {
  return async dispatch => {
    dispatch(createNotification(notification))
    setTimeout(() => {
      dispatch(removeNotification())
    }, seconds*1000);
  }
}

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer