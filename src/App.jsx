import { Routes, Route, Navigate } from "react-router-dom"
import { useState, createContext, useEffect } from "react"
import LoadingFallback from './components/LoadingFallback'
import Home from "./components/Home"
import Signup from './components/Signup'
import Login from './components/Login'
import Navbar from './components/Navbar'
import axios from "axios"
export const isAuth = createContext()
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    try {
      setLoading(true)
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

  }, [])

  return (
    <isAuth.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <>
        {
          (loading) ?
            (<>
              <LoadingFallback />
            </>) :
            (<>
              <header>
                <Navbar />
              </header>
              <main>
                <Routes>
                  <Route path='/' element={(isLoggedIn) ? <Home /> : <Navigate to='/user/login' />} />
                  <Route path='/user/login' element={(isLoggedIn) ? <Navigate to='/' /> : <Login />} />
                  <Route path='/user/signup' element={(isLoggedIn) ? <Navigate to='/' /> : <Signup />} />
                  <Route path='*' element={(isLoggedIn) ? <Navigate to='/' /> : <Navigate to='/user/login' />} />
                </Routes>
              </main>
            </>)
        }

      </>
    </isAuth.Provider>
  )
}

export default App