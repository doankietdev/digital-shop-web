import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import authReducer from '~/pages/Auth/AuthSlice'

const store = configureStore({
  reducer: {
    user: authReducer
  }
})

const persistor = persistStore(store)
const { dispatch } = store

export { persistor, dispatch }

export default store
