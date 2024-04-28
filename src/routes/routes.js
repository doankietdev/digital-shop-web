import { routesConfig } from '~/config'
import {
  Home,
  Auth,
  VerifyEmail,
  EmailVerificationSuccess,
  EmailVerificationError,
  ForgotPassword,
  VerifyPasswordResetOTP,
  ResetPassword
} from '~/pages'
import ProductDetails from '~/pages/ProductDetails'

const publicRoutes = [
  { path: routesConfig.home, component: Home },
  { path: routesConfig.productDetails, component: ProductDetails },
  { path: routesConfig.auth, component: Auth, layout: null },
  { path: routesConfig.verifyEmail, component: VerifyEmail, layout: null },
  {
    path: routesConfig.emailVerificationSuccess,
    component: EmailVerificationSuccess,
    layout: null
  },
  {
    path: routesConfig.emailVerificationError,
    component: EmailVerificationError,
    layout: null
  },
  {
    path: routesConfig.forgotPassword,
    component: ForgotPassword,
    layout: null
  },
  {
    path: routesConfig.verifyPasswordResetOTP,
    component: VerifyPasswordResetOTP,
    layout: null
  },
  {
    path: routesConfig.resetPassword,
    component: ResetPassword,
    layout: null
  }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
