import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
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

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    current: {},
    settings: {}
  },
  reducers: {},
  extraReducers: () => {}
})

const { reducer } = authSlice

export { signUp }

export default reducer
