import { getAuthenticatedUser } from "#api/auth/getAuthenticatedUser"
import { getRegisteredUserToken } from "#api/auth/getRegisteredUserToken"
import { getUsers } from "#api/users/getUsers"
import { onCreateUser } from "#utils/onCreateUser"
import { onDeleteUser } from "#utils/onDeleteUser"
import { onUpdateUser } from "#utils/onUpdateUser"
import { createContext, useContext, useEffect, useState } from "react"

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [shippingData, setShippingData] = useState({})

  const resetUserState = () => {
    setUser(null)
    setIsLoggedIn(false)
  }

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
            setIsLoggedIn(true)
          } else {
            resetUserState()
          }
        } else {
          resetUserState()
        }
      } catch (error) {
        resetUserState()
      }
      setIsLoading(false)
    }
    checkAuthenticationAndSetState()
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
  }, [])

  const deleteUser = async (e, userId, setNotification) => {
    try {
      const response = await onDeleteUser(e, userId, setNotification)
      if (response && response.status === 200) {
        setUsers(users.filter((user) => user.id !== userId))
      }
    } catch (err) {
      console.error("Failed to delete user:", err)
    }
  }

  const addUser = async (e, user, setNotification, file) => {
    try {
      const response = await onCreateUser(e, user, setNotification, file)
      if (response && response.status === 201) {
        const newUser = response.data.user
        setUsers([...users, newUser])
      }
    } catch (err) {
      console.error("Failed to add user:", err)
    }
  }

  const updateUser = async (
    e,
    key,
    userId,
    itemInitialAttributes,
    updatedUserData,
    setUpdatedUserData,
    setNotification,
    file,
  ) => {
    try {
      const response = await onUpdateUser(
        e,
        key,
        userId,
        itemInitialAttributes,
        updatedUserData,
        setUpdatedUserData,
        setNotification,
        file,
      )

      if (response && response.status === 200) {
        const updatedUser = response.data.user
        setUsers((prevUsers) => {
          return prevUsers.map((user) =>
            user.id === updatedUser.id ? updatedUser : user,
          )
        })
      }
    } catch (err) {
      console.error("Failed to update user:", err)
    }
  }

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isLoading,
        users,
        user,
        setUser,
        updateUser,
        deleteUser,
        addUser,
        shippingData,
        setShippingData,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
const useUserContext = () => useContext(UserContext)
export default useUserContext
