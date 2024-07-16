import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Signup from './components/Signup'
import Login from './components/Login'
import { useState, createContext, useEffect } from "react"
import axios from "axios"
export const isAuth = createContext()
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    axios.get(import.meta.env.VITE_TOKEN_VERIFY, { withCredentials: true })
      .then(resp => resp.status)
      .then(statusCode => {
        console.log({ tokenverify: statusCode })
        if (statusCode == 200) {
          setIsLoggedIn(true)
        }
      })

  }, [])

  return (
    <isAuth.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      <>
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
      </>
    </isAuth.Provider>
  )
}

export default App