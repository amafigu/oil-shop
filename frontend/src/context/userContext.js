import { getLoggedInUser, verifyToken } from "#utils/users"
import { createContext, useContext, useEffect, useState } from "react"
export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [userEmail, setUserEmail] = useState("")
  const [userId, setUserId] = useState(null)

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
          } else {
            setUser(null)
            setUserEmail("")
            setUserId(null)
            setIsLoggedIn(false)
          }
        } else {
          setUser(null)
          setUserEmail("")
          setUserId(null)
          setIsLoggedIn(false)
        }
      } catch (error) {
        setUser(null)
        setUserEmail("")
        setUserId(null)
        setIsLoggedIn(false)
      }
      setIsLoading(false)
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
