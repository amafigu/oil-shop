
import { CURRENT_ADMIN, SIGN_UP } from "@/constants/routes"
import { useNotificationContext } from "@/context/notificationContext"
import type {
  CreateUser,
  ShippingData,
  User,
} from "@/types/User"
import { onRequestError } from "@/utils/onRequestError"
import { createUserSchema, updateUserSchema } from "@/utils/usersValidation"
import {
  convertDataToExpectedUserTypes,
  validate,
} from "@/utils/verifyTypes"
import {
  FormEvent,
  ReactNode,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"
import { useLocation } from "react-router-dom"
import { UserContext } from "./UserContext"
import { getDecodedAuthToken } from "@/api/auth/getDecodedAuthToken"
import { getAuthenticatedUserById } from "@/api/auth/getAuthenticatedUserById"
import { getUsers } from "@/api/users/getUsers"
import { getUserShippingData } from "@/api/users/getUserShippingData"
import { updateUser } from "@/api/users/updateUser"
import { updateShippingData } from "@/api/users/updateShippingData"
import { createAdmin } from "@/api/users/createAdmin"
import { createUser } from "@/api/users/createUser"
import { deleteUserById } from "@/api/users/deleteUserById"

interface Props {
  children: ReactNode
}

export function UserProvider({ children }: Props) {
  const [users, setUsers] = useState<User[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [shippingData, setShippingData] = useState<Partial<ShippingData>>({})

  const { onSetNotification, setNotification } = useNotificationContext()
  const { pathname } = useLocation()
  const isCreatedByAdmin = pathname.includes(CURRENT_ADMIN)
  const isSignup = pathname.includes(SIGN_UP)

  const resetUserState = useCallback(() => {
    setUser(null)
    setIsLoggedIn(false)
  }, [])

  const verifyLogin = useCallback(async () => {
    setIsLoading(true)
    try {
      const authToken = await getDecodedAuthToken()
      if (authToken?.status === 200) {
        const { id } = authToken.data
        const response = await getAuthenticatedUserById(id)
        if (response?.status === 200) {
          setUser(response.data)
          setIsLoggedIn(true)
        } else {
          resetUserState()
        }
      } else {
        resetUserState()
      }
    } catch {
      resetUserState()
    }
    setIsLoading(false)
  }, [resetUserState])

  const fetchUsers = useCallback(async () => {
    try {
      const response = await getUsers()
      if (response?.status === 200) setUsers(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const fetchShippingData = useCallback(async () => {
    if (!user || isLoading) return
    try {
      const response = await getUserShippingData(user.id)
      if (response?.status === 200) setShippingData(response.data)
    } catch (err) {
      onRequestError(err, setNotification, "Error by getting user shipping data")
    }
  }, [user, isLoading, setNotification])

  useEffect(() => {
    verifyLogin()
     fetchUsers()
        fetchShippingData()
  }, [verifyLogin,fetchUsers,fetchShippingData])


  const onDeleteUser = useCallback(
    async (e: SyntheticEvent, id: number) => {
      e.preventDefault()
      try {
        const authToken = await getDecodedAuthToken()
        if (authToken?.status === 200 && authToken.data.id === id) {
          onSetNotification("You can not delete yourself")
          return
        }
        const response = await deleteUserById(id)
        if (response?.status === 200) {
          setUsers((prev) => prev.filter((u) => u.id !== id))
        }
      } catch (err) {
        onSetNotification("Error by deleting user")
        console.error(err)
      }
    },
    [onSetNotification]
  )

  const onCreateCustomer = useCallback(
    async (e: FormEvent<HTMLFormElement>, data: CreateUser) => {
      e.preventDefault()
      try {
        const typed = convertDataToExpectedUserTypes(data)
        await validate({ item: typed, schema: createUserSchema })
        const response = await createUser(typed)
        if (response?.status === 422) {
          setTimeout(() => onSetNotification("This user is already existent."), 4000)
        }
        if (response?.status === 201) {
          setUsers((prev) => [...prev, response.data.user])
          return response.data.user
        }
      } catch (err) {
        onRequestError(err, onSetNotification)
      }
    },
    [onSetNotification]
  )

  const onCreateAdmin = useCallback(
    async (e: FormEvent<HTMLFormElement>, data: CreateUser) => {
      e.preventDefault()
      try {
        const typed = convertDataToExpectedUserTypes(data)
        await validate({ item: typed, schema: createUserSchema })
        const response = await createAdmin(typed)
        if (response?.status === 422) {
          onSetNotification("This user already exists.")
          return
        }
        if (response?.status === 201) {
          setUsers((prev) => [...prev, response.data.user])
          if (isCreatedByAdmin) onSetNotification("Admin created successfully")
          if (isSignup) return typed
        }
      } catch (err) {
        onRequestError(err, onSetNotification)
      }
    },
    [isCreatedByAdmin, isSignup, onSetNotification]
  )

  const validateUpdatedUser = useCallback(
    async (data: unknown) => updateUserSchema.parse(data),
    []
  )

  const onUpdateUser = useCallback(
    async ({ id, initialData, updatedData, setUpdatedData }) => {
      try {
        const valid = await validateUpdatedUser(updatedData)
        const response = await updateUser(id, valid as User)
        if (response.status === 200) {
          const userResponse = response.data.user
          setUsers((prev) => prev.map((user) => (user.id === userResponse.id ? userResponse : user)))
          setUser(userResponse)
        }
      } catch (err) {
        console.error(err)
        setUpdatedData(initialData)
        onRequestError(err, onSetNotification)
      }
    },
    [validateUpdatedUser, onSetNotification]
  )

  const onUpdateShippingData = useCallback(
    async ({ id, initialData, updatedData, setUpdatedData }) => {
      try {
        const response = await updateShippingData(id, updatedData)
        if (response?.status === 200) setShippingData(response.data)
      } catch (err) {
        console.error(err)
        setUpdatedData(initialData)
        onRequestError(err, onSetNotification)
      }
    },
    [onSetNotification]
  )

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      isLoading,
      users,
      user,
      setUser,
      onDeleteUser,
      onCreateCustomer,
      onCreateAdmin,
      onUpdateUser,
      onUpdateShippingData,
      shippingData,
    }),
    [
      isLoggedIn,
      setIsLoggedIn,
      isLoading,
      users,
      user,
      onDeleteUser,
      onCreateCustomer,
      onCreateAdmin,
      onUpdateUser,
      onUpdateShippingData,
      shippingData,
    ]
  )

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
