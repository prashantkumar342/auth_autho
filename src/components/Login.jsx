// import axios from "axios"
import { isAuth } from "../App"
import { useState, useContext } from "react"
import { Link } from "react-router-dom"
const Login = () => {
  const { setIsLoggedIn } = useContext(isAuth)
  // const Navigate = useNavigate()
  const [credError, setCredError] = useState("")
  const [formError, setFormError] = useState("")
  const [userCred, setUserCred] = useState({ email: "", password: "" })
  const getValues = (event) => {
    setUserCred({
      ...userCred,
      [event.target.name]: event.target.value
    })
    setFormError("")
    setCredError("")
  }
  const login = (event) => {
    event.preventDefault()
    fetch(import.meta.env.VITE_USER_LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userCred),
      credentials: 'include'
    })
      .then(res => res.status)
      .then(data => {
        if (data == 200) {
          setIsLoggedIn(true)
          setFormError("")
          setCredError("")
        }
        else {
          setFormError("Something went wrong")
          setCredError("email or password is not matching")
        }
      })
  }
  return (
    <>
      <div className="login-form-container">
        <form onSubmit={login} id="signupform">
          <p className="form-logo">Login here</p>
          <input type="email" placeholder="email" name="email" required onChange={getValues} />
          <input type="password" placeholder="password" name="password" required onChange={getValues} />
          <input type="submit" value="Login" className="loginbtn" />
          <hr className="hr" />
          <Link to='/user/signup'><button className="signupbtn">SignUp</button></Link>
          <p className="error">{formError}</p>
          <span className="credAlert">{credError}</span>
        </form>
      </div>
    </>
  )
}

export default Login