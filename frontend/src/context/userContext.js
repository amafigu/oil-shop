import { API_USERS_CURRENT_USER, API_VERIFY_TOKEN } from "#utils/constants"
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
    const verifyCookie = async () => {
      setIsLoading(true)
      let userId = ""
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}${API_VERIFY_TOKEN}`,
          { withCredentials: true },
        )
        userId = response.data.id
        if (response.status === 200) {
          const loggedInUser = await axios.get(
            `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}${userId}`,
            { withCredentials: true },
          )

          if (loggedInUser && loggedInUser.status === 200) {
            console.log(loggedInUser.data)
            setUser(loggedInUser.data)
            setUserEmail(loggedInUser.data.email)
            setUserId(loggedInUser.data.id)
            setIsLoggedIn(true)
            setIsLoading(false)
          }
        }
      } catch (error) {
        setUserEmail("")
      }
    }

    verifyCookie()
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
        setUserId,
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
