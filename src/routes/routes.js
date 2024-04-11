import { routesConfig } from '~/config'
import { Home, Auth } from '~/pages'

const publicRoutes = [
  { path: routesConfig.home, component: Home },
  { path: routesConfig.auth, component: Auth, layout: null }
]

const privateRoutes = []

export { publicRoutes, privateRoutes }
