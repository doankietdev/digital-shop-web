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

const uploadAvatar = createAsyncThunk(
  'auth/uploadAvatar',
  async (payload, { rejectWithValue }) => {
    try {
      return await userService.uploadAvatar(payload)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const updateCurrentUser = createAsyncThunk(
  'auth/updateCurrentUser',
  async (payload, { rejectWithValue }) => {
    try {
      return await userService.updateCurrentUser(payload)
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
    builder.addCase(signIn.rejected, () => {})

    builder.addCase(signIn.fulfilled, (state, action) => {
      const { user } = action.payload
      state.current = user
    })

    builder.addCase(signOut.rejected, (state) => {
      state.current = {}
      state.settings = {}
    })
    builder.addCase(signOut.fulfilled, (state) => {
      state.current = {}
      state.settings = {}
    })

    builder.addCase(getCurrentUser.rejected, () => {})
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.current = action.payload
      state.settings = {}
    })

    builder.addCase(uploadAvatar.rejected, () => {})
    builder.addCase(uploadAvatar.fulfilled, (state, action) => {
      state.current = action.payload
      state.settings = {}
    })

    builder.addCase(updateCurrentUser.rejected, () => {})
    builder.addCase(updateCurrentUser.fulfilled, (state, action) => {
      state.current = action.payload
      state.settings = {}
    })
  }
})

const { reducer, actions } = authSlice
const { clear } = actions

export {
  clear, getCurrentUser, signIn,
  signOut, signUp, updateCurrentUser, uploadAvatar, verifyEmail
}

export default persistReducer({ key: 'user', storage }, reducer)
