import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import authReducer from '~/pages/Auth/AuthSlice'
import appReducer from '~/AppSlice'

const store = configureStore({
  reducer: {
    user: authReducer,
    app: appReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

const persistor = persistStore(store)
const { dispatch } = store

export { persistor, dispatch }

export default store
