import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    loading: false
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})

const { reducer, actions } = appSlice
const { setLoading } = actions

export { actions, setLoading }

export default reducer
