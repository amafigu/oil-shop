import NotificationCard from "#components/NotificationCard"
import {
  ROUTES_CURRENT_ADMIN,
  ROUTES_CURRENT_CUSTOMER,
  ROUTES_LOGIN,
  SHORT_MESSAGE_TIMEOUT,
} from "#utils/constants"
import { getLoggedInUser, verifyToken } from "#utils/users"
import { createContext, useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState({})
  const [userEmail, setUserEmail] = useState("")
  const [userId, setUserId] = useState({})
  const [notification, setNotification] = useState(null)
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname
  useEffect(() => {
    const verifyCookie = async () => {
      setIsLoading(true)
      try {
        const authToken = await verifyToken()
        if (authToken) {
          const loggedInUserResponse = await getLoggedInUser(authToken)
          if (loggedInUserResponse && loggedInUserResponse.status === 200) {
            const userData = loggedInUserResponse.data
            setUser(userData)
            setUserEmail(userData.email)
            setUserId(userData.id)
            setIsLoggedIn(true)
          }
        } else {
          setUserEmail("")
        }
      } catch (error) {
        console.error("Error during user verification:", error)
        if (
          currentPath === ROUTES_CURRENT_ADMIN ||
          currentPath === ROUTES_CURRENT_CUSTOMER
        ) {
          navigate(ROUTES_LOGIN)
          setNotification("Error during user verification")
          setTimeout(() => setNotification(null), SHORT_MESSAGE_TIMEOUT)
        }

        setUserEmail("")
      }
      setIsLoading(false)
    }

    verifyCookie() // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {notification && <NotificationCard message={notification} />}
      {children}
    </UserContext.Provider>
  )
}
const useUserContext = () => useContext(UserContext)
export default useUserContext
