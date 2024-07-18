import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { routesConfig } from '~/config'
import { userSelector } from '~/redux/selectors'

function UnauthorizedRoutes() {
  const { current: user } = useSelector(userSelector)

  return user?._id ? (
    <Navigate to={routesConfig.home} replace />
  ) : (
    <Outlet />
  )
}

export default UnauthorizedRoutes
