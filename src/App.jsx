import { Fragment, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { ScrollToTop } from './components'
import ProtectedRoutes from './components/ProtectedRoutes'
import { DefaultLayout } from './layouts'
import { protectedRoutes, publicRoutes, unauthorizedRoutes } from './routes'
import UnauthorizedRoutes from './components/UnauthorizedRoutes'
import { useSignInStatusChecker } from './hooks'
import globalRouter from './utils/globalRouter'
import { LanguageProvider } from './contexts/LanguageContext'
import { dispatch } from './redux'
import { getCart } from './pages/Cart/CartSlice'
import { useSelector } from 'react-redux'
import { cartSelector } from './redux/selectors'

function App() {
  const navigate = useNavigate()
  globalRouter.navigate = navigate

  useSignInStatusChecker()

  const cart = useSelector(cartSelector)

  useEffect(() => {
    if (cart?._id) {
      dispatch(getCart())
    }
  }, [cart?._id])

  return (
    <LanguageProvider>
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
    </LanguageProvider>
  )
}

export default App
