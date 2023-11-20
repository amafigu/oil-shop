import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const [userId, setUserId] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verifyToken = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/users/verify-token`,
          { withCredentials: true },
        )

        if (response.status === 200) {
          console.log("response.data", response.data)

          setUser(response.data)
          setUserEmail(response.data.email)
          setUserId(response.data.id)
          setIsLoggedIn(true)
          setIsLoading(false)
        }
      } catch (error) {
        setUserEmail("")
      }
    }

    verifyToken()
  }, [isLoggedIn])

  console.log("user isLoggedIn", isLoggedIn)
  return (
    <UserContext.Provider
      value={{
        userEmail,
        setUserEmail,
        setIsLoggedIn,
        isLoggedIn,
        user,
        setUser,
        isLoading,
        userId,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
const useUserContext = () => useContext(UserContext)
export default useUserContext
