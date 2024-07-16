import { Routes, Route, Navigate } from "react-router-dom"
import { useState, createContext, useEffect, Suspense, lazy } from "react"
const Navbar = lazy(() => import('./components/Navbar'));
const Home = lazy(() => import('./components/Home'));
const Signup = lazy(() => import('./components/Signup'));
const Login = lazy(() => import('./components/Login'));
const LoadingFallback = lazy(() => import('./components/LoadingFallback'))

import axios from "axios"
export const isAuth = createContext()
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    try {
      axios.get(import.meta.env.VITE_TOKEN_VERIFY, { withCredentials: true })
        .then(resp => resp.status)
        .then(statusCode => {
          console.log({ tokenverify: statusCode })
          if (statusCode == 200) {
            setIsLoggedIn(true)
          }
        })
    } catch (error) {
      console.error('error', error)
    } finally {
      setLoading(false)
    }
    if (loading) {
      return <LoadingFallback />
    }
  }, [])

  return (
    <isAuth.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <>
        <header>
          <Navbar />
          {/* <LoadingFallback /> */}
        </header>
        <main>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path='/' element={(isLoggedIn) ? <Home /> : <Navigate to='/user/login' />} />
              <Route path='/user/login' element={(isLoggedIn) ? <Navigate to='/' /> : <Login />} />
              <Route path='/user/signup' element={(isLoggedIn) ? <Navigate to='/' /> : <Signup />} />
              <Route path='*' element={(isLoggedIn) ? <Navigate to='/' /> : <Navigate to='/user/login' />} />
            </Routes>
          </Suspense>
        </main>
      </>
    </isAuth.Provider>
  )
}

export default App