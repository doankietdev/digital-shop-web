import { configureStore } from '@reduxjs/toolkit'
import authReducer from '~/pages/Auth/AuthSlice'

const store = configureStore({
  reducer: {
    user: authReducer
  }
})

export const { dispatch } = store

export default store
