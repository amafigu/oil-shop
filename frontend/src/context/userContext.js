import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/verify-token`,
          { withCredentials: true },
        )

        if (response.status === 200) {
          setUser(response.data)
          setIsLoggedIn(true)
          setUserEmail(response.data.email)
        }
      } catch (error) {
        setIsLoggedIn(false)
        setUserEmail("")
      }
    }

    verifyToken()
  }, [isLoggedIn])

  return (
    <UserContext.Provider
      value={{
        userEmail,
        setUserEmail,
        setIsLoggedIn,
        isLoggedIn,
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
const useUserContext = () => useContext(UserContext)
export default useUserContext
