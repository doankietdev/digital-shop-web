import { routesConfig } from '~/config'
import { Home, Login, NotFound } from '~/pages'

const publicRoutes = [
  { path: routesConfig.home, component: Home },
  { path: routesConfig.login, component: Login }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
