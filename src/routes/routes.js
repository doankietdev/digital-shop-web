import { routesConfig } from '~/config'
import { AuthLayout, UserLayout } from '~/layouts'
import {
  Addresses,
  Cart,
  Checkout,
  EmailVerificationError,
  EmailVerificationSuccess,
  ForgotPassword,
  Home,
  OrderDetails,
  Orders,
  ProductDetails,
  ProductsOfCategory,
  Profile,
  ResetPassword,
  Search,
  Security,
  SignIn,
  SignUp,
  VerifyAccount,
  VerifyPasswordResetOTP,
  PageNotFound
} from '~/pages'

const publicRoutes = [
  { path: routesConfig.home, component: Home },
  { path: routesConfig.productDetails, component: ProductDetails },
  { path: routesConfig.productsOfCategory, component: ProductsOfCategory },
  { path: routesConfig.search, component: Search },
  { path: routesConfig.pageNotFound, component: PageNotFound, layout: null },
  { path: routesConfig.noMatchPath, component: PageNotFound, layout: null }
]

const protectedRoutes = [
  {
    path: routesConfig.cart,
    component: Cart
  },
  {
    path: routesConfig.checkout,
    component: Checkout
  },
  {
    path: routesConfig.orders,
    component: Orders,
    layout: UserLayout
  },
  {
    path: routesConfig.orderDetails,
    component: OrderDetails
  },
  {
    path: routesConfig.profile,
    component: Profile,
    layout: UserLayout
  },
  {
    path: routesConfig.security,
    component: Security,
    layout: UserLayout
  },
  {
    path: routesConfig.addresses,
    component: Addresses,
    layout: UserLayout
  }
]

const unauthorizedRoutes = [
  { path: routesConfig.signIn, component: SignIn, layout: AuthLayout },
  { path: routesConfig.signUp, component: SignUp, layout: AuthLayout },
  { path: routesConfig.verifyAccount, component: VerifyAccount, layout: AuthLayout },
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
    layout: AuthLayout
  },
  {
    path: routesConfig.verifyPasswordResetOTP,
    component: VerifyPasswordResetOTP,
    layout: AuthLayout
  },
  {
    path: routesConfig.resetPassword,
    component: ResetPassword,
    layout: AuthLayout
  }
]

export { protectedRoutes, publicRoutes, unauthorizedRoutes }
