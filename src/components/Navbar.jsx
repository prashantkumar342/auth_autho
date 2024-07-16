// import propTypes? from 'prop-types'
import { useContext } from "react"
import { isAuth } from '../App'
import { Link } from "react-router-dom"
import axios from "axios"

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(isAuth)
  const logout = () => {
    axios.get(import.meta.env.VITE_CLEAR_COOKIE, { withCredentials: true })
    setIsLoggedIn(false)
  }
  return (
    <>
      <nav>
        <p className="navlogo">Testing</p>
        <div className="navlinks">
          {
            (isLoggedIn) ?
              (<>
                <Link to='/' ><button className="navbtn home">Home</button></Link>
                <Link to='/user/login' ><button onClick={logout} className="navbtn logout">Logout</button></Link>
              </>) :
              (<>
                <Link to='/user/signup' ><button className="navbtn signup">SignUp</button></Link>
                <Link to='/user/login' ><button className="navbtn login">Login</button></Link>
              </>)
          }
        </div>
      </nav>
    </>
  )
}

export default Navbar