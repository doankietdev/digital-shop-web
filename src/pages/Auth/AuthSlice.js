import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authService from '~/services/authService'
import userService from '~/services/userService'

const signIn = createAsyncThunk(
  'auth/signIn',
  async (payload) => {
    return await authService.signIn(payload)
  }
)

const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (payload) => {
    return await authService.signInWithGoogle(payload)
  }
)


const signOut = createAsyncThunk(
  'auth/signOut',
  async () => {
    return await authService.signOut()
  }
)

const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
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

    builder.addCase(signInWithGoogle.rejected, () => {})
    builder.addCase(signInWithGoogle.fulfilled, (state, action) => {
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
  clear,
  getCurrentUser,
  signIn,
  signInWithGoogle,
  signOut,
  updateCurrentUser,
  uploadAvatar
}

export default persistReducer({ key: 'user', storage }, reducer)
