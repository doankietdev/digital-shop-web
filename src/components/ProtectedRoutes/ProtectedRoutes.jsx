import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { routesConfig } from '~/config'
import { userSelector } from '~/redux/selectors'

function ProtectedRoutes() {
  const { current: user } = useSelector(userSelector)
  const location = useLocation()

  return user?._id ? (
    <Outlet />
  ) : (
    <Navigate to={routesConfig.signIn} state={{ from: location.pathname }} replace />
  )
}

export default ProtectedRoutes
