import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoadingFallback from "../components/LoadingFallback"
function Signup() {
  const [loading, setLoading] = useState(false)
  const [userCred, setUserCred] = useState({ username: "", email: "", password: "" })
  const [credError, setCredError] = useState("")
  const [formError, setFormError] = useState("")
  const Navigate = useNavigate()
  const getValues = (event) => {
    setUserCred({
      ...userCred,
      [event.target.name]: event.target.value
    })
    setCredError('')
    setFormError('')
  }
  const sendData = async (event) => {
    event.preventDefault()
    setLoading(true)
    try {
      await fetch(import.meta.env.VITE_USER_REG_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCred),
      })
        .then(response => response.status)
        .then(status => {
          console.log(status, status == 201)
          if (status == 201) {
            Navigate('/user/login')
            setFormError('')
          } else {
            setFormError(`Something went wrong`)
            setCredError('Opps!! please try to use diffrent credentials')
          }
        })
    } catch (error) {
      console.error('error: ', error)
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
      {
        (loading) ?
          (<>
            <LoadingFallback />
          </>) :
          (<>
            <div className="sigup-form-container">
              <form onSubmit={sendData} id="signupform">
                <p className="form-logo">Register Account</p>
                <input type="text" placeholder="username" name="username" required onChange={getValues} />
                <input type="email" placeholder="email" name="email" required onChange={getValues} />
                <input type="password" placeholder="password" name="password" required onChange={getValues} />
                <p className="note"><strong>note:</strong>remember your password for future use</p>
                <input type="submit" value="register" className="registerbtn" />

                <hr className="hr" />
                <Link to='/user/login'><button className="loginbtn">Login</button></Link>
                <p className="error">{formError}</p>
                <span className="credAlert">{credError}</span>
              </form>
            </div>
          </>)
      }
    </>
  )
}

export default Signup