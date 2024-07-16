import axios from "axios"
import { useEffect, useState } from "react"
import LoadingFallback from "../components/LoadingFallback"
function Home() {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  useEffect(() => {
    setLoading(true)
    try {
      axios.get(import.meta.env.VITE_FETCH_USERS)
        .then(res => res.data)
        .then(data => setUsers(data))
    } catch (error) {
      console.error('error: ', error);
    } finally {
      setLoading(false)
    }

  }, [users])
  return (
    <>
      <div className="usertable">
        {
          (loading) ?
            (<>
              <LoadingFallback />
            </>) :
            (<>
              <table>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                </tr>

                {
                  users.map((user, index) => (
                    <tr key={index}>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                    </tr>
                  ))
                }


              </table>
            </>)
        }
      </div>
    </>
  )
}

export default Home