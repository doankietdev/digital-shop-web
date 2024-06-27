import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authService from '~/services/authService'
import userService from '~/services/userService'
import { StorageKeys } from '~/utils/constants'

const signUp = createAsyncThunk(
  'auth',
  async (payload, { rejectWithValue }) => {
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
  }
)

const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload, { rejectWithValue }) => {
    try {
      return await authService.signIn(payload)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const signOut = createAsyncThunk(
  'auth/signOut',
  async (payload, { rejectWithValue }) => {
    try {
      await authService.signOut()
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (payload, { rejectWithValue }) => {
    try {
      await authService.verifyEmail(payload)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const getCurrentUser = createAsyncThunk(
  'auth/verifyEmail',
  async (payload, { rejectWithValue }) => {
    try {
      return await userService.getCurrentUser()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    current: {},
    settings: {}
  },
  reducers: {
    clear: (state) => {
      state.current = {}
      state.settings = {}
    }
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      const { user, accessToken } = action.payload
      state.current = user
      localStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken)
    })

    builder.addCase(signOut.rejected, (state) => {
      state.current = {}
      state.settings = {}
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
    })
    builder.addCase(signOut.fulfilled, (state) => {
      state.current = {}
      state.settings = {}
      localStorage.removeItem(StorageKeys.ACCESS_TOKEN)
    })

    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.current = action.payload
      state.settings = {}
    })
  }
})

const { reducer, actions } = authSlice
const { clear } = actions

export { signUp, signIn, signOut, verifyEmail, getCurrentUser, clear }

export default persistReducer({ key: 'user', storage }, reducer)
