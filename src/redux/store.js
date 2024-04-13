import { configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'
import authReducer from '~/pages/Auth/AuthSlice'
import appReducer from '~/AppSlice'

const store = configureStore({
  reducer: {
    user: authReducer,
    app: appReducer
  }
})

const persistor = persistStore(store)
const { dispatch } = store

export { persistor, dispatch }

export default store
