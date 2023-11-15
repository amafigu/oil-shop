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
          setUser(response.data)
          setUserEmail(response.data.email)
          setUserId(response.data.id)
        }
      } catch (error) {
        setUserEmail("")
      } finally {
        setIsLoading(false)
        setIsLoggedIn(true)
      }
    }

    verifyToken()
  }, [isLoggedIn])

  console.log(user)

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
