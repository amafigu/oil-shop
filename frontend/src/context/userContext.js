import { getAuthenticatedUser } from "#api/auth/getAuthenticatedUser"
import { getRegisteredUserToken } from "#api/auth/getRegisteredUserToken"
import { getUsers } from "#api/users/getUsers"
import { createContext, useContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [userEmail, setUserEmail] = useState("")
  const [userId, setUserId] = useState(null)
  const [users, setUsers] = useState([])
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    const checkAuthenticationAndSetState = async () => {
      setIsLoading(true)
      try {
        const authToken = await getRegisteredUserToken()
        if (authToken && authToken.status === 200) {
          const authorizatedUserId = authToken.data.id
          const loggedInUserResponse = await getAuthenticatedUser(
            authorizatedUserId,
          )
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
    checkAuthenticationAndSetState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn])

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const response = await getUsers()
        if (response && response.status === 200) {
          setUsers(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    getAllUsers()
  }, [counter])

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
        users,
        counter,
        setCounter,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
const useUserContext = () => useContext(UserContext)
export default useUserContext
