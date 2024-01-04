import { API_USERS_CURRENT_USER, API_VERIFY_TOKEN } from "#utils/constants"
import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState({})
  const [userEmail, setUserEmail] = useState("")
  const [userId, setUserId] = useState({})

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
            `${process.env.REACT_APP_API_URL}${API_USERS_CURRENT_USER}/${userId}`,
            { withCredentials: true },
          )

          if (loggedInUser && loggedInUser.status === 200) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        setIsLoggedIn,
        setUser,
        setUserEmail,
        setUserId,
        user,
        userEmail,
        userId,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
const useUserContext = () => useContext(UserContext)
export default useUserContext
