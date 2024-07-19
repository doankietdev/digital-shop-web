import { Fragment } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ScrollToTop } from './components'
import ProtectedRoutes from './components/ProtectedRoutes'
import { DefaultLayout } from './layouts'
import { protectedRoutes, publicRoutes, unauthorizedRoutes } from './routes'
import UnauthorizedRoutes from './components/UnauthorizedRoutes'
import { useSignInStatusChecker } from './hooks'
import globalRouter from './utils/globalRouter'

function App() {
  const navigate = useNavigate()
  globalRouter.navigate = navigate

  useSignInStatusChecker()

  return (
    <div className="font-main">
      <ScrollToTop />
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component
          let Layout = DefaultLayout
          if (route.layout) {
            Layout = route.layout
          } else if (route.layout === null) {
            Layout = Fragment
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          )
        })}

        <Route element={<ProtectedRoutes />}>
          {protectedRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Route>

        <Route element={<UnauthorizedRoutes />}>
          {unauthorizedRoutes.map((route, index) => {
            const Page = route.component
            let Layout = DefaultLayout
            if (route.layout) {
              Layout = route.layout
            } else if (route.layout === null) {
              Layout = Fragment
            }
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            )
          })}
        </Route>
      </Routes>
    </div>
  )
}

export default App
