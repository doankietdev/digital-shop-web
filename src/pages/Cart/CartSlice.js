import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import storage from 'redux-persist/lib/storage'
import cartService from '~/services/cartService'

const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (payload, { rejectWithValue }) => {
    try {
      return await cartService.addToCart(payload)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const addProductsToCart = createAsyncThunk(
  'cart/addProductsToCart',
  async (payload, { rejectWithValue }) => {
    try {
      return await cartService.addProductsToCart(payload)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const updateVariant = createAsyncThunk(
  'cart/updateVariant',
  async (payload, { rejectWithValue }) => {
    try {
      return await cartService.updateVariant(payload)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const updateProductQuantity = createAsyncThunk(
  'cart/updateProductQuantity',
  async (payload, { rejectWithValue }) => {
    try {
      return await cartService.updateProductQuantity(payload)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const deleteFromCart = createAsyncThunk(
  'cart/deleteFromCart',
  async (payload, { rejectWithValue }) => {
    try {
      return await cartService.deleteFromCart(payload)
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const getCart = createAsyncThunk(
  'cart/getCart',
  async (payload, { rejectWithValue }) => {
    try {
      return await cartService.getCart()
    } catch (error) {
      return rejectWithValue(error)
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    _id: null,
    products: [],
    countProducts: 0
  },
  reducers: {
    clear: (state) => {
      state.products = []
      state.countProducts = 0
    }
  },
  extraReducers: (builder) => {
    builder.addCase(addToCart.fulfilled, (state, action) => {
      const { products, countProducts } = action.payload
      state.products = products
      state.countProducts = countProducts
    })

    builder.addCase(addProductsToCart.fulfilled, (state, action) => {
      const { products, countProducts } = action.payload
      state.products = products
      state.countProducts = countProducts
    })

    builder.addCase(updateVariant.fulfilled, (state, action) => {
      const { products, countProducts } = action.payload
      state.products = products
      state.countProducts = countProducts
    })

    builder.addCase(updateProductQuantity.fulfilled, (state, action) => {
      const { products, countProducts } = action.payload
      state.products = products
      state.countProducts = countProducts
    })

    builder.addCase(deleteFromCart.fulfilled, (state, action) => {
      const { products, countProducts } = action.payload
      state.products = products
      state.countProducts = countProducts
    })

    builder.addCase(getCart.fulfilled, (state, action) => {
      const { _id, products, countProducts } = action.payload
      state._id = _id
      state.products = products
      state.countProducts = countProducts
    })
  }
})

const { reducer, actions } = cartSlice
const { clear } = actions

export {
  addToCart,
  addProductsToCart,
  clear,
  getCart,
  updateProductQuantity,
  updateVariant,
  deleteFromCart
}

export default persistReducer({ key: 'cart', storage }, reducer)
