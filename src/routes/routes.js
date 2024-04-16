import { routesConfig } from '~/config'
import {
  Home,
  Auth,
  VerifyEmail,
  EmailVerificationSuccess,
  EmailVerificationError
} from '~/pages'

const publicRoutes = [
  { path: routesConfig.home, component: Home },
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
  }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
