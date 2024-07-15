import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import 'rc-slider/assets/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PersistGate } from 'redux-persist/integration/react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import App from './App'
import GlobalStyles from './components/GlobalStyles'
import { persistor, store } from './redux'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PayPalScriptProvider>
          <GlobalStyles>
            <BrowserRouter>
              <App />
            </BrowserRouter>
            <ToastContainer position='bottom-left' autoClose={3000} />
          </GlobalStyles>
        </PayPalScriptProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
)
