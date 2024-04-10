import { Fragment } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { publicRoutes } from './routes'
import { DefaultLayout } from './layouts'
import GlobalStyles from './components/GlobalStyles'

function App() {
  return (
    <GlobalStyles>
      <div className='font-main'>
        <Router>
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
                  path={route.path()}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              )
            })}
          </Routes>
        </Router>
      </div>
    </GlobalStyles>
  )
}

export default App
