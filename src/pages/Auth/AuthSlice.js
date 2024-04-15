import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authService from '~/services/authService'
import { StorageKeys } from '~/utils/constants'

const signUp = createAsyncThunk('auth', async (payload, { rejectWithValue }) => {
  try {
    const { firstName, lastName, mobile, email, password } = payload
    return await authService.signUp({
      firstName,
      lastName,
      mobile,
      email,
      password
    })
  } catch (error) {
    return rejectWithValue(error)
  }
})

const signIn = createAsyncThunk('auth/signIn', async (payload) => {
  return await authService.signIn(payload)
})

const signOut = createAsyncThunk('auth/signOut', async () => {
  await authService.signOut()
  localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
})

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    current: {},
    settings: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { user, accessToken } = action.payload
      state.current = user
      localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken)
    })

    builder.addCase(signOut.fulfilled, (state) => {
      state.current = {}
    })
  }
})

const { reducer } = authSlice

export { signUp, signIn, signOut }

export default persistReducer({ key: 'user', storage }, reducer)
