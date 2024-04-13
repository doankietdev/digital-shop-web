import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authService from '~/services/authService'

const signUp = createAsyncThunk('auth', async (payload) => {
  const { firstName, lastName, mobile, email, password } = payload
  return await authService.signUp({
    firstName,
    lastName,
    mobile,
    email,
    password
  })
})

const signIn = createAsyncThunk('auth', async (payload) => {
  return await authService.signIn(payload)
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    current: {},
    settings: {},
    accessToken: ''
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { user, accessToken } = action.payload
      state.current = user
      state.accessToken = accessToken
    })
  }
})

const { reducer } = authSlice

export { signUp, signIn }

export default persistReducer({ key: 'user', storage }, reducer)
